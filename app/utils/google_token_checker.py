from google.oauth2 import id_token
from app.config import settings
from google.auth.transport import requests


client_id = settings.GOOGLE_CLIENT_ID


def google_token_checker(a_token):
    idinfo = id_token.verify_oauth2_token(a_token, requests.Request(), client_id)

    if idinfo["iss"] not in ["accounts.google.com", "https://accounts.google.com"]:
        raise ValueError("Invalid issuer")

    if not idinfo.get("email_verified"):
        raise ValueError("Email not verified")

    return idinfo
