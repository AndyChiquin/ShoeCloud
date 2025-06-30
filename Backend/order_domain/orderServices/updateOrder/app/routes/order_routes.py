from flask import Blueprint, request, jsonify
from app.services import order_services

order_bp = Blueprint('order_bp', __name__)

@order_bp.route('/orders/<int:order_id>', methods=['PUT'])
def update(order_id):
    data = request.json
    result = order_services.update_order(order_id, data)
    
    if result:
        return jsonify(result), 200
    return jsonify({'message': 'Order not found'}), 404
