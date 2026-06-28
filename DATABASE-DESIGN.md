
# DATABASE-DESIGN.md

# Users

| Column | Type | Constraints |
|-------|------|-------------|
| UserId | INT | PK Identity |
| FirstName | NVARCHAR(100) | NOT NULL |
| LastName | NVARCHAR(100) | NOT NULL |
| Email | NVARCHAR(200) | UNIQUE |
| PasswordHash | NVARCHAR(MAX) | NOT NULL |
| CreatedDate | DATETIME | NOT NULL |

Index:
IX_Users_Email

# Categories

| Column | Type |
|-------|------|
| CategoryId | INT |
| Name | NVARCHAR(100) |

# Brands

| Column | Type |
|-------|------|
| BrandId | INT |
| Name | NVARCHAR(100) |

# Products

| Column | Type |
|-------|------|
| ProductId | INT |
| Name | NVARCHAR(200) |
| Description | NVARCHAR(MAX) |
| Price | DECIMAL(18,2) |
| StockQuantity | INT |
| CategoryId | INT |
| BrandId | INT |
| Rating | DECIMAL(2,1) |

Indexes:
- IX_Products_Name
- IX_Products_CategoryId

# ProductImages

- ProductImageId
- ProductId
- ImageUrl

# Cart

- CartId
- UserId

# CartItems

- CartItemId
- CartId
- ProductId
- Quantity

# Orders

- OrderId
- UserId
- OrderDate
- Status
- TotalAmount

# OrderItems

- OrderItemId
- OrderId
- ProductId
- Quantity
- Price

# Payments

- PaymentId
- OrderId
- PaymentMethod
- PaymentStatus

# Relationships

Users 1:N Orders
Orders 1:N OrderItems
Categories 1:N Products
Brands 1:N Products
Products 1:N ProductImages
Users 1:1 Cart
Cart 1:N CartItems

# Sample Product Table

CREATE TABLE Products
(
    ProductId INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX),
    Price DECIMAL(18,2),
    CategoryId INT,
    BrandId INT,
    StockQuantity INT
)
