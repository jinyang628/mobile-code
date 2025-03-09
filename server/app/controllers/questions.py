import logging

import httpx
from fastapi import APIRouter, HTTPException

from app.models.questions import Difficulty, Question, TopicTag
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
            "",
            response_model=list[Question],
        )
        async def fetch_questions(
            difficulty: Difficulty, topic_tag: TopicTag
        ) -> list[Question]:
            """Fetches the panel of questions for the user to choose from, based on the provided difficulty and topic tag."""
            try:
                log.info("Fetching questions...")
                response: list[Question] = await self.service.fetch_questions(
                    difficulty=difficulty, topic_tag=topic_tag
                )
                log.info(f"{len(response)} questions retrieved successfully.")
                return response
            except Exception as e:
                log.error("Unexpected error in questions controller.py: %s", str(e))
                raise HTTPException(
                    status_code=httpx.codes.INTERNAL_SERVER_ERROR, detail=str(e)
                )
