# 📦 CatalogService - Product Management Microservice

This microservice handles the **full lifecycle of product management**, including reading of products in the platform catalog. It is part of the `product_domain` and is designed to work in a modular and scalable environment.

---

## 🧩 Directory Structure

```bash
catalogService/
├── readProduct/     # Registers new products
│   ├── src/
│   │   ├── __tests__/       # Unit tests
│   │   ├── config/          # DB and server config
│   │   ├── controllers/     # Logic for request handling
│   │   ├── models/          # Product schema/model
│   │   ├── routes/          # POST /api/product
│   │   ├── services/        # Business logic
│   │   ├── app.js           # App entrypoint
│   │   └── app-export.js    # For testing
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
│   └── .env
│

```
## ⚙️ Tech Stack
| Component  | Technology         |
| ---------- | ------------------ |
| Language   | JavaScript (ES6+)  |
| Runtime    | Node.js 18+        |
| Framework  | Express.js         |
| Database   | MongoDB / DynamoDB |
| Container  | Docker             |
| Deployment | AWS EC2            |
| Gateway    | NGINX              |
| Auth       | JWT (if needed)    |

## 📡 API Endpoints
| Method | Route              | Description            | Service       |
| ------ | ------------------ | ---------------------- | ------------- |
| GET    | `/api/product/:id` | Read product by ID     | readProduct   |


## 🚀 Run Locally
# Navigate to the subservice
cd catalogService/readProduct

# Install dependencies
npm install

# Start the service
npm start

## 🐳 Docker Usage
docker-compose up --build

## 🔄 CI/CD
✅ GitHub Actions per subservice
✅ Runs unit tests (jest) before deployment
✅ Builds Docker images only if tests pass
✅ Deploys automatically to AWS EC2

## 🧪 Testing
src/__tests__/

## 🛡️ Security
JWT token validation (if enabled for admin-only routes)
Environment configuration through .env files

## 🧠 Maintainers
Andy Chiquin - Developer 