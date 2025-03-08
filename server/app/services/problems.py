import httpx

from app.models.problems import Difficulty, Problem, TopicTag
from app.utils.constants import LEETCODE_API_URL


class ProblemsService:
    async def get_problem(
        self,
        difficulty: Difficulty,
        topic_tag: TopicTag,
        limit: int = 50,
        skip: int = 0,
    ) -> list[Problem]:
        query = """
        query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
            problemsetQuestionList: questionList(
                categorySlug: $categorySlug
                limit: $limit
                skip: $skip
                filters: $filters
            ) {
                total: totalNum
                questions: data {
                    acRate
                    difficulty
                    freqBar
                    frontendQuestionId: questionFrontendId
                    isFavor
                    paidOnly: isPaidOnly
                    status
                    title
                    titleSlug
                    topicTags {
                        name
                        id
                        slug
                    }
                    hasSolution
                    hasVideoSolution
                }
            }
        }
        """

        # Define the variables for the query
        filters = {}
        if difficulty:
            filters["difficulty"] = (
                difficulty.upper()
            )  # Ensure the difficulty is in uppercase
        if topic_tag:
            filters["tags"] = [topic_tag.value]  # Use the value of the TopicTag enum

        variables = {
            "categorySlug": "",
            "skip": skip,
            "limit": limit,
            "filters": filters,
        }

        # Send the GraphQL request
        async with httpx.AsyncClient() as client:
            response = await client.post(
                LEETCODE_API_URL,
                json={"query": query, "variables": variables},
                headers={"Content-Type": "application/json"},
            )

            # Check for errors
            if response.status_code != 200:
                raise Exception(
                    f"GraphQL request failed: {response.status_code} - {response.text}"
                )

            # Parse the response
            data = response.json()
            if "errors" in data:
                raise Exception(f"GraphQL errors: {data['errors']}")

            # Extract and return the problems
            questions_data = data["data"]["problemsetQuestionList"]["questions"]
            print(questions_data)
