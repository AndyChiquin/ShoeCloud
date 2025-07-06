# 🔍 searchService - Product Search & Indexing Microservice

The `searchService` provides indexing and search capabilities over product data. It is part of the `product_domain` and is implemented in Go using a clean modular structure.

---

## 🧩 Directory Structure

```bash
searchService/
├── indexProduct/
│   ├── app/
│   │   ├── config/        # Environment settings and configs
│   │   ├── controllers/   # HTTP request handlers
│   │   ├── routes/        # Route definitions
│   │   └── services/      # Business logic (indexing)
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── go.mod
│   ├── go.sum
│   ├── main.go            # Entry point
│   └── main_test.go       # Unit tests

├── searchProduct/         # Search endpoint by product name/text


```

## ⚙️ Tech Stack

| Component   | Technology            |
| ----------- | --------------------- |
| Language    | Go (Golang)           |
| Framework   | Gin Gonic             |
| Indexing DB | MongoDB (TextIndex)   |
| Container   | Docker                |
| Deployment  | AWS EC2               |
| API Gateway | NGINX                 |
| Testing     | `testing` + `testify` |



## 📡 API Endpoints
| Method | Route            | Description                        | Microservice  |
| ------ | ---------------- | ---------------------------------- | ------------- |
| POST   | `/index`         | Indexes product data in MongoDB    | indexProduct  |
| GET    | `/search?q=term` | Searches for product by text match | searchProduct |



## 🚀 Run Locally
# Go to desired microservice
cd searchService/

# Run with Go
go run main.go


## 🔄 CI/CD
GitHub Actions with Go test runner
Docker image pushed if build & test succeed
Auto deploy to EC2 via SSH

## 🧪 Testing
go test ./...

## 🛡️ Security
Environment configuration through .env files

## 🧠 Maintainers
Andy Chiquin - Developer 