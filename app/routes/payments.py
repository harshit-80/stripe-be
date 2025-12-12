from fastapi import APIRouter

from app.services.stripe_service import create_payment_intent

router = APIRouter()

@router.post("/create-payment-intent")
async def create_intent(payload: dict):
    plan_id = payload.get("plan_id")
    try:
        client_secret = create_payment_intent(plan_id)
        return {"client_secret": client_secret}
    except Exception as e:
        return {"error": str(e)}