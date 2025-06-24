# 👟 ShoeCloud – Distributed E-commerce Platform for Sneakers

ShoeCloud is a distributed e-commerce system focused on selling two types of sneakers: **sports (football)** and **urban (lifestyle)**. The project aims to implement a scalable and robust microservices architecture, integrating multiple technologies, databases, architectural styles, observability tools, security features, and DevOps automation.

---

## 🌐 Key Features

- 🧩 **30 microservices** grouped by business domain
- 🧠 **5 backend languages** (Python, Go, Node.js, Java, PHP)
- 📱 **Cross-platform frontend**: Web, Mobile, and Desktop
- 🔗 **5 architecture styles**: REST, SOAP, WebSocket, Webhook, gRPC
- 🗃️ **7 databases** from 3 different types: Relational, NoSQL, and Key-Value
- 📊 **Full observability** with Prometheus, Grafana, CloudWatch, and Site24x7
- 🔒 **Advanced security** with JWT, CORS, and Bastion Host (Jump Box)
- 🔁 **Event-Driven Architecture** for reactive communication
- 🛠️ **DevOps CI/CD** with GitHub Actions, DockerHub, and EC2 deployment

---

## 🧭 Project Structure

ShoeCloud/
├── Backend/
│ ├── user_domain/
│ ├── product_domain/
│ ├── order_domain/
│ ├── inventory_domain/
│ └── analysis_domain/
├── Frontend/
│ ├── web/
│ ├── mobile/
│ └── desktop/
├── Infra/
│ ├── terraform/
│ └── monitoring/
└── README.md


## 🧩 Business Domains

- **User Domain**: Authentication, roles, sessions, profiles, password recovery
- **Product Domain**: Catalog, categories, search, images, pricing, inventory
- **Order Domain**: Shopping cart, orders, invoices, refunds

---

## 🚀 Deployment

Each domain is deployed in a **separate EC2 instance**. The system uses:

- **Docker & Docker Compose** per microservice
- **GitHub Actions** for CI/CD automation
- **Terraform** for infrastructure as code
- **API Gateway and Load Balancer** as entry layer

---

## 🛡️ Security

- 🔑 JWT tokens in all microservices
- 🔐 Role-based access control
- 🛡️ Bastion Host (Jump Box) for secure access
- ✅ Cross-service validation and authentication

---

## 📦 Core Technologies

| Technology     | Purpose                          |
|----------------|----------------------------------|
| Python/Flask   | User-related microservices        |
| Go             | Invoices, refunds, payments       |
| Node.js        | Products, search, images          |
| Java/Spring    | Shopping cart service             |
| MySQL/PostgreSQL | Relational databases            |
| MongoDB        | Unstructured document storage     |
| Redis          | Temporary data/session handling   |
| Kafka/Redpanda | Event-driven communication        |

---

## 📈 Project Status

✅ Working modules:
- Login, Registration, User Profile
- Product Catalog
- Shopping Cart
- User-based Reports
- Password Recovery
- Microservices integrated via REST and Kafka events

🚧 In Progress:
- Frontend integration with all services
- Full automation for QA and Production environments
- Implementation of CQRS, Hexagonal, and Clean Architecture patterns

---

## 🧠 By
 Andy Chiquin  

---

## 📬 Contact

📧 andychiquin.dev@gmail.com

---

> ⚠️ This README is a **provisional version** and subject to change as development progresses.