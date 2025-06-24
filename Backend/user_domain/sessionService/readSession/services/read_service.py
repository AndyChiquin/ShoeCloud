from app.models.session_model import Session

def get_user_sessions(user_id):
    return Session.get_sessions_by_user(user_id)
