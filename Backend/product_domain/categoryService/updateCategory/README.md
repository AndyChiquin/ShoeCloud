# 🗂️ CategoryService - Product Category Microservice

This microservice manages **product categories**, allowing the platform to update category entries. It is part of the `product_domain` and helps organize products logically across the system.

---

## 🧩 Directory Structure

```bash
categoryService/
├── updateCategory/       # Adds a new category to the DB
│   ├── src/
│   │   ├── __tests__/       # Unit tests
│   │   ├── config/          # DB config
│   │   ├── controllers/     # Request logic
│   │   ├── models/          # Category schema/model
│   │   ├── routes/          # POST /api/category
│   │   ├── services/        # Core logic
│   │   ├── app.js
│   │   └── app-export.js
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
│   └── .env


```
## ⚙️ Tech Stack

| Component  | Technology          |
| ---------- | ------------------- |
| Language   | JavaScript (ES6+)   |
| Runtime    | Node.js 18+         |
| Framework  | Express.js          |
| Database   | MongoDB / DynamoDB  |
| Container  | Docker              |
| Deployment | AWS EC2             |
| Gateway    | NGINX               |
| Auth       | JWT (if restricted) |

## 📡 API Endpoints
| Method | Route               | Description             | Service        |
| ------ | ------------------- | ----------------------- | -------------- |
| PUT    | `/api/category/:id` | Update category info    | updateCategory |


## 🚀 Run Locally
# Navigate to the subservice
cd categoryService/updateCategory
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