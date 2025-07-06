# 🖼️ ImageService - Product Image Microservice

This microservice is responsible for managing **product images**, including deletion. It ensures each product can have associated visual media stored and accessed efficiently. It forms part of the `product_domain`.

---

## 🧩 Directory Structure

```bash
imageService/
├── deleteImage/
│   ├── src/
│   │   ├── __tests__/       # Unit tests
│   │   ├── config/          # DB config, image storage config
│   │   ├── controllers/     # Logic for image upload
│   │   ├── models/          # Image schema
│   │   ├── routes/          # POST /api/images
│   │   ├── services/        # Upload service (e.g., multer)
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
| Method | Route             | Description                | Microservice |
| ------ | ----------------- | -------------------------- | ------------ |
| DELETE | `/api/images/:id` | Delete image file and data | deleteImage  |



## 🚀 Run Locally
# Navigate to the subservice
cd imageService/deleteImage

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