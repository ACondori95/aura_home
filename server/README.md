# 🏠 AURA HOME - Backend API

RESTful API for Aura Home E-commerce platform built with Express.js and MongoDB.

## 📁 Project Structure

```
backend/
├── config/                   # Configuration files
│   ├── db.js                 # MongoDB connection
│   ├── env.js                # Environment variables
│   └── cloudinary.js         # Cloudinary setup
│
├── controllers/              # Request handlers
│   ├── authController.js     # Authentication logic
│   ├── productController.js  # Product CRUD
│   ├── categoryController.js # Category CRUD
│   ├── orderController.js    # Order management
│   └── paymentController.js  # Payment processing
│
├── middleware/               # Express middleware
│   ├── auth.js               # JWT verification
│   ├── adminCheck.js         # Admin role verification
│   ├── errorHandler.js       # Global error handler
│   └── upload.js             # Multer file upload
│
├── models/                   # Mongoose schemas
│   ├── User.js               # User model
│   ├── Product.js            # Product model
│   ├── Category.js           # Category model
│   └── Order.js              # Order model
│
├── routes/                   # API routes
│   ├── authRoutes.js         # /api/auth
│   ├── productRoutes.js      # /api/products
│   ├── categoryRoutes.js     # /api/categories
│   ├── orderRoutes.js        # /api/orders
│   └── paymentRoutes.js      # /api/payments
│
├── validators/               # Joi validation schemas
│   ├── authSchemas.js        # Auth validation
│   ├── productSchemas.js     # Product validation
│   ├── categorySchemas.js    # Category validation
│   └── orderSchemas.js       # Order validation
│
├── utils/                    # Utility functions
│   ├── jwt.js                # JWT generation/verification
│   └── helpers.js            # Helper functions
│
├── .env                      # Environment variables (gitignored)
├── .env.example              # Environment template
├── .gitignore                # Git ignore rules
├── package.json              # Dependencies
└── server.js                 # Application entry point
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Start development server
npm run dev

# Start production server
npm start
```

## 🔌 API Endpoints

### Authentication (`/api/auth`)

- `POST /register` - Register new user
- `POST /login` - User login
- `GET /profile` - Get user profile (Auth)
- `PUT /profile` - Update profile (Auth)

### Products (`/api/products`)

- `GET /` - List all products (Public)
- `GET /:id` - Get product details (Public)
- `POST /` - Create product (Admin)
- `PUT /:id` - Update product (Admin)
- `DELETE /:id` - Delete product (Admin)
- `POST /:id/images` - Upload images (Admin)

### Categories (`/api/categories`)

- `GET /` - List all categories (Public)
- `GET /:id` - Get category details (Public)
- `POST /` - Create category (Admin)
- `PUT /:id` - Update category (Admin)
- `DELETE /:id` - Delete category (Admin)

### Orders (`/api/orders`)

- `GET /` - List orders (User: own / Admin: all)
- `GET /:id` - Get order details (User/Admin)
- `POST /` - Create order (Auth)
- `PUT /:id/status` - Update order status (Admin)

### Payments (`/api/payments`)

- `POST /preference` - Create Mercado Pago preference (Auth)
- `POST /webhook` - Mercado Pago webhook
- `GET /status/:id` - Check payment status (Auth)

## 🔐 Authentication

Uses JWT (JSON Web Tokens) for authentication.

**Headers:**

```
Authorization: Bearer <token>
```

**Token Payload:**

```json
{
  "id": "user_id",
  "role": "user|admin",
  "iat": 1234567890,
  "exp": 1234567890
}
```

## 📊 Database Models

### User

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['user', 'admin']),
  phone: String,
  addresses: Array,
  favorites: Array (Product refs),
  createdAt: Date,
  updatedAt: Date
}
```

### Product

```javascript
{
  name: String,
  description: String,
  category: ObjectId (Category ref),
  price: Number,
  salePrice: Number,
  sku: String (unique),
  stock: Number,
  images: Array (URLs),
  colors: Array,
  materials: Array,
  status: String (enum: ['active', 'inactive']),
  featured: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Category

```javascript
{
  name: String (unique),
  description: String,
  image: String (URL),
  status: String (enum: ['active', 'inactive']),
  createdAt: Date,
  updatedAt: Date
}
```

### Order

```javascript
{
  orderNumber: String (unique),
  user: ObjectId (User ref),
  items: Array,
  shippingAddress: Object,
  paymentInfo: Object,
  subtotal: Number,
  shippingCost: Number,
  taxes: Number,
  total: Number,
  status: String (enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  createdAt: Date,
  updatedAt: Date
}
```

## 🛡️ Security

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens with configurable expiration
- CORS enabled
- Input validation with Joi
- MongoDB injection prevention
- Rate limiting (future)

## 🌍 Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aura-home
NODE_ENV=development
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Mercado Pago
MERCADOPAGO_ACCESS_TOKEN=your_access_token
MERCADOPAGO_PUBLIC_KEY=your_public_key
```

## 📝 Code Standards

- Use ES6+ features
- Async/await for asynchronous operations
- Proper error handling with try/catch
- Descriptive variable names
- Comments for complex logic
- Modular code structure

## 🧪 Error Handling

All errors follow this format:

```json
{
  "error": "Error message",
  "details": "Additional info (dev mode only)"
}
```

Status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## 📦 Dependencies

### Production

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `joi` - Input validation
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `multer` - File upload
- `cloudinary` - Image hosting
- `mercadopago` - Payment processing

### Development

- `nodemon` - Auto-restart server
