# 🛒 E-Commerce Backend – Microservices Architecture (NestJS)

This project is a full-featured **e-commerce backend** built using **NestJS** with a **microservices architecture**. It covers core services such as **authentication**, **product management**, **cart**, **category**, **payment**, and **user profile** handling.

---
## 📦 Project Structure Overview

```
├── apps/
│   ├── auth/
│   ├── cart/
│   ├── category/
│   ├── payment/
│   ├── products/
│   ├── user/
│   ├── gateway/
│   └── micro-services/
├── libs/
├── utils/
├── prodimgs/
├── dist/
├── node_modules/
├── .env
├── Dockerfile
├── package.json
├── tsconfig.app.json
└── README.md
```

---

## 📁 `apps/` – Microservices

### 🔐 `auth/` – Authentication & Authorization

Manages login, registration, password reset, and role-based access.

#### `src/dto/`

Contains Data Transfer Objects for user input validation using `class-validator`.

- `login.dto.ts` – Fields for login (email, password).
- `register.dto.ts` – Fields for new user registration.
- `forgotPassword.dto.ts` – Accepts email for password reset link.
- `resetPassword.dto.ts` – Accepts token, new password for resetting.

#### `src/strategy/`

- `jwt.strategy.ts` – Implements JWT validation logic via `PassportStrategy`.

#### Core files:

- `auth.controller.ts` – Defines API routes (login, register, reset password).
- `auth.service.ts` – Business logic and database interaction.
- `auth.module.ts` – Sets up dependencies and JWT strategy.
- `roles.decorators.ts` – Custom role-based route guard decorators.
- `roles.guard.ts` – Guards routes based on user roles.
- `main.ts` – Bootstraps the service.

---

### 🛒 `cart/` – Cart Management

Handles cart-related operations like adding, updating, and retrieving cart items.

#### `dto/`

- `add-cart.dto.ts` – Validates cart input (product ID, quantity).

#### `src/`

- `cart.controller.ts` – API endpoints for cart.
- `cart.service.ts` – Cart logic and database access.
- `cart.schema.ts` – MongoDB schema definition.
- `cart.module.ts` – NestJS module wiring.
- `main.ts` – Microservice bootstrap entry.

---

### 🗂️ `category/` – Product Categories

Handles operations for creating and retrieving product categories.

#### `dto/`

- `category.dto.ts` – DTO for adding/editing categories.

#### `schema/`

- `category.schema.ts` – MongoDB schema definition for a category.

#### Core:

- `category.controller.ts` – API routes for category.
- `category.service.ts` – Handles category business logic.
- `category.module.ts` – NestJS module config.
- `main.ts` – Service bootstrap.

---

### 💰 `payment/` – Payment Processing

Handles payment via PayPal and stores transaction data.

#### `dto/` + `schema/`

- Define DTOs and schemas for handling and validating payment data.

#### Core:

- `payment.controller.ts` – Payment routes.
- `payment.service.ts` – Logic to initiate and confirm transactions.
- `payment.module.ts` – Module declaration.
- `payment.controller.spec.ts` – Jest unit tests.
- `main.ts` – Service entry.

#### `test/`

- `app.e2e-spec.ts` – End-to-end testing for payment module.
- `jest-e2e.json` – Config for Jest testing.

---

### 📦 `products/` – Product Management

Manages product CRUD, images, and storage.

#### `dto/`

- DTOs for product creation and updates.

#### `schemas/`

- MongoDB schema for products.

#### Core:

- `products.controller.ts` – Routes for product CRUD.
- `products.service.ts` – Handles all product logic.
- `products.module.ts` – Binds controller and service.
- `multer.config.ts` – Handles image uploads.
- `products.controller.spec.ts` – Unit testing file.
- `main.ts` – Microservice bootstrap.

---

### 👤 `user/` – User Profile Service

Manages user-related data independent of authentication.

#### `schema/`

- `user.schema.ts` – MongoDB user schema.

#### Core:

- `user.controller.ts` – Routes for user data fetch/update.
- `user.service.ts` – Service logic.
- `user.module.ts` – Module structure.
- `main.ts` – Service entry.

---

### 📡 `gateway/` – API Gateway

This service aggregates and routes all external client requests to appropriate microservices. Handles:

- Authentication validation
- Role checking
- Zod-based request validation
- Proxying or forwarding to services via **TCP** or HTTP

> **Note**: Uses `@nestjs/microservices` for TCP communication.

---

## 📦 `libs/`, `utils/`, `prodimgs/`

- `libs/` – Contains shared modules (not detailed here).
- `utils/` – Utility functions and shared helpers.
- `prodimgs/` – Stores uploaded product images.

---


---

## 📚 Dependencies Summary

### Core Frameworks

- `@nestjs/common`, `@nestjs/core`, `@nestjs/microservices`, `@nestjs/mongoose`
- `@nestjs/jwt`, `@nestjs/passport`, `passport-jwt`

### Utilities & Helpers

- `bcrypt`, `dotenv`, `uuid`, `multer`, `nodemailer`, `handlebars`

### Validation & Transformation

- `class-validator`, `class-transformer`, `@nestjs-modules/mailer`

### Testing & Linting

- `jest`, `ts-jest`, `supertest`, `eslint`, `prettier`

---

## 🛡️ Security & Validation

- JWT-based Authentication using `passport-jwt`.
- Role-based guards and route protection via decorators.
- Secure input handling with DTO + `class-validator`.
- Zod validation integrated at the gateway level.

---

## 🐳 Docker Support

A basic Dockerfile is included for containerizing the backend services.

---

## Run the Backend

```
# Install dependencies
npm install

# Start all services (example)
npm run start:dev

# Run tests
npm run test
```

---

## 🔄 Communication

All services communicate using **TCP transport** via `@nestjs/microservices`. The API Gateway acts as a **single entry point** for clients (e.g., React/Vue frontend).

---
```
This detailed `README.md` provides a comprehensive overview of your NestJS-based microservices e-commerce backend, including project structure, service responsibilities, scripts, dependencies, and important notes on security and communication. You can paste this directly into your project’s `README.md`.