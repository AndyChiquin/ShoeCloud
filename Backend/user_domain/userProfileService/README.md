# 👤 userProfileService - User Profile Management Microservice

This microservice is responsible for managing **user profiles**, including user **creation**, **reading**, **updating**, and **deletion**. It is a key part of the `user_domain`, ensuring consistent and secure user data handling.

---

## 🧩 Structure

```bash
userProfileService/
├── createUser/     # Handles new user registrations
├── readUser/       # Retrieves user profile information
├── updateUser/     # Updates user profile data
└── deleteUser/     # Deletes user profiles
```
---

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
main.py             # Application entry point
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
| Method | Route         | Description                     |
| ------ | ------------- | ------------------------------- |
| POST   | `/users`      | Register a new user             |
| GET    | `/users/<id>` | Fetch user profile by ID        |
| PUT    | `/users/<id>` | Update user profile information |
| DELETE | `/users/<id>` | Delete user account             |


# Each folder contains:

- app/ directory with:
- config/: environment settings, constants
- db/: DB connectors (if needed)
- models/: user schema (optional)
- routes/: endpoint definitions (/login, /logout, /validate)
- services/: core business logic (hashing, token generation, validation)



## 🚀 Run Locally
# Clone and enter
cd userProfileService/createUser

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
