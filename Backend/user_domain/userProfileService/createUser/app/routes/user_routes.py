from flask import Blueprint, request, jsonify, make_response
from app.services.user_service import create_user
from app.models.user_model import User

user_create_bp = Blueprint("user_create", __name__, url_prefix="/users")

@user_create_bp.route("/", methods=["POST", "OPTIONS"])
def register_user():
    """
    Crear un nuevo usuario
    ---
    tags:
      - Usuarios
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          required:
            - name
            - email
          properties:
            name:
              type: string
              example: Kevin
            email:
              type: string
              example: kevin@mail.com
    responses:
      201:
        description: Usuario creado exitosamente
        schema:
          type: object
          properties:
            id:
              type: integer
              example: 1
            name:
              type: string
              example: Kevin
      400:
        description: Error en la creación del usuario
    """
    if request.method == "OPTIONS":
        return make_response('', 200)

    data = request.json
    user = create_user(data)
    return jsonify({"id": user.id, "name": user.name}), 201
