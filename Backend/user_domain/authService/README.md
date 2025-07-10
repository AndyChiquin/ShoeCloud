# 🔐 authService - User Authentication Microservice

This microservice handles **user authentication** for the platform, including login, logout, and JWT validation. It belongs to the `user_domain` and ensures secure access using token-based authentication.

---

## 🧩 Directory Structure

```bash
authService/
├── login/
│   ├── app/
│   │   ├── config/       # Environment configs and constants
│   │   ├── models/       # User data models
│   │   ├── routes/       # HTTP endpoints
│   │   ├── services/     # Core logic for auth and token generation
│   │   └── utils/        # Helper functions (e.g., hashing)
│   ├── test/             # Unit and integration tests
│   ├── .env.test         # Test environment variables
│   ├── .gitignore
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── main.py           # Entry point
│   └── requirements.txt  # Python dependencies
├── logout/               # Logic for logout handling
└── validateToken/        # Logic for JWT validation

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
| Method | Route             | Description                      |
| ------ | ----------------- | -------------------------------- |
| POST   | `/login`          | User authentication, returns JWT |
| POST   | `/logout`         | Handles client logout            |
| GET    | `/validate-token` | Verifies token validity          |

# Each folder contains:

- app/ directory with:
- config/: environment settings, constants
- db/: DB connectors (if needed)
- models/: user schema (optional)
- routes/: endpoint definitions (/login, /logout, /validate)
- services/: core business logic (hashing, token generation, validation)

## 🔐 JWT Token
Signed using HS256 algorithm.
Stored on client side (usually in localStorage or HttpOnly cookie).
Validated on every protected request.

## 🚀 Run Locally
# Clone and enter
cd authService/login

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

## 🧠 Maintainers
Andy Chiquin - Developer 
