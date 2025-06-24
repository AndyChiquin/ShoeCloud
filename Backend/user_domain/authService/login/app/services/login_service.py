import requests
from werkzeug.security import check_password_hash
from app.config.settings import settings
from app.services.redis_client import redis_client
from app.utils.jwt_utils import create_token

# KISS: Handles the login process in a clear, step-by-step flow
# SOLID - SRP: Only responsible for authenticating the user and managing token/session/audit
def login_user(email: str, password: str):
    url = f"{settings.USER_SERVICE_URL}/users/email/{email}"
    response = requests.get(url)

    if response.status_code != 200:
        return {"success": False, "error": "User not found"}

    user_data = response.json()

    if not check_password_hash(user_data["password"], password):
        return {"success": False, "error": "Invalid password"}

    token = create_token({"sub": user_data["id"]})
    redis_client.setex(f"token:{user_data['id']}", settings.JWT_EXPIRE_MINUTES * 60, token)

    try:
        session_response = requests.post(
            "http://44.218.255.193:8003/session/",
            json={"user_id": user_data["id"]}
        )
        if session_response.status_code != 201:
            return {"success": False, "error": "Session creation failed"}
    except Exception as e:
        return {"success": False, "error": f"Session error: {str(e)}"}

    try:
        audit_response = requests.post(
            "http://44.218.255.193:8004/log",
            json={
                "user_id": user_data["id"],
                "action": "login_success",
                "metadata": {
                    "email": email
                }
            }
        )
        if audit_response.status_code != 201:
            print("Audit log not created:", audit_response.text)
    except Exception as e:
        print("AuditService exception:", str(e))

    return {"success": True, "token": token, "user_id": user_data["id"]}
