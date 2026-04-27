# VillageConnect

A comprehensive digital platform designed to empower rural communities by providing access to essential services including agriculture, healthcare, education, job opportunities, and grievance management.

## 🌟 Features

- **User Authentication** - Secure JWT-based authentication with role-based access control
- **Job Portal** - Job listings, applications, and management
- **Agriculture Support** - Crop information, farming tips, and agricultural services
- **Healthcare Services** - Medical services, health camps, and wellness information
- **Education Programs** - Courses, scholarships, and educational resources
- **Environmental Awareness** - Sustainability tips, climate change awareness, and conservation guidance
- **Grievance Management** - Submit, track, and resolve community grievances
- **Admin Dashboard** - System statistics, grievance management, and user oversight
- **User Dashboard** - Personal statistics and service access

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI framework
- **Vite 7.3** - Build tool and dev server
- **React Router** - Client-side routing
- **React Query** - Server state management
- **TailwindCSS 3.4** - Styling
- **Axios** - HTTP client
- **Zod** - Schema validation

### Backend

- **Node.js** - Runtime
- **Express 5** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose 8** - ODM for MongoDB
- **JWT (jsonwebtoken)** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- MongoDB Atlas account (or local MongoDB instance)
- Git for version control

## 🚀 Quick Start

### 1. Clone & Install Dependencies

```bash
cd Village-Connect
npm install
```

### 2. Configure Environment Variables

#### Backend (.env)

Create `backend/.env` file:

```env
NODE_ENV=development
PORT=8001
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=7d
CORS_ORIGIN=http://localhost:5174
```

#### Frontend (.env)

Create `frontend/.env` file:

```env
VITE_API_URL=http://localhost:8001
```

### 3. Start the Development Servers

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

Server runs on `http://localhost:8001`

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

Application runs on `http://localhost:5174`

### 4. Test Credentials

| Role  | Email                   | Password |
| ----- | ----------------------- | -------- |
| Admin | admin@villageconnect.in | admin123 |

## 📁 Project Structure

```
Village-Connect/
├── backend/
│   ├── src/
│   │   ├── routes/              # API endpoints
│   │   │   ├── auth.js          # Authentication endpoints
│   │   │   ├── jobs.js          # Job listings & applications
│   │   │   ├── agriculture.js   # Agriculture services
│   │   │   ├── healthcare.js    # Healthcare services
│   │   │   ├── education.js     # Education programs
│   │   │   ├── environmental.js # Environmental awareness content
│   │   │   ├── grievances.js    # Grievance management
│   │   │   └── dashboard.js     # Dashboard statistics
│   │   ├── lib/
│   │   │   ├── db/              # Database layer
│   │   │   │   ├── connection.js    # MongoDB connection
│   │   │   │   ├── models.js       # Mongoose schemas
│   │   │   │   ├── adapter.js      # Drizzle-compatible adapter
│   │   │   │   └── index.js        # Main export
│   │   │   ├── auth.js          # JWT & auth middleware
│   │   │   └── logger.js        # Logging configuration
│   │   ├── app.js               # Express app setup
│   │   └── index.js             # Server entry point
│   ├── package.json
│   ├── .env                     # Environment variables
│   └── build.mjs                # ESBuild configuration
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/          # Page layouts
│   │   │   ├── ui/              # Reusable UI components
│   │   │   └── mockups/         # Mock components
│   │   ├── pages/               # Route pages
│   │   │   ├── home.jsx
│   │   │   ├── login.jsx
│   │   │   ├── register.jsx
│   │   │   ├── dashboard.jsx
│   │   │   ├── jobs.jsx
│   │   │   ├── agriculture.jsx
│   │   │   ├── healthcare.jsx
│   │   │   ├── education.jsx
│   │   │   ├── environmental.jsx
│   │   │   ├── environmental-detail.jsx
│   │   │   ├── grievances.jsx
│   │   │   └── [more pages...]
│   │   ├── hooks/               # Custom React hooks
│   │   ├── lib/
│   │   │   ├── api-client/      # React Query hooks
│   │   │   └── utils.ts         # Utility functions
│   │   ├── App.jsx              # Main app component
│   │   └── main.jsx             # Entry point
│   ├── package.json
│   ├── .env                     # Environment variables
│   ├── vite.config.js           # Vite configuration
│   └── index.html               # HTML entry point
│
├── package.json                 # Root package config
└── README.md                    # This file
```

