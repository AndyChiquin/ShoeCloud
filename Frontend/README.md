# 🎨 Frontend – ShoeCloud (Vue.js + Quasar)

This folder contains the frontend application for **ShoeCloud**, built using the **Vue.js framework** with **Quasar CLI** for responsive UI components.

The app is responsible for interacting with all backend microservices via a centralized **Load Balancer**, rendering views for authentication, users, products, and order management.

---

## 🖼️ Features

- 🔐 Login & Register pages connected to Auth backend
- 🧭 Navigation bar with role-based view rendering
- 📦 Product listings, pricing, and inventory
- 🧑 User profile and role views
- 🧾 Order and reservation management (view, create, delete)
- 📊 Dashboard with layout switching
- 💻 Responsive UI with Quasar components

---

## 🗂️ Folder Structure

```bash
Frontend/
├── .quasar/                  # Quasar build config
├── .vscode/                  # VSCode settings
├── node_modules/             # Dependencies
├── public/                   # Static files
├── src/
│   ├── assets/               # Images and icons
│   ├── boot/                 # Axios / plugins boot files
│   ├── components/           # Reusable components (e.g., NavBar)
│   ├── css/                  # Global styles
│   ├── layouts/              # Base layouts (e.g., MainLayout.vue)
│   ├── pages/                # Page-level views (Login, Register, Products, etc.)
│   ├── router/               # Vue Router config
│   ├── stores/               # Pinia/Vuex stores for state management
│   ├── App.vue               # Root component
│   └── main.js               # App entry point
├── index.html                # Main HTML shell
├── quasar.config.js          # Quasar CLI config
├── package.json              # NPM dependencies
└── README.md                 # You are here!

```

##  🌐 API Connection
All API requests go through the AWS Load Balancer, which routes them to the correct backend microservice based on the path.


## 🧪 Available Views
| Page        | Path         | Purpose                            |
| ----------- | ------------ | ---------------------------------- |
| `Login`     | `/login`     | Login form + token generation      |
| `Register`  | `/register`  | User registration + role selection |
| `Dashboard` | `/dashboard` | Admin/user dashboard view          |
| `Users`     | `/users`     | View/edit user profiles            |
| `Products`  | `/products`  | List and manage products           |
| `Orders`    | `/orders`    | Create, view, cancel reservations  |

# 🛠️ Development
cd Frontend
npm install

quasar dev

quasar build

## ☁️ Deployment (EC2)
- SSH into your EC2:
- Clone the repo and enter the folder:
- Install Node.js and Quasar CLI:
- Build
- Serve with NGINX or serve:

## 🔐 Auth & State
JWT is stored in localStorage or cookies

Protected routes check token on load

State is managed with Pinia (or Vuex, if configured)

Axios interceptors automatically attach tokens

## 🧩 Technologies & Platforms

- 🧱 Vue 3 + Quasar Framework
- 🎨 Quasar CLI for UI components and layout
- 🚀 Vue Router for navigation
- 💾 Pinia (or Vuex) for state management
- 🧪 Axios for API requests
- 🧭 JWT Authentication
- 🌍 Supports Web, Mobile (Android/iOS), and Desktop (Electron)


## 🔄 Multi-Platform Support
Thanks to Quasar, this frontend project can be deployed as:

| Platform   | Target                       | Tools Used          |
| ---------- | ---------------------------- | ------------------- |
| 🌐 Web     | SPA / PWA                    | Vue + Quasar CLI    |
| 📱 Mobile  | Android / iOS (native shell) | Capacitor / Cordova |
| 💻 Desktop | Windows, Linux, macOS        | Electron            |

--- 

To build for each platform
## SPA for web
quasar build

## PWA
quasar build -m pwa

## Android/iOS
quasar build -m capacitor -T android
quasar build -m capacitor -T ios

## Desktop
quasar build -m electron


# 👨‍💻 Maintainers
 Andy Chiquin - Developer 