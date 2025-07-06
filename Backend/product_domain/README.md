# 🧩 Product Domain - Microservices

This domain manages all functionality related to **products, categories, inventory, pricing, images, and product search**. It follows a microservices architecture and is designed to be **modular**, **scalable**, and **decoupled**, using **Node.js**, **Docker**, and **AWS EC2**.

---

## 🗂 Directory Structure

```bash
product_domain/
├── catalogService/       # Manages product CRUD operations
│   ├── createProduct/
│   ├── deleteProduct/
│   ├── readProduct/
│   └── updateProduct/

├── categoryService/      # Manages product categories
│   ├── createCategory/
│   ├── deleteCategory/
│   ├── readCategory/
│   └── updateCategory/

├── imageService/         # Manages image upload, update and retrieval
│   ├── createImage/
│   ├── deleteImage/
│   ├── readImage/
│   └── updateImage/

├── inventoryService/     # Manages inventory quantity
│   ├── createInventory/
│   ├── deleteInventory/
│   ├── readInventory/
│   └── updateInventory/

├── pricingService/       # Manages pricing via WebSockets
│   ├── createPrice/
│   ├── deletePrice/
│   ├── readPrice/
│   └── updatePrice/

├── searchService/        # Handles product indexing and search
│   ├── indexProduct/
│   └── searchProduct/

```
## ⚙️ Technology Stack
- Language: JavaScript (Node.js v18+)
- Framework: Express.js
- Architecture: MVC Pattern
- Containerization: Docker & Docker Compose
- Databases:
- MongoDB: Images, product metadata, search indexing
- PostgreSQL / MySQL: Products, categories, inventory
- Real-Time: WebSocket (for pricing service)
- Deployment: AWS EC2 + NGINX Gateway

## 🔁 Communication
All services expose RESTful APIs
pricingService uses WebSockets
Routing is managed by a centralized NGINX Gateway
Communication between services is stateless

## 🛡️ Security
Uses JWT for authentication (if needed)
All secrets stored in .env files (not committed)
Rate limiting and CORS can be handled via NGINX or middleware

## 🔄 CI/CD
Each service has its own workflow YAML in .github/workflows
Actions include:
Install dependencies
Run unit tests (Jest or Mocha)
Build Docker image
Deploy to EC2 via GitHub Actions

## 🚀 Deployment
Each microservice is containerized and can be deployed separately.

## 🧪 Testing
Each service contains a test/ directory
Use your preferred framework: jest

## 🧠 Maintainers
Andy Chiquin