## 🔑 Key Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get authenticated user

### Jobs

- `GET /api/jobs` - List all jobs
- `POST /api/jobs` - Create job (provider/admin only)
- `GET /api/jobs/:id` - Get job details
- `PATCH /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### Agriculture

- `GET /api/agriculture` - List agriculture content
- `POST /api/agriculture` - Create agriculture content

### Healthcare

- `GET /api/healthcare` - List healthcare services
- `POST /api/healthcare` - Create healthcare service

### Education

- `GET /api/education` - List education programs
- `POST /api/education` - Create education program

### Environmental Awareness

- `GET /api/environmental` - List environmental content
- `POST /api/environmental` - Create environmental content (provider/admin only)
- `GET /api/environmental/:id` - Get environmental content details
- `PATCH /api/environmental/:id` - Update environmental content
- `DELETE /api/environmental/:id` - Delete environmental content

### Grievances

- `GET /api/grievances` - List grievances
- `POST /api/grievances` - Submit grievance
- `GET /api/grievances/:id` - Get grievance details
- `PATCH /api/grievances/:id` - Update grievance status (admin only)

### Dashboard

- `GET /api/dashboard/summary` - Get dashboard statistics

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Register** - Create a new account (role: villager, provider, or admin)
2. **Login** - Receive a JWT token valid for 7 days
3. **Authenticated Requests** - Include `Authorization: Bearer <token>` header

## 👥 User Roles

- **Villager** - Access services, submit grievances
- **Provider** - Post jobs, agriculture tips, healthcare services, education programs
- **Admin** - Full system access, manage grievances, view statistics

## 🗄️ Database

MongoDB Atlas is used as the database with the following collections:

- **Users** - User accounts and profiles
- **Jobs** - Job listings
- **Agriculture** - Agriculture content and services
- **Healthcare** - Healthcare services and information
- **Education** - Education programs and courses
- **Environmental** - Environmental awareness and sustainability content
- **Grievances** - Community grievances and resolutions

## 📦 Available Scripts

### Backend

```bash
npm run build    # Build the project
npm run dev      # Start in development mode
npm run start    # Run production build
```

### Frontend

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Verify `MONGO_URI` is correct in `.env`
- Ensure MongoDB Atlas network access includes your IP
- Check that credentials are properly encoded

### Port Already in Use

- Backend: Change `PORT` in `.env` (default: 8001)
- Frontend: Update `VITE_PORT` in `.env`

### CORS Errors

- Ensure `CORS_ORIGIN` in backend `.env` matches frontend URL
- Default: `http://localhost:5174`

### Missing Dependencies

```bash
# Reinstall dependencies
cd backend
npm install

cd ../frontend
npm install
```

## 📝 Environment Variables

### Backend (.env)

```env
NODE_ENV=development              # Environment mode
PORT=8001                         # Server port
MONGO_URI=<connection_string>     # MongoDB Atlas URI
JWT_SECRET=<secret_key>           # JWT signing key
JWT_EXPIRY=7d                     # Token expiration time
CORS_ORIGIN=http://localhost:5174 # Allowed frontend origin
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8001 # Backend API URL
```

## 🚀 Deployment

### Frontend (Vercel, Netlify, GitHub Pages)

```bash
npm run build
# Deploy the dist/ folder
```

### Backend (Heroku, Railway, AWS)

```bash
# Set environment variables on hosting platform
# Deploy with appropriate buildpack
```

### Database

Use MongoDB Atlas for cloud database or deploy MongoDB server on your platform.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues, feature requests, or questions, please open an issue on GitHub or contact the development team.

---

**Happy coding!** 🎉
