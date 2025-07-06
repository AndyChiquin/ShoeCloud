# 🌐 User Domain Gateway – NGINX Reverse Proxy

This directory contains the **NGINX gateway configuration** for all microservices under the `user_domain` of the **ShoeCloud** platform.

The gateway is responsible for routing HTTP requests to the correct microservices based on method and URL path, exposing a clean and unified API interface.

---

## 📁 Folder Structure

```bash
Backend/gateway/
├── Dockerfile           # Builds the custom NGINX image
├── docker-compose.yml   # Runs the gateway container
└── nginx.conf           # Reverse proxy rules per service
```

## ⚙️ What It Does
This gateway performs the following:

- Routes all user-related API requests from frontend or clients
- Balances multiple services behind distinct ports
- Handles POST, GET, PUT, DELETE methods separately
- Adds CORS headers manually for preflight (OPTIONS) requests
- Centralizes all user_domain traffic under port 80

## 🧱 Microservices Behind This Gateway
| Service Name        | Route Prefix           | Port | Methods Covered |
| ------------------- | ---------------------- | ---- | --------------- |
| create-user-service | `/users`               | 8000 | `POST`          |
| read-user-service   | `/users`, `/email`     | 8001 | `GET`           |
| delete-user-service | `/users/<id>`          | 8002 | `DELETE`        |
| update-user-service | `/users/<id>`          | 8003 | `PUT`, `/role`  |
| login-service       | `/auth/login`          | 8004 | `POST`          |
| validate-token      | `/auth/validate-token` | 8005 | `POST`          |
| logout-service      | `/auth/logout`         | 8006 | `POST`          |
| create-role         | `/roles`               | 8007 | `POST`          |
| read-roles          | `/roles`, `/exists`    | 8008 | `GET`           |
| update-role         | `/roles/<id>`          | 8009 | `PUT`           |
| delete-role         | `/roles/<id>`          | 8010 | `DELETE`        |
| create-session      | `/session/`            | 8011 | `POST`          |
| read-session        | `/session/user/<id>`   | 8012 | `GET`           |
| close-session       | `/session/<id>/end`    | 8013 | `PUT`           |
| log-event           | `/log`                 | 8014 | `POST`          |
| audit-logs          | `/logs`, `/audit/logs` | 8015 | `GET`           |

## 🐳 How to Run the Gateway
You can run the NGINX gateway using Docker:
cd Backend/gateway
docker-compose up --build

## 🛠️ Dockerfile Summary
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

## 🔐 CORS & OPTIONS Handling
- add_header 'Access-Control-Allow-Origin' "$http_origin" always;
- add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
- add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization' always;
- add_header 'Access-Control-Allow-Credentials' 'true' always;

## 📌 Notes
- All services must be accessible by private IP or public IP inside EC2
- You can use Docker Compose to map ports if running all locally
- Replace hardcoded IPs with internal DNS or Docker network aliases in production

## 👨‍💻 Maintainers
Andy ChiquiN - Developer