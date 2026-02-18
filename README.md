# Tailoring Management System

A modern, production-ready frontend-only React application for managing tailoring shop operations.

## Features

- **Role-Based Authentication** (Admin & Customer)
- **Admin Dashboard** with statistics
- **Customer Management** with measurements
- **Customer Portal** with order tracking
- **Protected Routes**
- **Modern UI** with Tailwind CSS
- **Fully Responsive Design**

## Tech Stack

- React 18
- Vite
- React Router DOM v6
- Tailwind CSS
- LocalStorage for state persistence

## Installation

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Login Credentials

### Admin (Tailor)
- Username: `admin`
- Password: `admin123`

### Customer
- Username: `customer`
- Password: `customer123`

## Project Structure

```
src/
├── components/       # Reusable components
├── layouts/         # Layout components (AdminLayout)
├── pages/           # Page components
│   ├── Login.jsx
│   ├── AdminDashboard.jsx
│   ├── AddCustomer.jsx
│   └── CustomerDashboard.jsx
├── App.jsx          # Main app with routing
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## Features Overview

### Admin Side
- Dashboard with statistics (Total Customers, Orders, Pending, Completed)
- Add Customer form with full measurements
- Customer list table
- Sidebar navigation
- Logout functionality

### Customer Side
- Order status tracking
- Delivery date information
- Order timeline
- Clean, modern interface

## Notes

- This is a frontend-only application
- No backend or database integration
- Uses localStorage for authentication state
- All data is stored in component state (dummy data)
- Perfect for prototyping and demonstrations
