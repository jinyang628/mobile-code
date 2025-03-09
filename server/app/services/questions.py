from typing import Optional

import httpx

from app.models.questions import Difficulty, QuestionHeader, TopicTag
from app.utils.constants import (
    LEETCODE_API_URL,
    PAGE_LIMIT,
    PROBLEM_SET_QUESTION_LIST_QUERY,
)


class QuestionsService:
    async def fetch_question_headers(
        self, difficulty: Difficulty, topic_tag: Optional[TopicTag], page: int
    ) -> list[QuestionHeader]:
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

            return _get_filtered_question_headers(data=data)


def _get_filtered_question_headers(data: dict) -> list[QuestionHeader]:
    questions_data: list[dict] = data["data"]["problemsetQuestionList"]["questions"]
    return [
        QuestionHeader.model_validate({k: v for k, v in q.items() if k != "isPaidOnly"})
        for q in questions_data
        if not q["isPaidOnly"]
    ]
