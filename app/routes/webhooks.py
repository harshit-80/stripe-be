from fastapi import APIRouter, Request, HTTPException

import stripe

from app.config import settings

router = APIRouter()


@router.post("/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()

    sig_header = request.headers.get("stripe-signature")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    if event["type"] == "payment_intent.succeeded":
        print("payment succedded")
        payment_intent = event["data"]["object"]

    return {"status": "ok"}
