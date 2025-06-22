from flask import Blueprint, request, jsonify
from app.services import order_service

order_bp = Blueprint('order_bp', __name__)

@order_bp.route('/orders', methods=['POST'])
def create():
    data = request.json
    result = order_service.create_order(data)

    # Si result es una tupla (respuesta, código), es porque hubo error
    if isinstance(result, tuple):
        return jsonify(result[0]), result[1]

    # Si no, está todo bien → retornar con código 201
    return jsonify(result), 201


@order_bp.route('/orders', methods=['GET'])
def get_all():
    result = order_service.get_all_orders()
    return jsonify(result), 200

@order_bp.route('/orders/<int:order_id>', methods=['GET'])
def get_by_id(order_id):
    result = order_service.get_order_by_id(order_id)
    if result:
        return jsonify(result), 200
    return jsonify({'message': 'Order not found'}), 404

@order_bp.route('/orders/<int:order_id>', methods=['PUT'])
def update(order_id):
    data = request.json
    result = order_service.update_order(order_id, data)
    if result:
        return jsonify(result), 200
    return jsonify({'message': 'Order not found'}), 404

@order_bp.route('/orders/<int:order_id>', methods=['DELETE'])
def delete(order_id):
    result = order_service.delete_order(order_id)
    if result:
        return jsonify({'message': 'Order deleted'}), 200
    return jsonify({'message': 'Order not found'}), 404
