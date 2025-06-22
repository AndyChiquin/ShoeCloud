from app.models.order_model import Order
from app.config.db import db

def create_order(data):
    new_order = Order(
        user_id=data['user_id'],
        date=data.get('date'),  # opcional, por defecto es ahora
        status=data['status'],
        total=data['total']
    )
    db.session.add(new_order)
    db.session.commit()
    return new_order.to_dict()

def get_all_orders():
    orders = Order.query.all()
    return [order.to_dict() for order in orders]

def get_order_by_id(order_id):
    order = Order.query.get(order_id)
    return order.to_dict() if order else None

def update_order(order_id, data):
    order = Order.query.get(order_id)
    if not order:
        return None
    order.status = data.get('status', order.status)
    order.total = data.get('total', order.total)
    db.session.commit()
    return order.to_dict()

def delete_order(order_id):
    order = Order.query.get(order_id)
    if not order:
        return False
    db.session.delete(order)
    db.session.commit()
    return True
