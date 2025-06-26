from datetime import datetime, timedelta
from jose import jwt, JWTError
from app.config.settings import settings


def create_token(data: dict):
    to_encode = data.copy()
    to_encode["sub"] = str(to_encode.get("sub"))  

    expire = datetime.utcnow() + timedelta(minutes=settings.JWT_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
    return token


def verify_token(token: str):
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        return {"valid": True, "data": payload}
    except JWTError as e:
        print("❌ JWT decode failed:", str(e))
        return {"valid": False, "data": None}

print("🔐 JWT_SECRET in use:", settings.JWT_SECRET)
