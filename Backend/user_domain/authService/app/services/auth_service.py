import requests
from werkzeug.security import check_password_hash
from app.config.settings import settings
from app.services.redis_client import redis_client
from app.utils.jwt_utils import create_token, verify_token

# KISS: Handles the login process in a clear, step-by-step flow
# SOLID - SRP: Only responsible for authenticating the user and managing token/session/audit
def login_user(email: str, password: str):
    # DRY: Uses external user service to retrieve user by email
    url = f"{settings.USER_SERVICE_URL}/users/email/{email}"
    response = requests.get(url)

    if response.status_code != 200:
        return {"success": False, "error": "User not found"}

    user_data = response.json()

    # KISS: Uses a clear method for password hash verification
    if not check_password_hash(user_data["password"], password):
        return {"success": False, "error": "Invalid password"}

    # SOLID + DRY: Generates token using shared JWT utility
    token = create_token({"sub": user_data["id"]})
    redis_client.setex(f"token:{user_data['id']}", settings.JWT_EXPIRE_MINUTES * 60, token)

    # POLA: Tries to create a session in the session service
    try:
        session_response = requests.post(
            "http://44.218.255.193:8003/session/",
            json={"user_id": user_data["id"]}
        )
        if session_response.status_code != 201:
            return {"success": False, "error": "Session creation failed"}
    except Exception as e:
        return {"success": False, "error": f"Session error: {str(e)}"}

    # DRY + SOLID: Sends audit log to the audit service
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

# KISS: Validates token and checks consistency with Redis
# SOLID - SRP: Only validates token, doesn't handle other user logic
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

# SRP: Responsible only for logging out and invalidating session/token
def logout_user(token: str):
    result = verify_token(token)
    if not result["valid"]:
        return {"success": False, "error": "Invalid token"}

    user_id = result["data"]["sub"]
    redis_client.delete(f"token:{user_id}")

    # KISS + DRY: Session service is responsible for session state
    try:
        response = requests.patch(f"http://44.218.255.193:8003/session/user/{user_id}/close-latest")
        if response.status_code != 200:
            print("Failed to close session:", response.text)
    except Exception as e:
        print("SessionService exception:", str(e))

    # Sends logout event to audit service
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
