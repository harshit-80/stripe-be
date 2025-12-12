import stripe

from app.config import settings

stripe.api_key = settings.STRIPE_SECRET_KEY


#hardcoding the plans for now later we'll have to fetch from db


PLANS = {
    "plan_starter": 5000, #these are in paise by default
    "plan_pro": 20000,
    "plan_enterprice": 50000
}

def create_payment_intent(plan_id: str):
    amount = PLANS.get(plan_id)

    if amount is None:
        raise ValueError("Invalid plan_id")
    
    intent = stripe.PaymentIntent.create(
        amount = amount,
        currency = "inr",
        automatic_payment_methods={"enabled": True},
        metadata={
            "plan_id": plan_id,
            "user": "temp_since_no_db"
        }

    )
    return intent.client_secret
    
