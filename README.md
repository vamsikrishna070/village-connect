# 🏠 Village Connect

Village Connect is a modern digital platform designed to bridge the gap between rural communities and essential services. It provides a centralized hub for agriculture support, healthcare information, education resources, job opportunities, and grievance management.

---

## ✨ Key Features

- **🔐 Secure Authentication**: Role-based access control (Villager, Provider, Admin).
- **💼 Job Portal**: Browse and apply for local job opportunities.
- **🌾 Agriculture Support**: Real-time farming tips and agricultural services.
- **🏥 Healthcare Services**: Access to medical information and wellness resources.
- **📚 Education Programs**: Scholarship details and educational courses.
- **📢 Grievance Management**: Submit and track community issues directly to officials.
- **📊 Admin Dashboard**: High-level statistics and system oversight for administrators.

---

## 🛠️ Tech Stack

### Frontend
- **React 18/19** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - API Communication
- **Sonner** - Toast Notifications
- **Lucide React** - Iconography

### Backend
- **Node.js** - Runtime
- **Express** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Secure Authentication
- **Bcrypt.js** - Password Hashing

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account

### 2. Installation
Clone the repository and install dependencies in both directories:

```bash
# Install root (if any)
npm install

# Setup Backend
cd backend
npm install

# Setup Frontend
cd ../frontend
npm install
```

### 3. Environment Setup
Create a `.env` file in both the `backend` and `frontend` directories.

#### Backend (`backend/.env`):
```env
PORT=8001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=7d
CORS_ORIGIN=http://localhost:5173
```

#### Frontend (`frontend/.env`):
```env
VITE_API_URL=http://localhost:8001
```

### 4. Running the Application

**Start Backend:**
```bash
cd backend
npm run dev
```

**Start Frontend:**
```bash
cd frontend
npm run dev
```

---

## 📁 Project Structure

```text
Village-Connect/
├── backend/            # Express Server
│   ├── config/         # Database configuration
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Auth & error handling
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   └── server.js       # Entry point
├── frontend/           # Vite + React App
│   ├── src/
│   │   ├── api/        # Axios configurations
│   │   ├── components/ # Reusable UI components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── pages/      # Route pages
│   │   └── App.jsx     # Main routes
│   └── public/         # Static assets
└── .gitignore          # Git exclusion rules
```

---

## 👤 User Roles

| Role | Access Level |
| :--- | :--- |
| **Villager** | Browse services, apply for jobs, submit grievances. |
| **Provider** | Create job listings, add agricultural/health resources. |
| **Admin** | Full system oversight, manage all users and grievances. |

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

---

**Happy Coding!** 🚀
