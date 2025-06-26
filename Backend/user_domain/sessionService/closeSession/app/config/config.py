import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    REDIS_HOST = os.getenv("REDIS_HOST", "redis-session")
    REDIS_PORT = int(os.getenv("REDIS_PORT", 6380))
    REDIS_DB = int(os.getenv("REDIS_DB", 0))
    REDIS_PASSWORD = os.getenv("REDIS_PASSWORD", None)

settings = Settings()
