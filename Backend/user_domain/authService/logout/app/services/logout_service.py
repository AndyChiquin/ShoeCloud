import requests
from app.services.redis_client import redis_client
from app.utils.jwt_utils import verify_token

def logout_user(token: str):
    result = verify_token(token)
    if not result["valid"]:
        return {"success": False, "error": "Invalid token"}

    user_id = result["data"]["sub"]
    redis_client.delete(f"token:{user_id}")

    try:
        response = requests.patch(f"http://44.218.255.193:8003/session/user/{user_id}/close-latest")
        if response.status_code != 200:
            print("Failed to close session:", response.text)
    except Exception as e:
        print("SessionService exception:", str(e))

    try:
        audit_response = requests.post(
            "http://44.218.255.193:8004/log",
            json={
                "user_id": user_id,
                "action": "logout",
                "metadata": {}
            }
        )
        if audit_response.status_code != 201:
            print("Audit log not created:", audit_response.text)
    except Exception as e:
        print("AuditService exception:", str(e))

    return {"success": True}
