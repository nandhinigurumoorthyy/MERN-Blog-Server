# 🛠️ Blog Back-End (MERN API)

This is the back-end of a full-stack Blog application built with **Node.js**, **Express**, and **MongoDB Atlas**. It provides RESTful API endpoints for user authentication, blog CRUD operations, and connects with a React front-end.

---

## 🚀 Features

* 🔐 **User Authentication**

  * Signup and login using **JWT tokens**.
  * Passwords are securely **hashed with bcrypt** during signup and verified during login.
  * Secure cookies handled with `cookie-parser`.
  * **Auth middleware** for protecting routes and ensuring token validation.


* 📰 **Blog Management (CRUD)**

  * Create, read, update, and delete blogs.
  * Each blog includes title, content, category, image URL, and author.

* 🌐 **CORS-Enabled API**

  * Supports secure cross-origin requests from the front-end.

* 💾 **MongoDB Atlas Integration**

  * Hosted MongoDB database using Mongoose ODM.

---

## 📦 Dependencies

Installed packages:

```bash
npm install mongoose axios express cors cookie-parser jsonwebtoken dotenv
```

### Key Packages Used

* `express` – API routing and server setup
* `mongoose` – MongoDB object modeling
* `cors` – Cross-origin resource sharing
* `axios` – Making HTTP requests (if needed for testing or other services)
* `dotenv` – Manage environment variables
* `cookie-parser` – Parse cookies for authentication
* `jsonwebtoken` – Handle JWT for login sessions

---

## 🌱 Environment Setup

### 1. **Clone the repository**

```bash
git clone https://github.com/nandhinigurumoorthyy/MERN-Blog-Server.git
cd MERN-Blog-Server
```

### 2. **Create a `.env` file**

Example `.env`:

```env
PORT=10000
MONGO_URI=mongodb_atlas_uri
JWT_SECRET=secret_key
```

---

## 🧪 API Endpoints

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| POST   | `/auth/signup`     | Register a new user     |
| POST   | `/auth/login`      | Authenticate user login |
| POST   | `/create/blogs`    | Create a new blog post  |
| GET    | `/blogs`           | Get all blog posts      |
| PUT    | `/update/blog/:id` | Update a blog by ID     |
| DELETE | `/delete/blog/:id` | Delete a blog by ID     |

---

## 🧰 Project Structure

```bash
project/
│
├── model/
│   ├── blog.model.js
│   └── user.model.js
|
├── .env
├── index.js
├── db.js
|
```

---

## ▶️ Running the Server

```bash
npm start
```

---

## ⚠️ Notes

* Ensure MongoDB Atlas access is configured to allow your IP or is open to all (not recommended in production).
* JWT tokens are stored in HTTP-only cookies for security.
* Use Postman or frontend app for testing routes.
* Backend must be running before using the React frontend.

---

## 🔗 Frontend

Ensure the frontend is connected and uses matching API endpoints.

* **Frontend Repository**: [MERN Blog UI](https://github.com/nandhinigurumoorthyy/MERN-Blog-UI.git)
* **Live Site**: [https://mern-blog-ui.netlify.app](https://mern-blog-ui.netlify.app/)



---

## 🚀 Backend Deployment

The backend is deployed using **Render**.
Make sure your frontend API calls point to the correct Render URL for proper connectivity.

---



## 📄 License

This project is licensed under the **MIT License**.




