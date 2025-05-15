# 🧠 Agent Management System

This is a MERN stack application to manage agents, allowing admin login, agent creation, and CSV upload & distribution.

## 📦 Features

- JWT-based Admin Authentication
- Add Agent (Name, Email, Mobile, Password)
- Upload and distribute CSV data among agents
- View assigned data
- Fully responsive UI

## 🛠️ Tech Stack

- **Frontend:** React, Axios, Tailwind (optional)
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT
- **CSV Handling:** Multer, CSV-Parser

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js
- MongoDB (local or Atlas)
- npm / yarn

### 1. Clone Repository

```bash
git clone https://github.com/Ammanya/agent-management-system
cd mern-machine-test

2. Backend Setup

cd backend
npm install
cp .env.example .env
⚠️ Now open the .env file and add the following environment variables:

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key

npm run dev

3. Frontend Setup

cd frontend
npm install
npm start

🧪 API Routes (Sample)
POST /api/agents
json

{
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "9876543210",
  "password": "secret123"
}
POST /api/auth/login
json

{
  "email": "admin@example.com",
  "password": "admin123"
}



