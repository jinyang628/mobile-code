import logging

from fastapi import APIRouter

from app.controllers.questions import QuestionsController
from app.services.questions import QuestionsService

log = logging.getLogger(__name__)

router = APIRouter()

### Health check


@router.get("/status")
async def status():
    log.info("Status endpoint called")
    return {"status": "ok"}


### Problems


def get_problems_controller_router():
    service = QuestionsService()
    return QuestionsController(service=service).router


router.include_router(
    get_problems_controller_router(),
    tags=["questions"],
    prefix="/api/questions",
)
