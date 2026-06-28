# ARCHITECTURE.md

# 1. Architecture Style

- Clean Architecture
- Separation of Concerns
- Dependency Injection
- SOLID Principles

# 2. Technology Stack

Frontend:
- React
- React Router
- Context API
- Axios

Backend:
- ASP.NET Core Web API
- Entity Framework Core

Database:
- SQL Server

# 3. Layers

Presentation Layer
Application Layer
Domain Layer
Infrastructure Layer

# 4. Request Flow

React UI
    ↓
API Controller
    ↓
Application Service
    ↓
Repository
    ↓
SQL Server

# 5. Authentication Flow

User Login
    ↓
JWT Token
    ↓
Protected APIs

# 6. Exception Handling

Global Exception Middleware
ProblemDetails responses

# 7. Logging

Serilog
Application Logs
Audit Logs

# 8. Caching

Product Catalog Cache
Category Cache

# 9. Deployment

React App
ASP.NET Core API
SQL Server
