
class Product {
  constructor({ id, name, description, category_id, price, brand, stock }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category_id = category_id;
    this.price = price;
    this.brand = brand;
    this.stock = stock;
  }
}

module.exports = Product;
