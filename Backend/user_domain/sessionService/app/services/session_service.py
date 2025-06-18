from app.models.session_model import Session

def create_new_session(user_id):
    session = Session(user_id)
    session.save()
    return session

def close_session(session_id):
    return Session.end_session(session_id)

def get_user_sessions(user_id):
    return Session.get_sessions_by_user(user_id)
