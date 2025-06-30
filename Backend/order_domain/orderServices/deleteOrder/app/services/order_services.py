from app.models.order_model import Order
from app.config.db_config import db

def delete_order(order_id):
    order = Order.query.get(order_id)
    if not order:
        return False

    db.session.delete(order)
    db.session.commit()
    return True
