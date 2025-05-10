# DevConnector 🧑‍💻

A full-stack MERN social network app for developers. Create a profile, share posts, connect with others — basically LinkedIn without the corporate bloat.

**Live Demo:** [https://dev-connector-4bcv.onrender.com](https://dev-connector-4bcv.onrender.com)

---

## 🚀 Tech Stack

- **Frontend:** React, Redux, React Router  
- **Backend:** Node.js, Express  
- **Database:** MongoDB Atlas  
- **Authentication:** JWT  

---

## ✨ Features

- User registration and login (JWT)  
- Create and manage developer profiles  
- Add experience and education  
- Make public posts, like & comment  
- Fully functional React frontend served via Express
- Email Sending/integration (Disabled due to free tier limitations, general token to use - 123456)

---

## 📦 Getting Started

### Clone the repo

```bash
git clone https://github.com/amaan-q00/Dev-Connector.git
cd Dev-Connector
```

### Install dependencies

```bash
npm install
cd client
npm install
cd ..
```

### Set up environment variables

Create a `.env` file in the root directory:

```env
PORT=2000
CLOUD_NAME=my-cloud-name
CLOUD_API_KEY=my-cloud-apikey
CLOUD_API_SECRET=my-cloud-api-secret
DBURL=my-dburl
SENDGRID_API_KEY=blah-blah
MAIL=mytest@gmail.com
GIT_ID=my-git-id
GIT_SECRET=my-git-secret
```

### Run the dev server

```bash
npm run dev
```

Frontend: `http://localhost:3000`  
Backend API: `http://localhost:5000/api`

### Build frontend for production

```bash
cd client
npm run build
```

---

## 📁 Folder Structure

```
Dev-Connector/
├── client/             # React frontend
├── config/             # DB config
├── middleware/         # Auth middleware
├── models/             # Mongoose schemas
├── routes/api/         # Express API routes
├── utils/              # Utilities (email utils bypassed)
├── server.js           # Express server entry point
└── .env                # Your environment variables (ignored in git)
```

---

## ✅ TODO

- Admin panel  
- Real-time chat  
- Test coverage 
- Email Integration with actual domain 
- UI and UX Enhancements
