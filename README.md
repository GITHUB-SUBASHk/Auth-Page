Auth-Page: Dockerized Authentication System with FastAPI & React 🚀

📌 Overview
Auth-Page is a full-stack authentication platform built using FastAPI (Backend) and React (Frontend), fully containerized using Docker Compose.
It includes email verification, JWT authentication, password reset via OTP, and product management API.
Everything runs seamlessly with MailHog for local email testing.

✨ Features
✅ User Registration with Email Verification
✅ JWT-based Login & Authentication
✅ Password Reset via OTP
✅ Set Password from Secure Email Link
✅ Product CRUD API (extendable for any resource)
✅ SQLite Database (shared via Docker volume)
✅ Fully Dockerized — one command to run everything
✅ MailHog Integration — test emails without a real mail server
✅ CORS Configured for smooth frontend-backend communication

🏗 Tech Stack
Frontend: React + Axios + Bootstrap
Backend: FastAPI + Pydantic + SQLAlchemy
Database: SQLite (volume-based persistence)
Email Testing: MailHog
Containerization: Docker & Docker Compose

⚡ Quick Start

1️⃣ Clone Repository
bash
Copy
Edit
git clone https://github.com/your-username/Auth-Page.git
cd Auth-Page

2️⃣ Set Environment Variables
Backend (backend/.env)
env
Copy
Edit
DATABASE_URL=sqlite:///./app/db/database.db
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
Frontend (frontend/.env)
env
Copy
Edit
REACT_APP_API_BASE_URL=http://<your-server-ip>:8000/api

3️⃣ Start Services
bash
Copy
Edit
docker-compose up --build
Frontend: http://localhost:3000
Backend API Docs: http://localhost:8000/docs
MailHog UI: http://localhost:8025

📧 Email Testing with MailHog
All outgoing emails are captured by MailHog for testing:
SMTP: localhost:1025
Web UI: http://localhost:8025

🔒 Security Notes
Do not use MailHog in production.
Replace SQLite with PostgreSQL/MySQL for production use.
Use HTTPS in production and store secrets in a secure vault.

🚀 Just finished building Auth-Page, a full-stack authentication system with FastAPI + React, fully containerized with Docker!
✅ Email verification
✅ JWT authentication
✅ Password reset via OTP
✅ MailHog integration for easy testing

All with one command to spin up backend, frontend, and email testing tools.
#FastAPI #ReactJS #Docker #Authentication #WebDevelopment #FullStack
