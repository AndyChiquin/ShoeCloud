# 💲 pricingService - Product Pricing Microservice

The `pricingService` manages the creation, reading, updating, and deletion of **product pricing**. It supports both REST and WebSocket interfaces, making it flexible for real-time and traditional client-server communication.

Este microservicio pertenece al dominio `product_domain` y se encuentra desarrollado en Ruby.

---

## 🧩 Directory Structure

```bash
pricingService/
├── createPrice/
│   ├── config/            # DB configuration, environment setup
│   ├── controllers/       # Core logic for price creation
│   ├── models/            # Price model (ActiveRecord)
│   ├── routes/            # REST endpoints (POST /price)
│   ├── ws/                # WebSocket logic
│   ├── app.rb             # Main Sinatra app
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── Gemfile
│   └── .env

├── readPrice/             # GET /price and WebSocket integration
├── updatePrice/           # PUT /price/:id
└── deletePrice/           # DELETE /price/:id
```

## ⚙️ Tech Stack

| Component  | Technology       |
| ---------- | ---------------- |
| Language   | Ruby             |
| Framework  | Sinatra          |
| ORM        | ActiveRecord     |
| Realtime   | WebSocket (Faye) |
| Database   | PostgreSQL       |
| Container  | Docker           |
| Deployment | AWS EC2          |
| Gateway    | NGINX            |


## 📡 API Endpoints
| Method | Route        | Description            | Microservice     |
| ------ | ------------ | ---------------------- | ---------------- |
| POST   | `/price`     | Create new price entry | createPrice      |
| GET    | `/price/:id` | Get price by ID        | readPrice        |
| PUT    | `/price/:id` | Update existing price  | updatePrice      |
| DELETE | `/price/:id` | Delete price entry     | deletePrice      |
| WS     | `/ws/price`  | Realtime price updates | readPrice/create |


## 🚀 Run Locally
# Navigate to the subservice
cd pricingService

# Install dependencies
bundle install

# Start the service
bundle install
## 🐳 Docker Usage
docker-compose up --build

## 🔄 CI/CD
✅ GitHub Actions per subservice
✅ Builds Docker images only if tests pass
✅ Deploys automatically to AWS EC2

## 🧪 Testing
rspec


## 🛡️ Security
Environment configuration through .env files

## 🧠 Maintainers
Andy Chiquin - Developer 