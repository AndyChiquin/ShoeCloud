# 🧾 userAuditService - User Audit Logging Microservice

This microservice is responsible for **logging and retrieving audit records** related to user actions. It helps track user activity for security, compliance, and monitoring purposes. It is implemented using Python (Flask) and uses SOAP for communication.

---

## 📁 Project Structure

```bash
userAuditService/
├── createAudit/
│   ├── app/
│   │   ├── config/       
│   │   ├── db/           
│   │   ├── models/       
│   │   ├── routes/       
│   │   └── services/     
│   ├── test/            
│   ├── .env.test        
│   ├── .gitignore
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── requirements.txt  
│   ├── soap_server.py   
│
├── readAudit/         


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
