from flask import Blueprint, jsonify
from app.services import order_services

order_bp = Blueprint('order_bp', __name__)

@order_bp.route('/orders/<int:order_id>', methods=['DELETE'])
def delete(order_id):
    result = order_services.delete_order(order_id)
    if result:
        return jsonify({'message': 'Order deleted'}), 200
    return jsonify({'message': 'Order not found'}), 404
