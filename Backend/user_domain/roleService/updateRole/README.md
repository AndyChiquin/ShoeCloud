# 🛡️ roleService - User Role Management Microservice

This microservice handles **creation, reading, updating, and deletion of user roles**. It forms part of the `user_domain` and allows fine-grained control over user access levels within the platform.

---

## 🧩 Directory Structure

```bash
roleService/
├── updateRole/
│   ├── app/
│   │   ├── config/        # App configuration files (e.g., env, constants)
│   │   ├── db/            # DB connection (SQLAlchemy, etc.)
│   │   ├── models/        # Role models/schema
│   │   ├── routes/        # API route definitions
│   │   └── services/      # Business logic for role creation
│   ├── test/              # Unit tests
│   ├── .env.test          # Environment for testing
│   ├── .gitignore
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── main.py            # App entry point
│   └── requirements.txt   # Python dependencies


```
## ⚙️ Tech Stack
| Component     | Tech               |
| ------------- | ------------------ |
| Language      | Python 3.10+       |
| Framework     | Flask              |
| Auth          | JWT (PyJWT)        |
| Hashing       | bcrypt / werkzeug  |
| Containerized | Docker             |
| Deployment    | AWS EC2            |
| Gateway       | NGINX              |
| Config        | `.env` for secrets |

## 📡 Endpoints
| Method | Route         | Description             |
| ------ | ------------- | ----------------------- |
| PUT    | `/roles/<id>` | Update role information |


# Each folder contains:

- app/ directory with:
- config/: environment settings, constants
- db/: DB connectors (if needed)
- models/: user schema (optional)
- routes/: endpoint definitions (/login, /logout, /validate)
- services/: core business logic (hashing, token generation, validation)


## 🚀 Run Locally
# Clone and enter
cd roleService/updateRole

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run
python main.py

## 🐳 Docker
docker-compose up --build

## 🔄 CI/CD
Uses GitHub Actions for automatic testing and deployment to AWS EC2.
Test cases are run before container build.
Deployment only occurs if tests pass.

## 🧪 Testing
pytest test/

## 🔐 Security Notes
Passwords are hashed using werkzeug.security.
Sensitive data never exposed via API.
All routes protected via JWT token.
.env files excluded via .gitignore.

## 🧠 Maintainers
Andy Chiquin - Developer 