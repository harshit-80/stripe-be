from fastapi import APIRouter
from .google import router as google_router
from .microsoft import router as microsoft_router

router = APIRouter(prefix="/auth")
router.include_router(google_router)
router.include_router(microsoft_router)
