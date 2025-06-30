from app.models.order_model import Order
from app.config.db_config import db

def get_all_orders():
    orders = Order.query.all()
    return [order.to_dict() for order in orders]

def get_order_by_id(order_id):
    order = Order.query.get(order_id)
    return order.to_dict() if order else None
