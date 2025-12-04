# 🏡 Aura Home - Plataforma E-commerce MERN

## 📝 Descripción del Proyecto

Aura Home es una plataforma de comercio electrónico moderna y limpia, construida con la pila MERN (MongoDB, Express, React, Node.js). El objetivo principal es ofrecer una solución escalable para la gestión de productos, autenticación de usuarios/administradores, un flujo de carrito robusto y una integración completa con **Mercado Pago** para la gestión de pagos.

## ⚙️ Stack Tecnológico

- **Backend (API):** Node.js, Express
- **Base de Datos:** MongoDB (a través de Mongoose)
- **Autenticación:** JSON Web Tokens (JWT)
- **Validación de Esquemas:** Joí
- **Almacenamiento de Imágenes:** Cloudinary
- **Pasarela de Pagos:** Mercado Pago (SDK/API Gateway)
- **Frontend (Cliente):** React (con Vite)
- **Manejo de Estado:** Context API
- **Estilos:** Tailwind CSS
- **Librerías de UI:** react-router-dom, axios, react-toastify (para notificaciones)

## 📂 Estructura del Proyecto

El proyecto está dividido en dos directorios principales: `server` y `client`.

### server

```
server/
├── config/             # Configuración de DB, Cloudinary y Variables de Entorno
│   ├── db.js
│   ├── cloudinary.js
│   └── .env
├── models/             # Esquemas de Mongoose (User, Product, Order)
├── routes/             # Definición de las rutas de la API
├── controllers/        # Lógica de negocio de las rutas
├── middleware/         # Lógica de Auth/Roles, Manejo de Errores
├── validators/         # Esquemas de Validación con Joí
└── server.js           # Punto de entrada del servidor Express
```

### client

```
client/
├── src/
│   ├── api/            # Servicios de la API (auth.service.js, product.service.js, etc.)
│   ├── components/     # Componentes reutilizables (common/, products/, admin/)
│   ├── contexts/       # Context API (AuthContext, CartContext, FilterContext)
│   ├── hooks/          # Hooks personalizados (useAuth, useCart)
│   ├── pages/          # Vistas principales de la aplicación (Login, Home, Dashboard, Checkout)
│   └── styles/         # Archivos CSS y configuración de Tailwind
└── package.json
```

## 🚀 Instrucciones de Instalación y Ejecución

#### 1. Requisitos Previos

- Node.js (versión 18+)
- MongoDB (local o remoto)
- Cuenta de Cloudinary
- Credenciales de Mercado Pago

#### 2. Configuración del Backend

    1. Navega al directorio del backend: `cd server`
    2. Instala las dependencias: `npm install`
    3. Crea un archivo `.env` basado en el `.env.example` y rellena tus credenciales:

    ```
    PORT=4000
    MONGODB_URI=...
    JWT_SECRET=...
    CLOUDINARY_CLOUD_NAME=...
    CLOUDINARY_API_KEY=...
    CLOUDINARY_API_SECRET=...
    MP_ACCESS_TOKEN=...
    MP_WEBHOOK_URL=... (URL pública para notificaciones)
    ```

    4. Inicia el servidor en modo desarrollo: `npm run dev`

### 3. Configuración del Frontend

    1. Navega al directorio del frontend: `cd ../client`
    2. Instala las dependencias: `npm install`
    3. Crea un archivo `.env` y define las variables de entorno para el cliente:

    ```
    VITE_API_URL=http://localhost:4000/api
    VITE_MP_PUBLIC_KEY=...
    ```

    4. Inicia el cliente en modo desarrollo: `npm run dev`

El frontend estará disponible en `http://localhost:5173` (o el puerto que asigne Vite).
