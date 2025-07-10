# 🛍️ ShoeCloud

**ShoeCloud** is a distributed microservices-based platform designed for managing the complete lifecycle of a modern shoe store, including inventory, users, orders. It was developed as the **Final Project for the Distributed Programming course** and implements a robust cloud-native architecture on **AWS**.

---

## 🌐 Overview

ShoeCloud is composed of **30+ microservices** organized by **business domains**. Each microservice is designed to be independent, resilient, and deployable on demand. The system integrates **multi-style architectures**, **event-driven processing**, **REST/SOAP/WebSocket/Webhook communication**, and full **CI/CD automation**.

---

## ⚙️ Technologies Used

| Layer           | Technologies/Tools                                                                 |
|----------------|--------------------------------------------------------------------------------------|
| **Frontend**    | Vue.js Quasar, Axios, HTML                                                    |
| **Backend**     | Node.js, Python (Flask), Go, Java (Spring), Ruby                                   |
| **Architecture**| REST, SOAP, WebSocket, Webhook, Event-Driven, MVC Pattern                          |
| **Databases**   | PostgreSQL, MySQL, MariaDB (Relational) / MongoDB, DynamoDB (NoSQL) / Redis (Cache)|
| **DevOps**      | Docker, Docker Compose, GitHub Actions (CI/CD), NGINX, AWS EC2, AWS RDS, Load Balancer |
| **Security**    | JWT Authentication, CORS,                                                 |
| **Monitoring**  | AWS CloudWatch, Logs                                                        |
| **Testing**     | Unit tests per microservice (using `pytest`, `go test`, `npm test`, etc.)           |
| **Documentation** | Swagger                                                                |
| **Commits**     | [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)              |

---

## 📁 Project Structure

```bash
ShoeCloud/
├── .github/workflows/         # GitHub Actions (CI/CD)
├── Backend/                   # Backend microservices organized by domain
│   ├── user_domain/
│   ├── product_domain/
│   ├── order_domain/
│   └── ...
├── Frontend/                  # Frontend UI (Vue.js )
│   ├── public/
│   ├── src/
│   └── ...
├── nginx/                     # Reverse proxy config
└── README.md                  # Project documentation
```
---

## 📦 Microservice Features

Each microservice in ShoeCloud is built with independence and modularity in mind. The core features of every microservice include:

- 🐳 **Dockerized**: Each microservice is containerized for isolated deployment.
- 🔐 **JWT Authentication**: Secure endpoints for protected routes.
- 📑 **Swagger Documentation**: API routes are documented using Swagger/OpenAPI.
- 🧪 **Unit Testing**: Includes tests using appropriate tools (`pytest`, `npm test`, `go test`, `mvn test`).
- ✅ **Conventional Commits**: Every update follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard.
- 🔁 **Architecture Pattern**: Follows the MVC (Model-View-Controller) pattern.
- 📦 **.env Files**: Each service has its own configuration file for environment variables.

---

## 🧠 Architectural Styles Used

ShoeCloud leverages multiple architectural styles depending on the nature of each service:

| Style         | Purpose                                                                 |
|---------------|-------------------------------------------------------------------------|
| **REST**      | Standard communication between most microservices                      |
| **SOAP**      | Used in financial services like payment and invoice systems             |
| **WebSocket** | Real-time updates for reservations, availability, and pricing           |
| **Webhook**   | Event notification for services like `occupancyReports` and `alerts`    |

---

## 🗃️ Databases Used

The system uses a combination of relational, non-relational, and cache databases to optimize performance and data integrity:

| Purpose                    | Type         | Engine       |
|---------------------------|--------------|--------------|
| User Profiles, Auth       | Relational   | MySQL, PostgreSQL |
| Product Catalog           | NoSQL        | DynamoDB     |
| Reservations & Orders     | Relational   | PostgreSQL   |
| Inventory                 | Document     | MongoDB      |
| Cart / Sessions           | Cache/Store  | Redis        |
| Payments, Refunds         | Relational   | MariaDB      |

---

## 🚀 Installation & Setup

### 🔧 Prerequisites

- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)
- AWS Account with permissions for EC2, RDS, CloudWatch

### 🐳 Local Deployment with Docker

Each microservice has its own Dockerfile and `docker-compose.yml`.

Example:
```bash
cd Backend/user_domain/registerUser
docker-compose up --build

```

### 🧬 Clone the repository

```bash
git clone https://github.com/AndyChiquin/ShoeCloud.git
cd ShoeCloud

```
