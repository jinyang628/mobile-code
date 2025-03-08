import logging

from fastapi import APIRouter

from app.controllers.problems import ProblemsController
from app.services.problems import ProblemsService

log = logging.getLogger(__name__)

router = APIRouter()

### Health check


@router.get("/status")
async def status():
    log.info("Status endpoint called")
    return {"status": "ok"}


### Problems


def get_problems_controller_router():
    service = ProblemsService()
    return ProblemsController(service=service).router


router.include_router(
    get_problems_controller_router(),
    tags=["problems"],
    prefix="/api/problems",
)
