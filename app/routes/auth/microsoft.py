from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.post("/microsoft")
def microsoft_auth():
    return {"reponse": "ok"}