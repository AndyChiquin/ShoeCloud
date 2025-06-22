from app.db.extensions import db

# SOLID - SRP: This class is responsible only for representing the 'Role' database entity
class Role(db.Model):
    __tablename__ = 'roles'

    # POLA: Column definitions are standard and intuitive
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.String(255), nullable=True)

    # KISS + DRY: Utility method to serialize object data into dictionary format
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description
        }
