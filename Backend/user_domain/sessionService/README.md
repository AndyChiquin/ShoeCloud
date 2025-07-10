# 🕒 sessionService - Session Management Microservice

This microservice manages the **user active sessions**, allowing their creation, query and closing. It is part of the `user_domain` domain and uses Redis or lightweight bases for temporary storage.

---

## 🧩 Project Structure

```bash
sessionService/
├── closeSession/
│   ├── app/
│   │   ├── config/      
│   │   ├── db/           
│   │   ├── models/       
│   │   ├── routes/      
│   │   └── services/    
│   ├── test/             
│   ├── .env.test        
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── main.py
│   └── requirements.txt

├── createSession/
├── readSession/│

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
| Method | Route           | Description                  |
| ------ | --------------- | ---------------------------- |
| POST   | `/session`      | Creates a new session        |
| GET    | `/session/<id>` | Reads session data           |
| DELETE | `/session/<id>` | Closes the specified session |

# Each folder contains:

- app/ directory with:
- config/: environment settings, constants
- db/: DB connectors (if needed)
- models/: user schema (optional)
- routes/: endpoint definitions (/login, /logout, /validate)
- services/: core business logic (hashing, token generation, validation)


## 🚀 Run Locally
# Clone and enter
cd sessionService/

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