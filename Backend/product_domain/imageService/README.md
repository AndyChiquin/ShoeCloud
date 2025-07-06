# 🖼️ ImageService - Product Image Microservice

This microservice is responsible for managing **product images**, including upload, retrieval, update, and deletion. It ensures each product can have associated visual media stored and accessed efficiently. It forms part of the `product_domain`.

---

## 🧩 Directory Structure

```bash
imageService/
├── createImage/
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

├── readImage/           # Retrieves image info or files
├── updateImage/         # Updates image metadata
├── deleteImage/         # Deletes image

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
| POST   | `/api/images`     | Upload product image       | createImage  |
| GET    | `/api/images/:id` | Get image metadata/file    | readImage    |
| PUT    | `/api/images/:id` | Update image info          | updateImage  |
| DELETE | `/api/images/:id` | Delete image file and data | deleteImage  |



## 🚀 Run Locally
# Navigate to the subservice
cd imageService/

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