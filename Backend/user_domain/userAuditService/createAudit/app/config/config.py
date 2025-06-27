import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://mongo-audit:27017/user_audit_db")
    PORT = int(os.getenv("PORT", 8004))
