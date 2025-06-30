from flask import Blueprint, jsonify
from app.services import order_services

order_bp = Blueprint('order_bp', __name__)

@order_bp.route('/orders', methods=['GET'])
def get_all():
    result = order_services.get_all_orders()
    return jsonify(result), 200

@order_bp.route('/orders/<int:order_id>', methods=['GET'])
def get_by_id(order_id):
    result = order_services.get_order_by_id(order_id)
    if result:
        return jsonify(result), 200
    return jsonify({'message': 'Order not found'}), 404
