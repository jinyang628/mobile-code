import logging

from fastapi import APIRouter

from app.controllers.leetcode import LeetcodeController
from app.services.questions import LeetcodeService

log = logging.getLogger(__name__)

router = APIRouter()

### Health check


@router.get("/status")
async def status():
    log.info("Status endpoint called")
    return {"status": "ok"}


### Problems


def get_leetcode_controller_router():
    service = LeetcodeService()
    return LeetcodeController(service=service).router


router.include_router(
    get_leetcode_controller_router(),
    tags=["leetcode"],
    prefix="/api/leetcode",
)
