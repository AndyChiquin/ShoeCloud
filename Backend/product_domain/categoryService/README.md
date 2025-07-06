# 🗂️ CategoryService - Product Category Microservice

This microservice manages **product categories**, allowing the platform to create, read, update, and delete category entries. It is part of the `product_domain` and helps organize products logically across the system.

---

## 🧩 Directory Structure

```bash
categoryService/
├── createCategory/       # Adds a new category to the DB
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

├── readCategory/         # Fetches category info
├── updateCategory/       # Modifies category name or metadata
├── deleteCategory/       # Removes a category

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
| POST   | `/api/category`     | Create new category     | createCategory |
| GET    | `/api/category/:id` | Read category by ID     | readCategory   |
| PUT    | `/api/category/:id` | Update category info    | updateCategory |
| DELETE | `/api/category/:id` | Delete category from DB | deleteCategory |


## 🚀 Run Locally
# Navigate to the subservice
cd categoryService
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