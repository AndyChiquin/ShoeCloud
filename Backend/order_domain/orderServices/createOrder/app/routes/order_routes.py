from flask import Blueprint, request, jsonify
from app.services import order_services

order_bp = Blueprint('order_bp', __name__)

@order_bp.route('/orders', methods=['POST'])
def create():
    data = request.json
    result = order_services.create_order(data)

    # Si result es una tupla (respuesta, código), es porque hubo error
    if isinstance(result, tuple):
        return jsonify(result[0]), result[1]

    # Si no, está todo bien → retornar con código 201
    return jsonify(result), 201
