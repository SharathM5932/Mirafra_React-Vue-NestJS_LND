# E-Commerce Frontend – React Application
## Project Structure Overview

```
src/
│
├── app/
│   └── store.ts                 # Redux store configuration
│
├── components/
│   ├── AboutUs.tsx
│   ├── ContactUs.tsx
│   ├── ContactUs.css
│   ├── DialogBox.tsx
│   ├── Footer.jsx
│   ├── Footer.css
│   ├── Home.tsx
│   ├── LogoCarousel.tsx
│   ├── LogoCarousel.css
│   ├── Logout.tsx
│   ├── Navbar.tsx
│   ├── Navbar.css
│   └── Toast.tsx
│
├── features/
│   ├── apis/
│   │   ├── signInApis.ts
│   │   └── signUpApi.ts
│   │
│   ├── auth/
│   │   ├── authSlice.ts
│   │   ├── ResetPassword.tsx
│   │   ├── ResetPassword.css
│   │   ├── ResetPasswordLink.tsx
│   │   ├── Signin.tsx
│   │   ├── Signin.css
│   │   ├── signInSchema.ts
│   │   ├── Signup.tsx
│   │   ├── Signup.css
│   │   └── signUpSchema.ts
│   │
│   ├── cart/
│   │   ├── cartSlice.ts
│   │   ├── Cart.tsx
│   │   └── Cart.css
│   │
│   ├── payment/
│   │   ├── hooks.ts
│   │   ├── OrderCreate.tsx
│   │   ├── OrderCreate.css
│   │   ├── PaymentGateway.tsx
│   │   ├── paymentSlice.ts
│   │   ├── TransactionPage.tsx
│   │   └── TransactionPage.css
│   │
│   └── products/
│       ├── AddProduct.tsx
│       ├── AddProduct.css
│       ├── ProductDetail.tsx
│       ├── ProductDetail.css
│       ├── ProductList.tsx
│       ├── ProductList.css
│       ├── productSlice.ts
│       └── useLazyLoad.ts
│
├── types/
│   ├── auth.d.ts
│   ├── cart.d.ts
│   └── product.d.ts
│
├── App.tsx
├── index.tsx
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## 📁 Frontend Folder Structure (React + TypeScript)

This project follows a modular folder structure optimized for scalability, maintainability, and separation of concerns. Below is a detailed explanation of each folder and its contents:

---



### 📄 `README.md`

---

### 📁 `src/`

The root folder for all frontend source code. It contains subfolders for state management, components, features, types, and main app files.

---

### 📁 `app/`

Centralized configuration for the Redux store.

- **`store.ts`**  
  Initializes and exports the Redux store using `configureStore` from Redux Toolkit. All feature slices are combined here.

---

### 📁 `components/`

Contains **shared reusable UI components** used across multiple pages.

- **`AboutUs.tsx`** – Static component describing the website or company.  
- **`ContactUs.tsx` + `ContactUs.css`** – Contact form with styled layout.  
- **`DialogBox.tsx`** – Reusable modal/dialog component for confirmations or alerts.  
- **`Footer.jsx` + `Footer.css`** – Website footer with navigation and copyright.  
- **`Home.tsx`** – Homepage UI with introductory content.  
- **`LogoCarousel.tsx` + `LogoCarousel.css`** – Carousel slider to display brand logos.  
- **`Logout.tsx`** – UI for logout operation with state clearing.  
- **`Navbar.tsx` + `Navbar.css`** – Main navigation bar used across all pages.  
- **`Toast.tsx`** – Toast notification component used for success/error alerts.

---

### 📁 `features/`

Contains **domain-specific modules** (also called "slices" in Redux) such as authentication, cart, product, and payment.

#### 📁 `apis/`

API functions for authentication.

- **`signInApis.ts`** – Login API logic (typically POST request).  
- **`signUpApi.ts`** – Register API logic (typically POST request).

---

#### 📁 `auth/`

Manages user authentication and credentials.

- **`authSlice.ts`** – Redux slice for login/logout actions and state management.  
- **`ResetPassword.tsx` + `ResetPassword.css`** – Form for password reset with styling.  
- **`ResetPasswordLink.tsx`** – Component for password reset token verification.  
- **`Signin.tsx` + `Signin.css`** – Login form with validation.  
- **`signInSchema.ts`** – Zod schema for sign-in form validation.  
- **`SignUp.tsx` + `Signup.css`** – Registration form with validation.  
- **`signUpSchema.ts`** – Zod schema for sign-up form validation.

---

#### 📁 `cart/`

Handles cart UI and business logic.

- **`cartSlice.ts`** – Redux slice to manage cart items and operations.  
- **`Cart.tsx` + `Cart.css`** – UI for viewing cart items, total, and remove/add functionality.

---

#### 📁 `payment/`

Manages order creation and payment processing.

- **`hooks.ts`** – Reusable React hooks related to payment or form logic.  
- **`OrderCreate.tsx` + `.css`** – UI and logic for creating a new order.  
- **`PaymentGateway.tsx`** – Integration with external payment systems (e.g., PayPal).  
- **`paymentSlice.ts`** – Redux slice managing transaction status and payment response.  
- **`TransactionPage.tsx` + `.css`** – UI for displaying payment transaction history or confirmation.

---

#### 📁 `products/`

Handles CRUD operations for products.

- **`AddProduct.tsx` + `.css`** – Admin UI to add a product.  
- **`ProductDetail.tsx` + `.css`** – UI for detailed product view.  
- **`ProductList.tsx` + `.css`** – Grid/list view to show all products.  
- **`productSlice.ts`** – Redux slice for managing products (fetch, add, update, delete).  
- **`useLazyLoad.ts`** – Custom hook for lazy loading product images/data on scroll.

> 🔁 Note: Some files like `copy.txt` or `copy 2.tsx` may be backups or work-in-progress versions and should be cleaned before deployment.

---

### 📁 `types/`

Defines global TypeScript types for consistent usage across the project.

- **`auth.d.ts`** – Interfaces and types related to user authentication.  
- **`cart.d.ts`** – Interfaces for cart items and cart state.  
- **`product.d.ts`** – Product data types including structure and optional fields.

---

### 📄 `App.tsx`

Root React component. Wraps all feature modules with providers like Redux, routing, and layout.

---

### 📄 `index.tsx`

Entry point of the application. Renders the `` component into the root DOM node using ReactDOM.

---

### 🛠️ Configuration Files

- **`.gitignore`** – Excludes `node_modules`, `.env`, and other sensitive files from version control.  
- **`package.json` / `package-lock.json`** – Defines project dependencies, scripts, and versions.  
- **`tsconfig.json`** – TypeScript compiler configuration for paths, strictness, and JSX settings.  
- **`README.md`** – This documentation file.

---

## Best Practices Followed

- Modular folder structure using **feature-based architecture**.  
- Centralized **Redux Toolkit state management**.  
- **Zod validation** for form schema and input safety.  
- Clear **separation of concerns** (UI, logic, types).  
- Use of **custom hooks** and reusable components.  
- Typescript-first development with explicit typing.

---