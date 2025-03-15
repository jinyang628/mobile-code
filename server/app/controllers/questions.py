import logging

import httpx
from fastapi import APIRouter, HTTPException

from app.models.questions import Difficulty, Question, QuestionMetadata, TopicTag
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
            "/metadata",
            response_model=list[QuestionMetadata],
        )
        async def fetch_question_list_metadata(
            difficulty: Difficulty, topic_tag: TopicTag, page: int
        ) -> list[QuestionMetadata]:
            """Fetches the list of question metadata for the user to choose from, based on the provided difficulty and topic tag."""
            try:
                log.info("Fetching question list metadata...")
                response: list[QuestionMetadata] = (
                    await self.service.fetch_question_list_metadata(
                        difficulty=difficulty, topic_tag=topic_tag, page=page
                    )
                )
                log.info(f"{len(response)} questions' metadata retrieved successfully.")
                return response
            except Exception as e:
                log.error(
                    "Unexpected error in questions controller while fetching list of question metadata: %s",
                    str(e),
                )
                raise HTTPException(
                    status_code=httpx.codes.INTERNAL_SERVER_ERROR, detail=str(e)
                )

        @router.get(
            "",
            response_model=Question,
        )
        async def fetch_question(title_slug: str) -> Question:
            try:
                log.info("Fetching question data...")
                response: Question = await self.service.fetch_question(
                    title_slug=title_slug
                )
                log.info(f"{response.title} data retrieved successfully.")
                return response
            except Exception as e:
                log.error(
                    "Unexpected error in questions controller while fetching question data: %s",
                    str(e),
                )
                raise HTTPException(
                    status_code=httpx.codes.INTERNAL_SERVER_ERROR, detail=str(e)
                )
