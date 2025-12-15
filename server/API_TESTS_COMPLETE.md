# 🧪 Complete API Testing Guide - AURA HOME

## Base URL

```
http://localhost:5000/api
```

## Authentication Endpoints

### 1. Register User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "phone": "+54 123 456 7890"
}
```

### 2. Login User (Get Token)

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}

# Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

### 3. Create Admin User

```bash
# Manually in MongoDB:
db.users.updateOne(
  { email: "test@example.com" },
  { $set: { role: "admin" } }
)
```

---

## Category Endpoints

### 1. Get All Categories (Public)

```bash
GET /api/categories
```

### 2. Create Category (Admin)

```bash
POST /api/categories
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Muebles",
  "description": "Muebles modernos para el hogar",
  "status": "active"
}
```

### 3. Get Category by ID

```bash
GET /api/categories/{categoryId}
```

### 4. Update Category (Admin)

```bash
PUT /api/categories/{categoryId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "description": "Nueva descripción"
}
```

### 5. Get Products by Category

```bash
GET /api/categories/{categoryId}/products?page=1&limit=12&sort=price_asc
```

---

## Product Endpoints

### 1. Get All Products (Public)

```bash
# Basic
GET /api/products

# With filters
GET /api/products?category={categoryId}&minPrice=100&maxPrice=1000&sort=price_asc&page=1&limit=12

# With search
GET /api/products?search=sillon&sort=newest
```

### 2. Get Product by ID (Public)

```bash
GET /api/products/{productId}
```

### 3. Create Product (Admin)

```bash
POST /api/products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Sillón Nórdico Lora",
  "description": "Hermoso sillón de diseño nórdico",
  "category": "{categoryId}",
  "price": 599.99,
  "salePrice": 499.99,
  "sku": "SOFA-001",
  "stock": 15,
  "colors": ["Gris", "Beige"],
  "materials": ["Tela", "Madera"],
  "featured": true,
  "status": "active"
}
```

### 4. Update Product (Admin)

```bash
PUT /api/products/{productId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "price": 549.99,
  "stock": 20
}
```

### 5. Delete Product (Admin)

```bash
DELETE /api/products/{productId}
Authorization: Bearer {token}
```

### 6. Upload Product Images (Admin)

```bash
POST /api/products/{productId}/images
Authorization: Bearer {token}
Content-Type: multipart/form-data

# Form data:
images: [file1.jpg, file2.jpg, file3.jpg]
```

### 7. Delete Product Image (Admin)

```bash
DELETE /api/products/{productId}/images
Authorization: Bearer {token}
Content-Type: application/json

{
  "imageUrl": "https://res.cloudinary.com/..."
}
```

---

## Complete Testing Flow

### Step 1: Register and Login

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin User","email":"admin@test.com","password":"admin123"}'

# Login and save token
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"admin123"}' \
  | jq -r '.token')

echo "Token: $TOKEN"
```

### Step 2: Make Admin (MongoDB)

```javascript
db.users.updateOne({email: "admin@test.com"}, {$set: {role: "admin"}});
```

### Step 3: Create Category

```bash
CATEGORY_ID=$(curl -s -X POST http://localhost:5000/api/categories \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Muebles","description":"Muebles modernos"}' \
  | jq -r '.category._id')

echo "Category ID: $CATEGORY_ID"
```

### Step 4: Create Product

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Sillón Nórdico\",
    \"description\": \"Hermoso sillón\",
    \"category\": \"$CATEGORY_ID\",
    \"price\": 599.99,
    \"salePrice\": 499.99,
    \"sku\": \"SOFA-001\",
    \"stock\": 15,
    \"featured\": true
  }"
```

### Step 5: Get All Products

```bash
curl http://localhost:5000/api/products | jq
```

### Step 6: Filter Products

```bash
curl "http://localhost:5000/api/products?category=$CATEGORY_ID&sort=price_asc" | jq
```

---

## Testing with Postman/Thunder Client

### Import Collection

Create a collection with:

1. Environment variable: `BASE_URL = http://localhost:5000/api`
2. Environment variable: `TOKEN = {{auth_token}}`
3. All requests above

### Test Sequence

1. ✅ Register → Save token
2. ✅ Login → Update token
3. ✅ Create Category → Save category ID
4. ✅ Create Product → Use category ID
5. ✅ Get Products → Verify creation
6. ✅ Update Product → Verify changes
7. ✅ Upload Images → Verify URLs
8. ✅ Delete Product → Verify deletion
