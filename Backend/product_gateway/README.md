# 🚪 Product Gateway – NGINX Reverse Proxy for Product Domain

This NGINX gateway handles all incoming requests related to the **product domain** of the ShoeCloud platform, including products, inventory, categories, images, search, and pricing via WebSocket.

It serves as a single entry point (HTTP + WS) for microservices deployed across multiple EC2 IPs and ports.

---

## 📁 Directory Structure

```bash
Backend/product_gateway/
├── Dockerfile           # Custom NGINX image
├── docker-compose.yml   # Compose file to run the container
└── nginx.conf           # Routing rules for all product services

```
## 🔧 Servicios y rutas configuradas
| Servicio         | Ruta base                  | Métodos                           | Puerto(s)  | Tipo      |
| ---------------- | -------------------------- | --------------------------------- | ---------- | --------- |
| catalogService   | `/api/products/`           | POST, GET                         | 3000, 3001 | REST      |
| catalogService   | `/api/products/<id>`       | GET, PUT, DELETE                  | 3001–3003  | REST      |
| inventoryService | `/api/inventory`           | POST, GET                         | 3004, 3005 | REST      |
| inventoryService | `/api/inventory/<id>`      | GET, PUT, DELETE                  | 3005–3007  | REST      |
| categoryService  | `/api/category`            | POST, GET                         | 3008, 3009 | REST      |
| categoryService  | `/api/category/<id>`       | PUT, DELETE                       | 3010, 3011 | REST      |
| imageService     | `/api/images`              | GET                               | 3013       | REST      |
| imageService     | `/api/images/`             | POST                              | 3012       | REST      |
| imageService     | `/api/images/<product_id>` | GET, PUT, DELETE                  | 3013–3015  | REST      |
| searchService    | `/search`                  | GET                               | 3016       | REST      |
| searchService    | `/index`                   | POST                              | 3017       | REST      |
| pricingService   | `/ws/price/<action>`       | WS (CREATE, READ, UPDATE, DELETE) | 3018–3021  | WebSocket |

## 🐳 Run Gateway with Docker
cd Backend/product_gateway
docker-compose up --build

## 🛠 Dockerfile Example
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

## 🔐 CORS & OPTIONS Handling
- add_header 'Access-Control-Allow-Origin' "$http_origin" always;
- add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
- add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization' always;
- add_header 'Access-Control-Allow-Credentials' 'true' always;

## 📦 Product Gateway Modules
- 📦 catalogService – Product CRUD
- 📊 inventoryService – Inventory management
- 🗂 categoryService – Product categories
- 🖼 imageService – Product images
- 🔍 searchService – Search and indexing
- 💰 pricingService – WebSocket-based pricing

## 👨‍💻 Maintainers
Andy ChiquiN - Developer

