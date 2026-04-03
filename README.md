# Slim Moms — Calorie Tracker App

A fullstack web application for tracking daily calorie intake with personalized recommendations based on the user's physical parameters and blood type.

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Pages & Routes](#pages--routes)
- [API Reference](#api-reference)
- [State Management](#state-management)
- [Authentication](#authentication)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Database Models](#database-models)
- [Contributing](#contributing)

---

## Overview

**Slim Moms** allows users to:

- Calculate their personalized daily calorie goal based on height, weight, age, and blood type
- Keep a daily food diary by searching and adding products
- Track how many calories they have consumed vs. their daily goal
- See a list of foods not recommended for their blood type

Unregistered users can also use a quick calorie calculator on the landing page without signing up.

---

## Live Demo

> **App:** [https://goit-slim-moms.vercel.app](https://goit-slim-moms.vercel.app)

> **API Documentation (Swagger UI):** [https://goit-server-slim-moms.onrender.com/api-docs](https://goit-server-slim-moms.onrender.com/api-docs)

> **Backend:** [https://goit-server-slim-moms.onrender.com](https://goit-server-slim-moms.onrender.com)

---

## Screenshots

| Main Page                                 | Login Page                                  | Registration Page                                         |
| ----------------------------------------- | ------------------------------------------- | --------------------------------------------------------- |
| ![Main Page](./screenshots/main-page.png) | ![Login Page](./screenshots/login-page.png) | ![Registration Page](./screenshots/registration-page.png) |

| Diary Page                                  | Calculator Page                                       |
| ------------------------------------------- | ----------------------------------------------------- |
| ![Diary Page](./screenshots/diary-page.png) | ![Calculator Page](./screenshots/calculator-page.png) |

---

## Tech Stack

### Frontend

| Technology        | Version   | Purpose                            |
| ----------------- | --------- | ---------------------------------- |
| React             | 19.2.4    | UI framework                       |
| Vite              | 8.0.1     | Build tool & dev server            |
| React Router DOM  | 7.13.2    | Client-side routing                |
| Redux Toolkit     | 2.11.2    | State management                   |
| React Redux       | 9.2.0     | Redux-React bindings               |
| Redux Persist     | 6.0.0     | Persist auth state to localStorage |
| Axios             | 1.13.6    | HTTP client                        |
| React Toastify    | 11.0.5    | Toast notifications                |
| React DatePicker  | 9.1.0     | Date selection in diary            |
| ESLint + Prettier | 9.x / 3.x | Code quality & formatting          |

### Backend

| Technology         | Version | Purpose                          |
| ------------------ | ------- | -------------------------------- |
| Node.js            | —       | Runtime                          |
| Express            | 5.2.1   | Web framework                    |
| MongoDB Atlas      | —       | Cloud database                   |
| Mongoose           | 9.3.3   | ODM for MongoDB                  |
| jsonwebtoken       | 9.0.3   | JWT-based authentication         |
| bcryptjs           | 3.0.3   | Password hashing                 |
| CORS               | 2.8.6   | Cross-Origin Resource Sharing    |
| Morgan             | 1.10.1  | HTTP request logging             |
| Swagger UI Express | 5.0.1   | Interactive API documentation    |
| swagger-jsdoc      | 6.2.8   | Generate OpenAPI spec from JSDoc |
| Dotenv             | 17.3.1  | Environment variable management  |
| Nodemon            | 3.1.14  | Auto-reload in development       |

---

## Project Structure

```
slim-moms/
├── client/                         # React frontend (Vite)
│   ├── public/
│   └── src/
│       ├── api/
│       │   └── axiosInstance.js    # Axios config with auth interceptors
│       ├── components/
│       │   ├── Header/
│       │   ├── Logo/
│       │   ├── Navigation/
│       │   ├── LoginForm/
│       │   ├── RegistrationForm/
│       │   ├── CalculatorCalorieForm/
│       │   ├── DailyCaloriesForm/
│       │   ├── DailyCalorieIntake/
│       │   ├── DiaryDateCalendar/
│       │   ├── DiaryAddProductForm/
│       │   ├── DiaryProductsList/
│       │   ├── DiaryProductsListItem/
│       │   ├── RightSideBar/
│       │   ├── UserInfo/
│       │   ├── Modal/
│       │   ├── Loader/
│       │   ├── PrivateRoute/
│       │   └── PublicRoute/
│       ├── pages/
│       │   ├── MainPage/
│       │   ├── LoginPage/
│       │   ├── RegistrationPage/
│       │   ├── DiaryPage/
│       │   └── CalculatorPage/
│       ├── redux/
│       │   ├── store.js
│       │   ├── auth/
│       │   │   ├── authSlice.js
│       │   │   └── authOperations.js
│       │   ├── diary/
│       │   │   ├── diarySlice.js
│       │   │   └── diaryOperations.js
│       │   ├── calculator/
│       │   │   ├── calculatorSlice.js
│       │   │   └── calculatorOperations.js
│       │   └── loader/
│       │       └── loaderSlice.js
│       └── App.jsx
│
├── server/                         # Express backend
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productsController.js
│   │   └── diaryController.js
│   ├── docs/
│   │   └── auth.swagger.js         # Swagger JSDoc annotations
│   ├── helpers/
│   │   └── jwt.js
│   ├── middleware/
│   │   └── auth.js                 # JWT authentication middleware
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── DayInfo.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productsRoutes.js
│   │   └── diaryRoutes.js
│   └── server.js
│
├── SETUP.md                        # Local setup guide (Turkish)
├── CONTRIBUTING.MD                 # Contribution guidelines (Turkish)
├── TOASTIFY.md                     # Toast notification usage guide
└── README.md
```

---

## Features

### Public (No Login Required)

- Landing page with a quick calorie calculator form
- Calculate daily calorie goal by entering height, current weight, desired weight, age, and blood type
- Modal popup displaying personalized calorie results and not-recommended foods
- User registration and login

### Authenticated Users

- Persistent login session (token stored in localStorage via Redux Persist)
- **Diary Page** — daily food log with date picker; add and remove products; real-time calorie tracking
- **Calculator Page** — save personalized calorie goals to the user profile
- **Right Sidebar** — displays daily calorie goal and list of foods not recommended for the user's blood type

---

## Pages & Routes

| Route         | Component          | Access      | Description                                        |
| ------------- | ------------------ | ----------- | -------------------------------------------------- |
| `/`           | `MainPage`         | Public      | Landing page with quick calculator                 |
| `/login`      | `LoginPage`        | Public only | Login form (redirects if already logged in)        |
| `/register`   | `RegistrationPage` | Public only | Registration form (redirects if already logged in) |
| `/diary`      | `DiaryPage`        | Private     | Daily food diary                                   |
| `/calculator` | `CalculatorPage`   | Private     | Personalized calorie calculator                    |

Routes not found redirect to `/`.

---

## API Reference

Base URL: `http://localhost:5000/api`

Interactive documentation is available at `http://localhost:5000/api-docs` (Swagger UI).

### Health Check

| Method | Endpoint  | Description         |
| ------ | --------- | ------------------- |
| GET    | `/health` | Server status check |

### Auth Routes — `/api/auth`

| Method | Endpoint    | Auth Required | Description                 |
| ------ | ----------- | ------------- | --------------------------- |
| POST   | `/register` | No            | Register a new user         |
| POST   | `/login`    | No            | Login and receive JWT token |
| POST   | `/logout`   | Yes           | Logout and invalidate token |
| GET    | `/current`  | Yes           | Get current user data       |

#### POST `/register` — Request Body

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securepassword"
}
```

#### POST `/login` — Request Body

```json
{
  "email": "jane@example.com",
  "password": "securepassword"
}
```

#### POST `/login` — Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "dailyCalories": 1800,
    "notRecommendedProducts": ["Flour", "Butter"]
  }
}
```

---

### Products Routes — `/api/products`

| Method | Endpoint   | Auth Required | Description                                  |
| ------ | ---------- | ------------- | -------------------------------------------- |
| GET    | `/`        | No            | Search products by name (`?q=query`)         |
| POST   | `/public`  | No            | Calculate daily calories (not saved)         |
| POST   | `/private` | Yes           | Calculate daily calories and save to profile |

#### GET `/` — Query Parameters

```
?q=banana
```

#### POST `/public` or `/private` — Request Body

```json
{
  "height": 165,
  "currentWeight": 70,
  "desiredWeight": 60,
  "age": 28,
  "bloodType": 1
}
```

> `bloodType`: `1` = Type 1, `2` = Type 2, `3` = Type 3, `4` = Type 4

#### Response

```json
{
  "dailyCalories": 1823,
  "notRecommendedProducts": ["Flour", "Butter", "Bread"]
}
```

---

### Diary Routes — `/api/diary`

All diary routes require authentication.

| Method | Endpoint                 | Description                                       |
| ------ | ------------------------ | ------------------------------------------------- |
| GET    | `/:date`                 | Get diary entry for a date (format: `YYYY-MM-DD`) |
| POST   | `/`                      | Add a product to the diary                        |
| DELETE | `/:dayInfoId/:productId` | Remove a product from the diary                   |

#### POST `/` — Request Body

```json
{
  "date": "2024-11-15",
  "productId": "64a1b2c3d4e5f6a7b8c9d0e1",
  "weight": 150
}
```

#### GET `/:date` — Response

```json
{
  "dayInfoId": "64a1b2c3d4e5f6a7b8c9d0e1",
  "date": "2024-11-15",
  "eatenProducts": [
    {
      "productId": "64a1b2c3d4e5f6a7b8c9d0e2",
      "title": "Banana",
      "weight": 150,
      "calories": 133.5
    }
  ],
  "daySummary": {
    "eatenCalories": 133.5
  }
}
```

---

## State Management

The Redux store is structured into 4 slices:

```
store
├── auth         (persisted to localStorage)
├── loader
├── diary
└── calculator
```

### Auth Slice

| State Field    | Type          | Description                                        |
| -------------- | ------------- | -------------------------------------------------- |
| `user`         | Object / null | Name, email, dailyCalories, notRecommendedProducts |
| `token`        | String / null | JWT token                                          |
| `isLoggedIn`   | Boolean       | Whether the user is authenticated                  |
| `isRefreshing` | Boolean       | True while refreshing current user                 |
| `isLoading`    | Boolean       | True during login/register requests                |
| `error`        | String / null | Last auth error message                            |

**Async Thunks:** `register`, `logIn`, `logOut`, `refreshUser`

**Persistence:** `token` and `user` fields are persisted via `redux-persist` to `localStorage`.

---

### Diary Slice

| State Field | Type          | Description                                         |
| ----------- | ------------- | --------------------------------------------------- |
| `products`  | Array         | List of eaten products for the selected date        |
| `dayInfoId` | String / null | MongoDB ID of the current day's diary entry         |
| `date`      | String        | Selected date in `YYYY-MM-DD` format                |
| `summary`   | Object        | `{ totalCalories, dailyRate, percentsOfDailyRate }` |
| `isLoading` | Boolean       | True during API requests                            |
| `error`     | String / null | Last diary error                                    |

**Async Thunks:** `fetchDiary`, `addProduct`, `removeProduct`

---

### Calculator Slice

| State Field              | Type          | Description             |
| ------------------------ | ------------- | ----------------------- |
| `dailyCalories`          | Number / null | Calculated calorie goal |
| `notRecommendedProducts` | Array         | List of foods to avoid  |
| `isLoading`              | Boolean       | True during calculation |
| `error`                  | String / null | Last error              |

**Async Thunks:** `calculateDailyCalories`
**Actions:** `clearResult`, `setLocalResult`

---

## Authentication

### How It Works

1. User logs in → backend returns a JWT token
2. Token is stored in Redux state and persisted to `localStorage`
3. On every request, Axios automatically adds the `Authorization: Bearer <token>` header via a request interceptor
4. On app load, `refreshUser` thunk is dispatched to validate the token with the backend
5. If the backend returns `401` on any protected route, the Axios response interceptor redirects the user to `/login`

### Backend Token Validation

The `authenticate` middleware on the server:

1. Extracts the `Bearer` token from the `Authorization` header
2. Verifies the JWT signature with `JWT_SECRET`
3. Checks the token exists in the user's DB record (prevents use of old tokens after logout)
4. Attaches the user document to `req.user`

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+
- A MongoDB Atlas account with a cluster (or ask the team lead for the connection string)

### 1. Clone the Repository

```bash
git clone https://github.com/goit-nodejs-project/slim-moms.git
cd slim-moms
```

### 2. Set Up Environment Variables

**Server:**

```bash
cd server
cp .env.example .env   # or create manually
```

Edit `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.phkjtvk.mongodb.net/slimmoms
JWT_SECRET=your_strong_secret_here
JWT_EXPIRES_IN=7d
```

**Client:**

```bash
cd client
cp .env.example .env   # or create manually
```

Edit `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 4. Run the Application

Open two terminal windows:

**Terminal 1 — Backend (port 5000):**

```bash
cd server
npm run dev
```

**Terminal 2 — Frontend (port 5173):**

```bash
cd client
npm run dev
```

Open your browser at: `http://localhost:5173`

---

## Environment Variables

### Server (`server/.env`)

| Variable         | Required | Example              | Description                       |
| ---------------- | -------- | -------------------- | --------------------------------- |
| `PORT`           | No       | `5000`               | Server port (defaults to 5000)    |
| `MONGO_URI`      | Yes      | `mongodb+srv://...`  | MongoDB Atlas connection string   |
| `JWT_SECRET`     | Yes      | `strongsecretstring` | Secret key for signing JWT tokens |
| `JWT_EXPIRES_IN` | Yes      | `7d`                 | JWT token expiry duration         |

### Client (`client/.env`)

| Variable       | Required | Example                     | Description                   |
| -------------- | -------- | --------------------------- | ----------------------------- |
| `VITE_API_URL` | Yes      | `http://localhost:5000/api` | Base URL for all API requests |

> `.env` files are listed in `.gitignore` and must be created locally by each developer.

---

## Scripts

### Client (`client/`)

| Script           | Command           | Description                                 |
| ---------------- | ----------------- | ------------------------------------------- |
| Start dev server | `npm run dev`     | Vite dev server at port 5173                |
| Production build | `npm run build`   | Compile to `dist/`                          |
| Preview build    | `npm run preview` | Preview the production build locally        |
| Lint             | `npm run lint`    | Run ESLint                                  |
| Format           | `npm run format`  | Run Prettier on all `src/**/*.{js,jsx,css}` |

### Server (`server/`)

| Script            | Command       | Description                           |
| ----------------- | ------------- | ------------------------------------- |
| Start production  | `npm start`   | Run server with Node                  |
| Start development | `npm run dev` | Run server with Nodemon (auto-reload) |

---

## Database Models

### User

```javascript
{
  name: String; // required
  email: String; // required, unique, lowercase
  password: String; // hashed with bcryptjs
  token: String; // null when logged out
  dailyCalories: Number; // default: 0
  notRecommendedProducts: [String]; // based on blood type
  createdAt: Date;
  updatedAt: Date;
}
```

### Product

```javascript
{
  title: String; // required
  categories: String;
  weight: Number;
  calories: Number; // per 100g, required
  groupBloodNotAllowed: [Mixed]; // blood type restriction flags [null, bool, bool, bool, bool]
}
```

> The `Product` collection is pre-loaded by the team lead and shared across all users.

### DayInfo

```javascript
{
  date:   String  // YYYY-MM-DD, required
  userId: ObjectId // ref: User
  eatenProducts: [{
    productId: ObjectId // ref: Product
    title:     String
    weight:    Number   // grams
    calories:  Number   // calculated: weight / 100 * product.calories
  }]
  daySummary: {
    eatenCalories: Number  // sum of all eaten product calories
  }
  createdAt: Date
  updatedAt: Date
}
```

> Unique index on `{ date, userId }` — one record per user per day.

---

## Contributing

Please read [CONTRIBUTING.MD](CONTRIBUTING.MD) for the full contribution workflow.

### Quick Summary

1. Pull the latest `main` branch before starting work
2. Create a feature branch: `feat/your-feature-name`
3. Make small, focused commits with clear messages
4. Open a Pull Request to `main` and request a review
5. At least one approval is required before merging

### Branch Naming

```
feat/feature-name       # New feature
fix/bug-description     # Bug fix
refactor/component-name # Refactoring
docs/update-readme      # Documentation
```

### Commit Message Format

```
feat: add calorie summary to diary page
fix: correct token expiry check in auth middleware
refactor: simplify diary product list rendering
```

---

## License

This project was developed as part of the [GoIT](https://goit.global) FullStack Developer course.
