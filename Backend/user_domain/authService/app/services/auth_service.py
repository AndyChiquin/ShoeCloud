import requests
from werkzeug.security import check_password_hash
from app.config.settings import settings
from app.services.redis_client import redis_client
from app.utils.jwt_utils import create_token, verify_token


def login_user(email: str, password: str):
    # Consulta al user-profile-service
    url = f"{settings.USER_SERVICE_URL}/users/email/{email}"
    response = requests.get(url)

    if response.status_code != 200:
        return {"success": False, "error": "User not found"}

    user_data = response.json()

    # Validar contraseña
    if not check_password_hash(user_data["password"], password):
        return {"success": False, "error": "Invalid password"}

    # Generar y guardar JWT en Redis
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

    return {"success": True, "token": token, "user_id": user_data["id"]}



def validate_token(token: str):
    result = verify_token(token)
    print("🔍 TOKEN RECIBIDO:", token)

    if not result["valid"]:
        print("❌ Token inválido por firma.")
        return {"valid": False}

    user_id = result["data"]["sub"]
    stored_token = redis_client.get(f"token:{user_id}")
    print("📦 TOKEN GUARDADO EN REDIS:", stored_token)

    if stored_token != token:
        print("❌ Token no coincide.")
        return {"valid": False}

    print("✅ Token válido.")
    return {"valid": True, "user_id": user_id}


def logout_user(token: str):
    result = verify_token(token)
    if not result["valid"]:
        return {"success": False, "error": "Invalid token"}

    user_id = result["data"]["sub"]
    redis_client.delete(f"token:{user_id}")

    try:
        session_url = f"{settings.SESSION_SERVICE_URL}/session/{user_id}/close-latest"
        response = requests.patch(session_url)
        if response.status_code != 200:
            print("SessionService error:", response.text)
    except Exception as e:
        print("SessionService exception:", str(e))

    return {"success": True}










