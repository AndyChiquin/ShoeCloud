# ⚙️ GitHub Actions Workflows

This folder contains all the **CI/CD workflows** for the **ShoeCloud** project.  
Each workflow is defined as a `.yml` file and is executed automatically when changes are pushed to specific microservices or folders.

These workflows handle tasks such as:

- ✅ Building Docker images
- 🚀 Deploying microservices to AWS EC2
- 🔁 Updating services based on branch triggers (`test`, `main`, `test2`)
- 🧪 Running unit tests before deployment
- 🔐 Managing sessions, logins, and gateway integration

---

## 🗂️ Workflow Categories

| Filename                        | Purpose                                      |
|---------------------------------|----------------------------------------------|
| `deploy-create-*.yml`          | Deploy a microservice for **creation** (POST) |
| `deploy-delete-*.yml`          | Deploy a microservice for **deletion** (DELETE) |
| `deploy-gateway*.yml`          | Deploy the **API Gateway / NGINX**           |
| `deploy-index-*.yml`           | Deploy services using **WebSocket / Indexing** |
| `deploy-login-service.yml`     | Deploy the **Login/Authentication** service  |
| `deploy-logout-service.yml`    | Deploy the **Logout** or token invalidation  |
| `deploy-close-session.yml`     | Handle session termination (Redis cleanup)   |
| `deploy-create-audit.yml`      | Deploy the **Audit** microservice            |
| `etc`                          | Deploy and others microservices              |


---

## 🛠️ How It Works

Each workflow is triggered on:

```yaml
on:
  push:
    branches:
      - test
    paths:
      - 'Backend/<domain>/<microservice>/**'


---
## ✅ Checkout Repository

Pulls the latest version of the code from the repository using:

- name: Checkout code
  uses: actions/checkout@v3

## ⚙️ Set up Environment
- name: Set up Node.js
  uses: actions/setup-node@v3

- name: Set up Python
  uses: actions/setup-python@v4

- name: Set up Go
  uses: actions/setup-go@v4


## 📦 Install Dependencies
npm install        # Node.js
pip install -r requirements.txt   # Python
go mod tidy        # Go

## 🧪 Run Unit Tests
npm test         # Node.js
pytest           # Python
go test ./...    # Go

## 🐳 Build Docker Image
docker build -t <your-username>/<service-name>:<tag> .

##  📤 Push to Docker Hub
docker push <your-username>/<service-name>:<tag>

## 📡 Deploy via SSH to EC2
- name: Deploy to EC2
  uses: appleboy/ssh-action@master
  with:
    host: ${{ secrets.EC2_IP }}
    username: ubuntu
    key: ${{ secrets.EC2_SSH_KEY }}
    script: |
      docker pull <your-image>
      docker stop <container> || true
      docker rm <container> || true
      docker run -d --restart=always --name <container> -p <port>:<port> --env-file .env <your-image>

## Required Secrets
Make sure to configure the following secrets in your GitHub repository:

---
## 📌 Notes

- Each microservice has its **own isolated workflow file**.
- Workflows are triggered **only when relevant files are changed**.
- Tests are run **before Docker image creation and deployment**.
- All workflows are visible in the **GitHub Actions tab** with status logs.

---

## 👨‍💻 Maintainers

This workflow system was configured and is maintained by:

- **Andy Chiquin** – Developer  
For questions or contributions, please create a pull request or open an issue in the repository.