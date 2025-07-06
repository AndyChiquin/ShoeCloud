# 🧩 Backend – ShoeCloud

This folder contains the **entire backend structure** of the ShoeCloud platform.  
It is organized by **business domains**, where each domain contains its own microservices, Docker files, routes, configurations, tests, and deployment tools.

---

## 🏗️ Folder Structure

```bash
Backend/
├── gateway/               # NGINX reverse proxy configs
├── order_domain/          # Order and reservation-related microservices
├── product_domain/        # Product, category, inventory, pricing, image services
├── product_gateway/       # Gateway specific to product domain
├── user_domain/           # Authentication, profile, roles, sessions
└── README.md              # Documentation for the Backend section
```
## 🔍 Overview
Each domain contains one or more microservices that are:

🔁 Independent and loosely coupled

🧱 Modular using folders: routes/, controllers/, models/, services/, config/

🧪 Equipped with unit tests

🐳 Packaged with their own Dockerfile

🔧 Managed through CI/CD using GitHub Actions

📦 Deployed to EC2 with auto-pull + Docker run

📑 Documented with Swagger UI

## 📦 Domains Breakdown
### user_domain/
registerUser: Handles user sign-up

login_auth: Token generation and login

sessionService: Redis session control

roleService: Assign and read user roles

recoverPassword: Password recovery

### product_domain/
createProduct, deleteProduct, updateProduct, readProduct

categoryService: CRUD for product categories

inventoryService: Tracks stock availability

pricingService: Price assignment and updates

imageService: Product image uploads (MongoDB or GridFS)

### order_domain/
createReservation: Book a field/product

deleteReservation, updateReservation, listReservations

### product_gateway
Internal gateway routing only for product-related services

Uses NGINX or Express Gateway configs

### gateway/
Main NGINX gateway with reverse proxy configs per service

SSL termination ready

Used by Load Balancer on EC2
--- 

## 🔐 Security
All microservices use JWT Authentication

CORS is configured in every route layer

Role-based access (admin/user) is handled via roleService

Secrets and tokens are managed with .env files
---

## ☁️ Deployment (EC2)
Each microservice is deployed through GitHub Actions using:

scp to copy files or pull images

ssh to log into EC2

docker pull + docker run with restart policy

Reverse proxy via NGINX
---
## 🚀 How to Run Locally
cd Backend/user_domain/registerUser
docker-compose up --build
---

## 🧪 Unit Testing
Each microservice includes its own unit tests using:

pytest for Python services

npm test or jest for Node.js services

go test for Go services

mvn test for Java services

Tests are triggered before deployment in the CI/CD pipeline.

## 🧠 Design Patterns Used
MVC: All services follow a controller-service-model pattern

## 👨‍💻 Maintainers
Andy Chiquin – Developer

