import logging

from fastapi import APIRouter

from app.models.leetcode import (
    LeetcodeQuestion,
)
from app.models.practice import PracticeQuestion
from app.services.practice import PracticeService

log = logging.getLogger(__name__)


class PracticeController:
    def __init__(self, service: PracticeService):
        self.router = APIRouter()
        self.service = service
        self.setup_routes()

    def setup_routes(self):
        router = self.router

        @router.post(
            "",
            response_model=list[PracticeQuestion],
        )
        async def generate_practice_questions(
            leetcode_question: LeetcodeQuestion,
        ) -> list[PracticeQuestion]:
            log.info("Generating practice questions...")
            response: list[PracticeQuestion] = (
                await self.service.generate_practice_questions(
                    leetcode_question=leetcode_question
                )
            )
            log.info("Practice questions generated successfully.")
            return response
