import logging

import httpx
from fastapi import APIRouter, HTTPException

from app.models.problems import Problem, ProblemOptions
from app.services.problems import ProblemsService

log = logging.getLogger(__name__)


class ProblemsController:
    def __init__(self, service: ProblemsService):
        self.router = APIRouter()
        self.service = service
        self.setup_routes()

    def setup_routes(self):
        router = self.router

        @router.get(
            "/",
            response_model=list[Problem],
        )
        async def get_problems(input: ProblemOptions) -> list[Problem]:
            try:
                log.info("Starting round...")
                response: list[Problem] = await self.service.get_problems(input)
                return response
            except Exception as e:
                log.error("Unexpected error in problems controller.py: %s", str(e))
                raise HTTPException(
                    status_code=httpx.codes.INTERNAL_SERVER_ERROR, detail=str(e)
                )
