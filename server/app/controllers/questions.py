import logging

import httpx
from fastapi import APIRouter, HTTPException

from app.models.questions import Difficulty, QuestionHeader, TopicTag
from app.services.questions import QuestionsService

log = logging.getLogger(__name__)


class QuestionsController:
    def __init__(self, service: QuestionsService):
        self.router = APIRouter()
        self.service = service
        self.setup_routes()

    def setup_routes(self):
        router = self.router

        @router.get(
            "/headers",
            response_model=list[QuestionHeader],
        )
        async def fetch_question_headers(
            difficulty: Difficulty, topic_tag: TopicTag, page: int
        ) -> list[QuestionHeader]:
            """Fetches the panel of question headers for the user to choose from, based on the provided difficulty and topic tag."""
            try:
                log.info("Fetching question headers...")
                response: list[QuestionHeader] = (
                    await self.service.fetch_question_headers(
                        difficulty=difficulty, topic_tag=topic_tag, page=page
                    )
                )
                log.info(f"{len(response)} questions retrieved successfully.")
                return response
            except Exception as e:
                log.error(
                    "Unexpected error in questions controller while fetching question headers: %s",
                    str(e),
                )
                raise HTTPException(
                    status_code=httpx.codes.INTERNAL_SERVER_ERROR, detail=str(e)
                )
