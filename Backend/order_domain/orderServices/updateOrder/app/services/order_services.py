from app.models.order_model import Order
from app.config.db_config import db

def update_order(order_id, data):
    order = Order.query.get(order_id)
    if not order:
        return None

    order.status = data.get('status', order.status)
    order.total = data.get('total', order.total)
    db.session.commit()

    return order.to_dict()
