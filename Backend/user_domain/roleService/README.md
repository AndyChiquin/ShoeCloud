# 🛡️ roleService - User Role Management Microservice

This microservice manages **user roles and permissions**, allowing the platform to define and control access levels dynamically. It supports **CRUD operations** for roles, ensuring that authorization rules can be updated in a scalable and secure manner.

---

## 🧩 Structure

```bash
roleService/
├── createRole/     # Adds a new role (e.g., admin, user, guest)
├── readRole/       # Fetches role details or list of roles
├── updateRole/     # Updates existing role information
└── deleteRole/     # Removes a role from the system
```

```bash
app/
├── config/         # Constants, env variables
├── db/             # DB connection setup (MySQL/PostgreSQL)
├── models/         # Role model/schema
├── routes/         # Flask endpoints (e.g., /roles)
├── services/       # Business logic: validation, role creation
├── __init__.py     # App initialization
test/               # Unit tests
.env.test           # Environment test vars
Dockerfile          # Docker config for container
docker-compose.yml  # Local service orchestration
main.py             # App entry point
requirements.txt    # Python dependencies
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
| POST   | `/roles`      | Create a new role       |
| GET    | `/roles`      | List all roles          |
| GET    | `/roles/<id>` | Get role by ID          |
| PUT    | `/roles/<id>` | Update role information |
| DELETE | `/roles/<id>` | Delete a role           |



# Each folder contains:

- app/ directory with:
- config/: environment settings, constants
- db/: DB connectors (if needed)
- models/: user schema (optional)
- routes/: endpoint definitions (/login, /logout, /validate)
- services/: core business logic (hashing, token generation, validation)


## 🚀 Run Locally
# Clone and enter
cd roleService/createRole

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