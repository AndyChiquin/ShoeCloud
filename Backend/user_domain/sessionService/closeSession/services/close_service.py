from app.models.session_model import Session

def close_session(session_id):
    return Session.end_session(session_id)
