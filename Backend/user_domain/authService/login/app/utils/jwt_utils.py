from datetime import datetime, timedelta
from jose import jwt, JWTError
from app.config.settings import settings

# KISS: Creates a JWT token in a straightforward and readable way
# SOLID - SRP: This function only creates a token, no extra responsibilities
def create_token(data: dict):
    to_encode = data.copy()
    to_encode["sub"] = str(to_encode.get("sub"))  # ✅ Ensures 'sub' is a string as required by JWT spec

    expire = datetime.utcnow() + timedelta(minutes=settings.JWT_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
    return token

# KISS: Token verification handled cleanly
# SRP: This function's only job is to decode and validate a token
def verify_token(token: str):
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        return {"valid": True, "data": payload}
    except JWTError as e:
        print("❌ JWT decode failed:", str(e))
        return {"valid": False, "data": None}

# YAGNI: Debug-only print to verify current secret; can be removed in production
print("🔐 JWT_SECRET in use:", settings.JWT_SECRET)
