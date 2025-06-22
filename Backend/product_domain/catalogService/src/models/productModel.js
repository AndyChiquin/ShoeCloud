// SOLID - SRP: This class is responsible only for modeling the product data structure
class Product {
  constructor({ id, name, description, category_id, price, brand }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category_id = category_id;
    this.price = price;
    this.brand = brand;
  }
}

module.exports = Product;
