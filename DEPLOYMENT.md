# Deployment Guide

This guide provides instructions on how to deploy the CredCheck project, including both the backend and frontend.

## Prerequisites

- A MongoDB database (e.g., [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- An SMTP server for sending emails (e.g., Gmail, SendGrid, or Mailtrap)
- A hosting provider for the backend (e.g., [Render](https://render.com), [Railway](https://railway.app))
- A hosting provider for the frontend (e.g., [Vercel](https://vercel.com), [Netlify](https://netlify.com))

---

## Backend Deployment

The backend is a Node.js Express application.

### 1. Environment Variables

Set the following environment variables on your hosting platform:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | The port the server will run on | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret for JWT signing | `your_jwt_secret_key` |
| `CLIENT_URL` | Frontend URL (for CORS) | `https://your-frontend.vercel.app` |
| `FRONTEND_URL` | Frontend URL (for email links) | `https://your-frontend.vercel.app` |
| `EMAIL_HOST` | SMTP host | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP port | `587` |
| `EMAIL_USER` | SMTP username | `your-email@gmail.com` |
| `EMAIL_PASS` | SMTP password/App password | `your-app-password` |
| `EMAIL_FROM` | Sender email address | `"CredCheck" <your-email@gmail.com>` |
| `NODE_ENV` | Environment mode | `production` |

### 2. Deployment Steps (Example: Render)

1. Create a new **Web Service** on Render.
2. Connect your GitHub repository.
3. Set the **Root Directory** to `backend`.
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add the environment variables listed above.

---

## Frontend Deployment

The frontend is a React application built with Vite.

### 1. Environment Variables

Set the following environment variable on your hosting platform:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | URL of the backend API | `https://your-backend.onrender.com/api` |

### 2. Deployment Steps (Example: Vercel)

1. Create a new project on Vercel.
2. Connect your GitHub repository.
3. Vercel should automatically detect the Vite project.
4. Set the **Root Directory** to `frontend`.
5. In the **Build and Output Settings**, ensure:
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add the `VITE_API_URL` environment variable.
7. Click **Deploy**.

---

## Local Development

To run the project locally:

### Backend
1. Navigate to the `backend` directory.
2. Create a `.env` file with the variables mentioned above.
3. Run `npm install`.
4. Run `npm run dev`.

### Frontend
1. Navigate to the `frontend` directory.
2. Create a `.env` file with `VITE_API_URL=http://localhost:3000/api`.
3. Run `npm install`.
4. Run `npm run dev`.
