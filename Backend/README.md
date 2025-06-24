# 🧠 Backend – ShoeCloud Project

This folder contains the complete **backend** for the distributed system **ShoeCloud**, organized by business domains. Each domain is implemented as a set of independent microservices, following a modular and scalable architecture.

---

## 📂 Current Structure
Backend/
├── cart_domain/ # Microservices related to shopping cart operations
├── order_domain/ # Microservices for order management and refunds
├── product_domain/ # Product catalog, inventory, search, images, categories
├── user_domain/ # Authentication, roles, profiles, password recovery

Each domain may include one or more microservices, with its own:
- `Dockerfile` and `docker-compose.yml`
- `.env` configuration
- Routes, models, services, and controllers
- Database (RDS, MongoDB, Redis, etc.)
- Unit and integration tests
- GitHub Actions workflow (CI/CD)

---

## 🚀 Technologies Used

- **Languages**: Python, Node.js, Go, Java
- **Databases**: MySQL, PostgreSQL, Redis, MongoDB, DynamoDB
- **Architecture styles**: REST, SOAP, Event-Driven (Kafka/Redpanda), WebSocket
- **Security**: JWT authentication, CORS, Role-based access control

---

## 📦 Deployment Notes

- Each microservice is dockerized independently
- All deployments are managed via GitHub Actions → AWS EC2
- Configurations are injected via `.env` files (not pushed to GitHub)
- Databases are hosted either in EC2 or AWS RDS

---

## 📈 Work in Progress

- [x] Login & Registration microservices
- [x] Product & Inventory services
- [x] Shopping cart and refund logic
- [ ] Frontend integration (Web/Mobile/Desktop)
- [ ] Monitoring and full observability integration
- [ ] Auto-scaling and load balancing per domain

---

> This backend folder is under **active development** and subject to refactoring as more services and integrations are implemented.

