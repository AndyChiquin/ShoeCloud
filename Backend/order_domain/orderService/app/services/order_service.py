from app.models.order_model import Order
from app.config.db import db
import requests

def create_order(data):
    user_id = data['user_id']

    # VALIDAR que el usuario existe en el microservicio de usuarios
    user_url = f"http://44.218.255.193:8000/users/{user_id}" 

    try:
        response = requests.get(user_url, timeout=5)
        if response.status_code != 200:
            return {"error": "Usuario no encontrado en userService"}, 400
    except requests.exceptions.RequestException as e:
        return {"error": "Error al conectar con userService", "details": str(e)}, 500

    # Si usuario válido, crear orden
    new_order = Order(
        user_id=user_id,
        date=data.get('date'),
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
