# Portfolio Website

A production-ready fullstack portfolio website built with Next.js 15 and Express.js.

---

## Project Structure

```
portfolio-website/
├── app/                          # Next.js App Router pages
├── components/                   # Frontend components
│   ├── ui/                       # Primitive design system components
│   ├── layout/                   # Navbar, Footer, Container
│   ├── sections/                 # Page section components
│   └── common/                   # Shared widgets
├── lib/                          # Utility and data modules
├── types/                        # TypeScript interfaces
├── .env.local                    # Frontend environment variables
│
└── backend/                      # Express.js REST API Backend
    ├── src/
    │   ├── config/db.js           # MongoDB connection
    │   ├── controllers/           # Request handlers
    │   ├── middlewares/           # Validation & error handling
    │   ├── models/Contact.js      # Mongoose schema
    │   ├── routes/                # API routes
    │   ├── utils/sendEmail.js     # Nodemailer helper
    │   └── app.js                 # Express app factory
    ├── server.js                  # Server entry point
    ├── .env.example               # Environment template
    └── README.md                  # Backend documentation
```

---

## Quick Start — Development

### 1. Frontend (Next.js)

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev
```

### 2. Backend (Express.js)

```bash
cd backend

# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env

# Start backend server (http://localhost:5000)
npm run dev
```

---

## Environment Variables

### Frontend — `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend — `backend/.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio_db
FRONTEND_URL=http://localhost:3000,http://localhost:3001
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_RECEIVER=your-email@gmail.com
```

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/health` | Server health status |
| POST | `/api/contact` | Submit contact form |

---

## Email Configuration (Gmail)

1. Enable **2-Factor Authentication** in your Google account.
2. Create an **App Password** at `myaccount.google.com/apppasswords`.
3. Set `EMAIL_USER` to your Gmail and `EMAIL_PASS` to the App Password.

---

## MongoDB Setup

**Option 1 — Local:**
Install [MongoDB Community Server](https://www.mongodb.com/try/download/community) and start:
```bash
mongod --dbpath C:/data/db
```

**Option 2 — MongoDB Atlas (Recommended for production):**
1. Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com).
2. Set `MONGODB_URI` to your Atlas connection string.

---

## Deployment to Vercel + Render

### Frontend → Vercel
```bash
# Push to GitHub, connect to Vercel
# Add environment variable in Vercel Dashboard:
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

### Backend → Render
```bash
# Push backend folder to a separate GitHub repo
# Create a new Render Web Service pointing to server.js
# Add all environment variables in Render Dashboard
```
