import os
from dotenv import load_dotenv


load_dotenv()

class Settings:
    STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY")
    STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")
    GOOGLE_CLIENT_ID= os.getenv("GOOGLE_CLIENT_ID")
    GOOGLE_CLIENT_SECRET=os.getenv("GOOGLE_CLIENT_SECRET")
    MICROSOFT_CLIENT_ID=os.getenv("MICROSOFT_CLIENT_ID")
    MICROSOFT_CLIENT_SECRET=os.getenv("MICROSOFT_CLIENT_SECRET")

settings= Settings()