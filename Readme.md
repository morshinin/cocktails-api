# 🍹 Cocktail Bar API — Backend

<p>
  <img src="https://img.shields.io/badge/Node.js-22.x-43853d?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-Framework-000000?logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-4ea94b?logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Mongoose-ODM-a03333?logo=mongoose" />
  <img src="https://img.shields.io/badge/Multer-File Upload-ffca28?logo=googlephotos" />
</p>

<p>
  <a href="https://cocktails-api-zsvy.onrender.com/api/recipes"><img src="https://img.shields.io/badge/🌍_API_Online-Yes-green" /></a>
  <a href="https://github.com/morshinin"><img src="https://img.shields.io/badge/Author-morshinin-blue?logo=github" /></a>
</p>

<p>
  <a href="https://cocktails-api-zsvy.onrender.com">
    <img src="https://img.shields.io/website?url=https%3A%2F%2Fcocktails-api-zsvy.onrender.com&label=Render%20Status" />
  </a>
</p>

---

Backend REST API for managing cocktails, ingredients, preparation methods and recipe instructions.
Designed to serve both professional bartenders and cocktail enthusiasts.

This API provides structured access to cocktail data and supports CRUD operations through clear and consistent endpoints.

## 🌍 Live API

### Production:
https://cocktails-api-zsvy.onrender.com

### Example request:

GET /api/recipes

### 🧱 Tech Stack
Technology	Purpose
Node.js + Express	Core web framework
MongoDB + Mongoose	Database & ODM
Multer	Image upload handling
CORS	API accessibility
dotenv	Environment configuration

### 📁 Endpoints Overview
Resource	Base Route	Description
Recipes	/api/recipes	Full cocktail recipes (CRUD)
Components	/api/components	Ingredients used in cocktails
Methods	/api/methods	Cocktail preparation techniques
Instructions	/api/instructions	Step-by-step cocktail guides
Uploads	/api/upload	Image upload endpoint (Multer)

## 🔧 Local Setup
### 1. Clone the repository
```bash
   git clone https://github.com/morshinin/cocktails-api.git
   cd cocktails-api
```

### 2. Install dependencies
```bash
   npm install
```

### 3. Configure environment variables

Create a .env file:

```bash
PORT=3000
MONGO_URI=mongodb+srv://your_user:your_password@cluster.mongodb.net/cocktails
```

### 4. Start the server
```bash
   npm start
```

### Server runs at:

http://localhost:3000

## 🗂 Project Structure
```bash
.
├── models/             # Mongoose models
├── routes/             # API route modules
├── uploads/            # Uploaded images
├── server.js           # App bootstrap
└── package.json
```

## 🚀 Deployment

The backend is deployed on Render and uses MongoDB Atlas as database.

To redeploy:

Push changes to main — Render auto-rebuilds.

## 🧑‍💻 Author

https://github.com/morshinin

If you like this project — ⭐ Star is appreciated :)
