import uuid
from datetime import datetime
from app.db.redis_client import redis_client

class Session:
    def __init__(self, user_id, status="active"):
        self.id = str(uuid.uuid4())
        self.user_id = user_id
        self.datetime_start = datetime.utcnow().isoformat()
        self.datetime_end = None
        self.status = status

    def save(self):
        redis_client.hset(f"session:{self.id}", mapping={
            "id": self.id,
            "user_id": self.user_id,
            "datetime_start": self.datetime_start,
            "datetime_end": self.datetime_end or "",
            "status": self.status
        })

    @staticmethod
    def end_session(session_id):
        key = f"session:{session_id}"
        if redis_client.exists(key):
            redis_client.hset(key, mapping={
                "datetime_end": datetime.utcnow().isoformat(),
                "status": "closed"
            })
            return True
        return False

    @staticmethod
    def get_sessions_by_user(user_id):
        keys = redis_client.keys("session:*")
        user_sessions = []
        for key in keys:
            session = redis_client.hgetall(key)
            if session.get("user_id") == str(user_id):
                user_sessions.append(session)
        return user_sessions
