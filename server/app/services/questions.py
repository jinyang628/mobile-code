from typing import Optional

import httpx

from app.models.questions import (
    CodeSnippet,
    Difficulty,
    Question,
    QuestionMetadata,
    TopicTag,
)
from app.utils.constants import (
    LEETCODE_API_URL,
    PAGE_LIMIT,
    PROBLEM_SET_QUESTION_LIST_QUERY,
    QUESTION_QUERY,
)


class QuestionsService:
    async def fetch_question_list_metadata(
        self, difficulty: Difficulty, topic_tag: Optional[TopicTag], page: int
    ) -> list[QuestionMetadata]:
        query = PROBLEM_SET_QUESTION_LIST_QUERY

        # Leetcode API doesn't support filtering by free problems only
        filters = {}
        filters["difficulty"] = difficulty.upper()  # All caps for API request
        if topic_tag:
            filters["tags"] = [topic_tag.value]  # assume only one tag for now

        variables = {
            "categorySlug": "",
            "limit": PAGE_LIMIT,
            "skip": (page - 1) * PAGE_LIMIT,
            "filters": filters,
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                LEETCODE_API_URL,
                json={"query": query, "variables": variables},
                headers={"Content-Type": "application/json"},
            )

            if response.status_code != 200:
                raise Exception(
                    f"Leetcode API request failed while fetching questions: {response.text}"
                )

            data = response.json()
            if "errors" in data:
                raise Exception(
                    f"GraphQL error encountered while fetching questions: {data['errors']}"
                )

            return _filter_question_list_metadata(data=data)

    async def fetch_question(self, title_slug: str) -> Question:
        query = QUESTION_QUERY
        variables = {"titleSlug": title_slug}
        async with httpx.AsyncClient() as client:
            response = await client.post(
                LEETCODE_API_URL,
                json={"query": query, "variables": variables},
                headers={"Content-Type": "application/json"},
            )
            if response.status_code != 200:
                raise Exception(
                    f"Leetcode API request failed while fetching question data: {response.text}"
                )
            data = response.json()
            if "errors" in data:
                raise Exception(
                    f"GraphQL error encountered while fetching question data: {data['errors']}"
                )
            return _unwrap_question(data=data)


def _filter_question_list_metadata(data: dict) -> list[QuestionMetadata]:
    """Helper function to extract filtered question list metadata from the Leetcode API response."""
    all_questions_metadata: list[dict] = (
        data.get("data", {}).get("problemsetQuestionList", {}).get("questions", [])
    )
    return [
        QuestionMetadata.model_validate(
            {k: v for k, v in q.items() if k != "isPaidOnly"}
        )
        for q in all_questions_metadata
        if not q["isPaidOnly"]
    ]


def _unwrap_question(data: dict) -> Question:
    """Helper function to unwrap the question from the Leetcode API response."""
    question_dict: dict = data.get("data", {}).get("question", {})
    return Question(
        id=question_dict.get("questionId", ""),
        title=question_dict.get("title", ""),
        titleSlug=question_dict.get("titleSlug", ""),
        content=question_dict.get("content", ""),
        codeSnippets=[
            CodeSnippet(
                lang=cs.get("lang", ""),
                code=cs.get("code", ""),
            )
            for cs in question_dict.get("codeSnippets", [])
        ],
    )
