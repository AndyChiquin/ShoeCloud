import requests
from app.services.redis_client import redis_client
from app.utils.jwt_utils import verify_token
from app.utils.audit_logger import log_user_action_soap  # IMPORTANTE

def logout_user(token: str):
    result = verify_token(token)
    if not result["valid"]:
        return {"success": False, "error": "Invalid token"}

    user_id = result["data"]["sub"]
    redis_client.delete(f"token:{user_id}")

    # Cerrar sesión activa
    try:
        response = requests.patch(f"http://3.209.221.173:8012/session/user/{user_id}/close-latest")
        if response.status_code != 200:
            print("Failed to close session:", response.text)
    except Exception as e:
        print("SessionService exception:", str(e))

    # Registrar en auditoría usando SOAP
    try:
        log_user_action_soap(
            user_id=user_id,
            action="logout_success",
            metadata={"info": "Sesión cerrada correctamente"}
        )
    except Exception as e:
        print("SOAP AuditService exception:", str(e))

    return {"success": True}
