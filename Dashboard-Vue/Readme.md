# 📁 Project Folder Structure

This project follows a modular and organized structure for better maintainability and scalability.

## 📂 Folder Overview

| Path                             | Description                                                  |
|----------------------------------|--------------------------------------------------------------|
| `/public`                        | Static assets like `favicon.ico`, `index.html`, etc.         |
| `/src`                           | Main source code directory                                   |
| ├── `assets`                     | Global styles, images, icons                                 |
| │   ├── `tailwind.css`           | Tailwind CSS configuration and base imports                  |
| ├── `components`                 | Reusable UI components (cards, buttons, charts)              |
| │   ├── `charts`                 | Chart.js-based visualizations                                |
| │   ├── `layout`                 | Layout components like Navbar, Sidebar, Footer               |
| ├── `views`                      | Vue.js pages/views used in routing                           |
| │   ├── `Dashboard.vue`          | Dashboard view                                               |
| │   ├── `Login.vue`              | Login page                                                   |
| │   ├── `Products.vue`           | Product management page                                      |
| │   ├── `Users.vue`              | User management page                                         |
| │   ├── `Categories.vue`         | Category management page                                     |
| │   ├── `Transactions.vue`       | Transaction history page                                     |
| ├── `routes`                     | Application routing logic                                    |
| │   ├── `index.ts`               | Route definitions and route guards                           |
| ├── `services`                   | Handles API requests and business logic                      |
| │   ├── `authService.ts`         | Authentication-related services                              |
| │   ├── `userServices.ts`        | User-related API services                                    |
| │   ├── `productServices.ts`     | Product-related API services                                 |
| │   ├── `categoryServices.ts`    | Category-related API services                                |
| ├── `stores`                     | Pinia/Vuex stores for state management                       |
| │   ├── `productStore.ts`        | State store for products                                     |
| │   ├── `userStore.ts`           | State store for users                                        |
| ├── `utils`                      | Utility/helper functions                                     |
| │   ├── `auth.ts`                | Auth token management utilities                              |

---