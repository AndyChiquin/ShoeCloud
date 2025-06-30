from app.models.order_model import Order
from app.config.db_config import db
import requests
from app.models.order_item_model import OrderItem

def create_order(data):
    user_id = data['user_id']

    # VALIDAR que el usuario existe en el microservicio de usuarios
    user_url = f"http://52.200.35.19:8001/users/{user_id}"

    try:
        response = requests.get(user_url, timeout=5)
        if response.status_code != 200:
            return {"error": "Usuario no encontrado en userService"}, 400
    except requests.exceptions.RequestException as e:
        return {"error": "Error al conectar con userService", "details": str(e)}, 500

    # VALIDAR productos
    items = data.get('items', [])
    for item in items:
        product_id = item.get('product_id')
        if not product_id:
            return {"error": "Falta product_id en un item"}, 400

        product_url = f"http://13.216.150.108:3001/api/products/{product_id}"
        try:
            product_response = requests.get(product_url, timeout=5)
            if product_response.status_code != 200:
                return {"error": f"Producto con ID {product_id} no existe"}, 400
        except Exception as e:
            return {"error": f"Error al conectar con productService para ID {product_id}", "details": str(e)}, 500

    # Crear la orden si todo está validado
    new_order = Order(
        user_id=user_id,
        date=data.get('date'),
        status=data['status'],
        total=data['total']
    )
    db.session.add(new_order)
    db.session.commit()

    # Agregar ítems
    for item in items:
        new_item = OrderItem(
            order_id=new_order.id,
            product_id=item['product_id'],
            quantity=item['quantity']
        )
        db.session.add(new_item)

    db.session.commit()

    return {
        "message": "Orden creada exitosamente",
        "order_id": new_order.id
    }
