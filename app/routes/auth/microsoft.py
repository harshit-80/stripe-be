from fastapi import APIRouter, HTTPException
import requests
from app.config import settings

router = APIRouter()

client_id = settings.MICROSOFT_CLIENT_ID
client_secret = settings.MICROSOFT_CLIENT_SECRET
tenant = "common"  

@router.post("/microsoft")
def microsoft_auth(payload: dict):
    code = payload.get("code")
    verifier = payload.get("verifier")

    if not code or not verifier:
        raise HTTPException(status_code=400, detail="code or verifier not found")

    token_res = requests.post(
        f"https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token",
        data={
            "client_id": client_id,
            "client_secret": client_secret,
            "code": code,
            "code_verifier": verifier,
            "grant_type": "authorization_code",
            "redirect_uri": "http://localhost:3000/login",
        },
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )

    if not token_res.ok:
        print(token_res.text)
        raise HTTPException(status_code=400, detail="microsoft token exchange failed")

    tokens = token_res.json()

    return {
        "response": "ok",
        "data": {
            "tokens": tokens
        }
    }
