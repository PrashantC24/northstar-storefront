# API-CONTRACT.md

# Authentication APIs

POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout

Request:

{
  "email":"user@test.com",
  "password":"Password@123"
}

# Products

GET /api/products
GET /api/products/{id}

Filtering:

GET /api/products?category=electronics
GET /api/products?brand=samsung
GET /api/products?rating=4
GET /api/products?maxPrice=50000

Pagination:

GET /api/products?page=1&pageSize=20

Sorting:

GET /api/products?sort=price

# Cart

GET /api/cart
POST /api/cart
PUT /api/cart/{id}
DELETE /api/cart/{id}

# Checkout

POST /api/checkout

# Orders

GET /api/orders
GET /api/orders/{id}

# Status Codes

200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error

# Error Response

{
  "status":400,
  "message":"Validation failed"
}
