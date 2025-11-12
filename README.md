# HireWise Frontend

## Project Overview

HireWise is a modern Resume Screener application that revolutionizes the hiring process. The frontend provides an intuitive user interface for job seekers and recruiters to manage resumes, applications, and screening processes efficiently.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Deployment**: Vercel

## Features Implemented

### 🎨 User Interface
- Modern, responsive design with Tailwind CSS
- Clean and intuitive navigation
- Mobile-first responsive layout
- Professional color scheme and typography

### 🔐 Authentication System
- User registration with form validation
- Secure login functionality
- JWT token management
- Protected routes and authentication guards
- Automatic token storage and retrieval

### 🧭 Navigation & Routing
- Dynamic navigation bar with authentication state
- Protected dashboard routes
- Smooth page transitions
- User-friendly URL structure

### 📱 Pages Implemented
- **Landing Page**: Hero section with features showcase
- **Signup Page**: User registration with validation
- **Login Page**: User authentication
- **Dashboard**: Protected user dashboard (placeholder)

### 🛡️ Security Features
- Client-side form validation
- Secure token storage in localStorage
- Automatic authentication state management
- Protected route components

## Project Structure

```
hirewise-frontend/
├── public/
│   └── vite.svg           # App favicon
├── src/
│   ├── components/
│   │   └── Navbar.jsx     # Navigation component
│   ├── pages/
│   │   ├── Home.jsx       # Landing page
│   │   ├── Login.jsx      # Login page
│   │   ├── Signup.jsx     # Registration page
│   │   └── Dashboard.jsx  # User dashboard
│   ├── utils/
│   │   ├── api.js         # API configuration
│   │   └── auth.js        # Authentication utilities
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # App entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies
└── vite.config.js         # Vite configuration
```

## Key Components

### Authentication Flow
1. User registers/logs in through forms
2. JWT token received from backend
3. Token stored in localStorage
4. Protected routes check authentication
5. User redirected to dashboard on success

### API Integration
- Centralized API configuration with Axios
- Base URL configuration for backend
- Request/response interceptors
- Error handling for API calls

### Responsive Design
- Mobile-first approach
- Tailwind CSS utility classes
- Flexible grid layouts
- Responsive navigation

## Environment Configuration

```env
VITE_API_BASE_URL=https://hirewise.up.railway.app
```

## Installation & Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables
4. Start development server: `npm run dev`
5. Build for production: `npm run build`

## Styling Approach

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Reusable UI components
- **Responsive Design**: Mobile-first responsive layouts
- **Color Scheme**: Professional blue and gray palette

## Future Enhancements

- Resume upload and parsing
- Advanced screening algorithms
- Real-time notifications
- Admin dashboard for recruiters
- Interview scheduling system
- Analytics and reporting

## Deployment

The frontend is deployed on Vercel with automatic deployments from the main branch.

**Live Frontend Application**: https://hirewisefrontend.vercel.app

**Backend API**: https://hirewise.up.railway.app