# Portfolio Backend Service

Express.js + MongoDB backend service supporting the portfolio website (`Sohail.dev`).

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Validation**: Express-Validator
- **Email**: Nodemailer (SMTP / Gmail)
- **Security**: CORS

---

## Directory Structure
```
backend/
├── src/
│   ├── config/          # Database connection
│   ├── controllers/     # Route logic handlers (contact, health)
│   ├── middlewares/     # Validation & error handling
│   ├── models/          # Mongoose data schemas (Contact)
│   ├── routes/          # API route definitions
│   ├── utils/           # Helper scripts (sendEmail)
│   └── app.js           # Express app setup
├── server.js            # Server entry point
├── .env.example         # Environment variables template
├── package.json
└── README.md
```

---

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your details:
```bash
cp .env.example .env
```

`.env` configuration example:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio_db
FRONTEND_URL=http://localhost:3000,http://localhost:3001
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_RECEIVER=your-email@gmail.com
```

### 3. Run Development Server
```bash
npm run dev
```

The server will start on `http://localhost:5000`.

---

## API Reference

### Health Check
- **GET** `/api/health`
- **Response**:
```json
{
  "success": true,
  "status": "OK",
  "message": "Backend server is running smoothly",
  "timestamp": "2026-08-02T20:26:00.000Z",
  "uptime": 14.5
}
```

### Contact Form Submission
- **POST** `/api/contact`
- **Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I would like to discuss a project..."
}
```
- **Success Response (201 Created)**:
```json
{
  "success": true,
  "message": "Thank you! Your message has been sent successfully.",
  "data": {
    "_id": "64d2f...",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "Hello...",
    "createdAt": "2026-08-02T20:26:00.000Z"
  }
}
```
- **Validation Error Response (400 Bad Request)**:
```json
{
  "success": false,
  "message": "Please provide a valid email address",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```
