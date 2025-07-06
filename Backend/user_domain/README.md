# 🧩 User Domain - Microservices

This domain manages all functionality related to **user identity, roles, authentication, sessions, auditing, and user profile management**. It follows a microservices architecture and is designed to be **modular, scalable**, and **secure**, using **Python + Flask**, **Docker**, and **AWS EC2**.

---

## 🗂 Directory Structure
```bash
user_domain/
├── authService/ # Handles login, logout, token validation
│ ├── login/
│ ├── logout/
│ └── validateToken/
│
├── roleService/ # Manages user roles and permissions
│ ├── createRole/
│ ├── deleteRole/
│ ├── readRole/
│ └── updateRole/
│
├── sessionService/ # Manages active sessions
│ ├── createSession/
│ ├── readSession/
│ └── closeSession/
│
├── userAuditService/ # Tracks user activity (create, update, delete)
│ ├── createAudit/
│ └── readAudit/
│
├── userProfileService/ # Manages user registration and profile
│ ├── createUser/
│ ├── readUser/
│ ├── updateUser/
│ └── deleteUser/
```


---

## ⚙️ Technology Stack

- **Language**: Python 3.10+
- **Framework**: Flask
- **Architecture**: MVC Pattern
- **Containerization**: Docker & Docker Compose
- **Database**: MySQL / PostgreSQL (AWS RDS), Redis (for sessions)
- **Authentication**: JWT
- **Deployment**: AWS EC2 + NGINX Gateway
- **Logs**: Console, JSON logs supported

---

## 🔁 Communication

All microservices are **RESTful**, some use **WebSocket** (if needed), and all are routed via a central **NGINX Gateway**. Internal communication is **stateless** and can optionally be extended with **event-based** logic via Kafka or WebHooks.

---

## 🛡️ Security

- JWT authentication for all secure routes.
- Passwords hashed using bcrypt or werkzeug.
- Rate limiting can be applied via NGINX or Flask extensions.
- All secrets are managed using `.env` files (not committed).

---

## 🔄 CI/CD

- Each microservice has its **own workflow file** under `.github/workflows`.
- **Only updated files trigger builds.**
- **Tests run before Docker build and deploy.**
- Deployment is automatic to **AWS EC2** after successful build.

---

## 🚀 Deployment Steps

Each microservice can be deployed independently:

```bash
# Build and run a single service
docker-compose up --build

# Or use GitHub Actions to deploy to EC2
```

### 🧪 Testing
pytest test/

## 🧠 Maintainers
Andy Chiquin - Developer 