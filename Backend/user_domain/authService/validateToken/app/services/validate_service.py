from app.services.redis_client import redis_client
from app.utils.jwt_utils import verify_token

# KISS: Validates token and checks consistency with Redis
# SRP: Only validates token, doesn't handle other user logic
def validate_token(token: str):
    result = verify_token(token)
    print("🔍 TOKEN RECEIVED:", token)

    if not result["valid"]:
        print("❌ Invalid token signature.")
        return {"valid": False}

    user_id = result["data"]["sub"]
    stored_token = redis_client.get(f"token:{user_id}")
    print("📦 TOKEN STORED IN REDIS:", stored_token)

    if stored_token != token:
        print("❌ Token mismatch.")
        return {"valid": False}

    print("✅ Token is valid.")
    return {"valid": True, "user_id": user_id}
