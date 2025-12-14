# 🧪 API Testing Guide

## Authentication Endpoints

### 1. Register User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123",
  "phone": "+54 123 456 7890"
}
```

### 2. Login User

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "password123"
}
```

### 3. Get Profile (Protected)

```bash
GET /api/auth/profile
Authorization: Bearer {token}
```

### 4. Update Profile (Protected)

```bash
PUT /api/auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Juan Carlos Pérez",
  "phone": "+54 987 654 3210"
}
```

### 5. Add Address (Protected)

```bash
POST /api/auth/profile/addresses
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Casa",
  "street": "Calle Falsa 123",
  "city": "Springfield",
  "postalCode": "4400",
  "country": "Argentina",
  "isDefault": true
}
```

### 6. Delete Address (Protected)

```bash
DELETE /api/auth/profile/addresses/:addressId
Authorization: Bearer {token}
```

### 7. Get Favorites (Protected)

```bash
GET /api/auth/favorites
Authorization: Bearer {token}
```

### 8. Toggle Favorite (Protected)

```bash
POST /api/auth/favorites/:productId
Authorization: Bearer {token}
```

## Testing with cURL

Save token:

```bash
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"juan@example.com","password":"password123"}' \
  | jq -r '.token')

echo $TOKEN
```

Use token:

```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer $TOKEN"
```
