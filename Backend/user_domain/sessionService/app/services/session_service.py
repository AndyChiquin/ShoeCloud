from app.models.session_model import Session

# SOLID - SRP: Each function has only one responsibility
# KISS: Simple and clear session creation logic
def create_new_session(user_id):
    session = Session(user_id)
    session.save()
    return session

# KISS: Delegates session closing to the model
# DRY: Logic for ending session is centralized inside the model
def close_session(session_id):
    return Session.end_session(session_id)

# KISS: Retrieves all sessions for a specific user
# SOLID - SRP: Function is dedicated only to fetching session history
def get_user_sessions(user_id):
    return Session.get_sessions_by_user(user_id)
