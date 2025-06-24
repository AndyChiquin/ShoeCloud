from app.models.session_model import Session

# SRP: Este servicio solo crea sesiones
def create_new_session(user_id):
    session = Session(user_id)
    session.save()
    return session
