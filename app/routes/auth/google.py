from fastapi import APIRouter, HTTPException
import requests
from app.config import settings
from app.utils.google_token_checker import google_token_checker

router = APIRouter()

client_id = settings.GOOGLE_CLIENT_ID
client_secret = settings.GOOGLE_CLIENT_SECRET


@router.post("/google")
def google_auth(payload: dict):
    code = payload["code"]
    verifier = payload["verifier"]

    if not code or not verifier:
        return HTTPException(400, "code or verifier not found")
    token_res = requests.post(
        "https://oauth2.googleapis.com/token",
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
        raise HTTPException(400, "google token exchange failed")

    tokens = token_res.json()
    internal_response = google_token_checker(tokens['id_token'])
    print(tokens['id_token'])


    # return {"reponse": "ok", "data": {"tokens": tokens}}
    return {"reponse": "ok", "data": {"tokens": tokens, "internal response": internal_response}}