<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/). -->



# 📂 Folder Structure

| Path                             | Purpose / Description                                       |
|----------------------------------|-------------------------------------------------------------|
| /public                          | Static assets(favicon,index.html)                           |  
 | /src
| ├── `app`                        |                                                             |
|   ├── `data.ts`                  | This file serves as a central data source for fashionitem   |
|   ├── `hook.ts`                  | To define custom typed hooks for working with Redux in a TypeScript + React project.|
|   ├── `store.ts`                 | sets central Redux configuration file                       |   
| ├── `collections`                |                                                             |
|   ├── `Men Collection `          | for displaying a men’s fashion collection                   |
|   ├── `Women Collection`         | for displaying a women's fashion collection                 |
| ├── `features`                   |                                                             |
|   ├── `APis`                     |  defines an async thunk                                     |
|        ├──`PaymentApi`           |                                                             |
|        ├──`ProductApi`           |                                                             |
|        ├──`SignInApi`            |                                                             |
|        ├──`SignUpApi`            |                                                             |
|   ├── `Auth`                     |                                                             |
|        ├──`AuthSlice`            |to manage authentication state ,handles user login/sigup     | 
|        ├──`forgotPassword`       |Component to send email and get reset link                   |   
|        ├──`ResetPassword`        |Component allows users to submit a new password to backend   | 
|        ├──`signIn`               |renders a user login form and save this info for future use  |
|        ├──`signUp`               |renders a user register form and usave this info for future  |
|   ├── `Cart`                     |                                                             |
|        ├──`cartContext`          |context to manage a persistent shopping cart with add,remove etc|
|        ├──`cartPage`             |component displays the user’s shopping cart with product details|
|        ├──`cartSlice`            | manages a shopping cart’s state with actions                |
|   ├── `Components`               |                                                             |
|        ├──`Banner`               | displays a banner image inside a styled container.          |
|        ├──`Footer`               |component creates a clean, organized footer section          |
|        ├──`Header`               |Responsive header with navigation, dropdown menu, and links  |
|        ├──`Navbar`               |links to main categories, order history, cart,wishlist pages.|
|   ├── `order`                    |                                                             |
|        ├──`orderHistoryPage`     |Displays  logged-in user's past orders for easy site access  |
|        ├──`orderSlice`           |Manages order history state by adding new orders             |
|   ├── `Page`                     |                                                             |
|        ├──`BeautyProductList`    |Displays beauty category products fetched from the store     |
|        ├──`ChildrenProductList`  |Displays chidren category products fetched from the store    |
|        ├──`MainPage`             |Renders main page                                            |
|        ├──`MenProductList`       |Displays men category products fetched from the store        |
|        ├──`WomenProductList`     |Displays women category products fetched from the store      |
|   ├── `Payment`                  |                                                             |
|        ├──`PaymentPage`          |handles the PayPal payment flow                              |
|        ├──`paymentSlice`         |standard Redux Toolkit async slice for handling async sendTransaction action |
|   ├── `Product`                  |                                                             |
|        ├──`AddProduct `          |collects product details including a file upload             |
|        ├──`ProductSlice `        |Manages product data by fetching,adding products asynchronously|
|   ├── `styles  `                 | Contains all CSS files                                      |
|        ├──`AboutPage `           |                                                             |
|        ├── `Cart`                |                                                             |
|        ├── `Collections`         |                                                             |
|        ├── `Footer`              |                                                             |
|        ├── `Header`              |                                                             |
|        ├── `Navbar`              |                                                             |
|        ├── `OrderPage`           |                                                             |
|        ├── `Product`             |                                                             |
|        ├── `resetPassword`       |                                                             |
|        ├── `Signin`              |                                                             |
|        ├── `WomenProduct`        |                                                             |
|   ├── `About`                    |      renders the about page                                 |
|   ├── `Product`                  |  fetch the products and displaying                          |
| ├── `types`                      |                                                             |
|   ├── `Auth.d.ts`                |interfaces help TypeScript ensure your Redux slice           |
|   ├── `Product.d.ts`             | TypeScript enforce correct data handling for product-related Redux operations |
| ├── `App`                        |  sets up the main routing and context providers             |
| ├── `index`                      |Sets up React app with Redux store, React Router, and strict mode for rendering.| 