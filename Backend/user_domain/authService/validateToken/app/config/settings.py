import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    JWT_SECRET = os.getenv("JWT_SECRET")
    JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
    JWT_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES", 30))

    REDIS_URL = os.getenv("REDIS_URL")
    USER_SERVICE_URL = os.getenv("USER_SERVICE_URL")

settings = Settings()
