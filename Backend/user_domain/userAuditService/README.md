# 📋 userAuditService - Audit Trail Microservice

This microservice is responsible for **tracking user-related events** such as creations, updates, and deletions. It ensures traceability and transparency within the `user_domain`. This service uses the **SOAP** protocol for creating and retrieving audit logs, allowing integration with legacy or external systems that require XML-based communication.

---

## 🧩 Structure

```bash
userAuditService/
├── createAudit/    # SOAP-based service to create audit logs
│   ├── app/        # Core app logic and service layers
│   ├── test/       # Unit tests for audit creation
│   ├── .env.test   # Environment variables for testing
│   ├── Dockerfile  # Docker build config
│   ├── docker-compose.yml
│   ├── requirements.txt
│   └── soap_server.py # SOAP server entry point
│
├── readAudit/      # (Optional) Will expose audit read operations
```

```bash
app/
├── config/         # Environment configuration and constants
├── db/             # DB connection setup (e.g., SQLAlchemy or PyMySQL)
├── models/         # User model definitions
├── routes/         # Flask route definitions (e.g., /create, /read)
├── services/       # Core business logic (CRUD ops, validations)
├── __init__.py     # App initialization
test/               # Unit and integration tests
.env.test           # Environment test variables
Dockerfile          # Docker container definition
docker-compose.yml  # Local service orchestration
soap_server.py             # Application entry point
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

## 🧼 SOAP Endpoint (WSDL)
The microservice exposes a SOAP server with operations like:
createAuditLog(user_id, action, timestamp, metadata)
WSDL available at /soap?wsdl


# Each folder contains:

- app/ directory with:
- config/: environment settings, constants
- db/: DB connectors (if needed)
- models/: user schema (optional)
- routes/: endpoint definitions (/login, /logout, /validate)
- services/: core business logic (hashing, token generation, validation)


## 🚀 Run Locally
# Clone and enter
cd userAuditService/createAudit

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
Only authenticated services can send SOAP requests (via IP whitelist or SOAP headers)
All audit logs are immutable once written

## 🧠 Maintainers
Andy Chiquin - Developer 
