# 📦 InventoryService - Product Stock Management Microservice

The `inventoryService` is responsible for managing product **stock levels**, ensuring accurate tracking of availability, updating quantities, and removing inventory entries when needed. It forms a core part of the `product_domain`.

---

## 🧩 Directory Structure

```bash
inventoryService/
├── createInventory/
│   ├── src/
│   │   ├── __tests__/       # Unit tests
│   │   ├── config/          # DB and env configuration
│   │   ├── controllers/     # Core logic for stock creation
│   │   ├── models/          # Inventory schema/model
│   │   ├── routes/          # POST /api/inventory
│   │   ├── app.js
│   │   └── app-export.js
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
│   └── .env

├── readInventory/       # GET endpoint for inventory info
├── updateInventory/     # PUT endpoint for stock updates
└── deleteInventory/     # DELETE endpoint for stock removal
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
| Method | Route                | Description            | Microservice    |
| ------ | -------------------- | ---------------------- | --------------- |
| POST   | `/api/inventory`     | Create new stock entry | createInventory |
| GET    | `/api/inventory/:id` | Get inventory details  | readInventory   |
| PUT    | `/api/inventory/:id` | Update stock level     | updateInventory |
| DELETE | `/api/inventory/:id` | Delete inventory entry | deleteInventory |

## 🚀 Run Locally
# Navigate to the subservice
cd inventoryService/

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

## 🗃️ Database Model
inventory table contains:

id
product_id
quantity
created_at
updated_at

## 🧪 Testing
src/__tests__/

## 🛡️ Security
JWT token validation (if enabled for admin-only routes)
Environment configuration through .env files

## 🧠 Maintainers
Andy Chiquin - Developer 