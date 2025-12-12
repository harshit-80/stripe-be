from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import payments, webhooks



app = FastAPI()

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

app.include_router(payments.router)
app.include_router(webhooks.router)