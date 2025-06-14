# 🎫 Ticket Management System

A **full-stack Ticket Management System** built with **React** and **Node.js** to help organizations manage and track support tickets. Includes features like user authentication, department management, and automated escalation rules.

---

## 🚀 Features

- 🔐 **User Authentication & Authorization**
- 📝 **Ticket Management with Real-time Updates**
- 🏢 **Department Management**
- ⚙️ **Automated Escalation Rules**
- 💻 **Responsive Material UI Design**
- 🔁 **Real-time Functionality**
- 🔒 **Secure API Endpoints**

---

## 🛠️ Tech Stack

### 🖥️ Frontend
- [React 19](https://react.dev/)
- [Material UI (MUI)](https://mui.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Vite](https://vitejs.dev/)

### 🌐 Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [JWT Authentication](https://jwt.io/)
- [Express Validator](https://express-validator.github.io/)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)

---

## 📁 Project Structure

ticket-management-system/
├── frontend/ # React frontend application
│ ├── src/ # Source files
│ ├── public/ # Static assets
│ └── package.json # Frontend dependencies
│
└── backend/ # Node.js backend application
├── config/ # Environment/config files
├── controllers/ # API logic controllers
├── middleware/ # Custom middleware
├── models/ # Mongoose models
├── routes/ # API route definitions
├── utils/ # Utility/helper functions
└── server.js # Application entry point

markdown
Copy
Edit

---

## ⚙️ Getting Started

### ✅ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 📦 Installation

1. **Clone the Repository**

```bash
git clone <repository-url>
cd ticket-management-system
```

2. **Install Frontend Dependencies**

```bash
cd frontend
npm install
```

3. **Install Backend Dependencies**

```bash
cd ../backend
npm install
```

4. **Configure Environment Variables**

Create a `.env` file inside the `backend/` directory with the following content:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

▶️ Running the Application

✅ Start Backend Server

```bash
cd backend
npm run dev
```

✅ Start Frontend Development Server

```bash
cd ../frontend
npm run dev
```

📍 Application URLs

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

📡 API Endpoints

| Endpoint                | Description                   |
|-------------------------|-------------------------------|
| /api/users              | User registration/login       |
| /api/departments        | Manage departments            |
| /api/tickets            | Create & manage tickets       |
| /api/escalation-rules   | Define escalation policies    |
