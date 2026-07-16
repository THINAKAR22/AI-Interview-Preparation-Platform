# 🤖 AI Interview Preparation Platform

An AI-powered interview preparation platform that helps users improve their technical and behavioral interview skills through coding challenges, AI-generated interview questions, mock interviews, and performance tracking.

## 🚀 Features

- 🔐 User Authentication (Login & Register)
- 👤 User Dashboard
- 💻 Coding Arena
- 🧠 AI-Generated Interview Questions
- 🎤 Mock Interview Preparation
- 📊 Progress Tracking
- 📚 Interview Resources
- 🌙 Responsive Modern UI
- ⚡ Fast and Interactive Experience

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### AI
- OpenAI API / Gemini API *(Update according to your project)*

### Authentication
- JWT
- bcrypt

---

## 📂 Project Structure

```
AI-Interview-Preparation-Platform/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/AI-Interview-Preparation-Platform.git
```

Move into the project

```bash
cd AI-Interview-Preparation-Platform
```

---

### Install Frontend

```bash
cd client
npm install
npm run dev
```

---

### Install Backend

```bash
cd server
npm install
npm run dev
```

---

## 🔑 Environment Variables

Copy the example files and fill in the values:

```bash
copy server\\.env.example server\\.env
copy client\\.env.example client\\.env
```

The backend uses `MONGO_URI` (not `MONGODB_URI`). The frontend's
`VITE_API_URL` must end in `/api`. This project is configured to use
`https://ai-interview-preparation-platform-dh6d.onrender.com/api`.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

If using Gemini:

```env
GEMINI_API_KEY=your_api_key
```

---

## Deploy on Render

This repository includes [render.yaml](render.yaml), which creates both the
Node API and an optional Render Static Site for the React frontend.

1. Push this repository to GitHub and choose **New + → Blueprint** in Render.
2. Select the repository. Render reads `render.yaml` and creates the services.
3. For **ai-interview-api**, set `MONGO_URI` to your MongoDB Atlas connection
   string. Allow Render's network in Atlas (or add the appropriate IP access
   rule). Render generates `JWT_SECRET` automatically.
4. The frontend is already configured to call
   `https://ai-interview-preparation-platform-dh6d.onrender.com/api`.
5. After the frontend deploys, set the API's `CLIENT_URL` to its exact public
   URL (for example, `https://ai-interview-frontend.onrender.com`) and redeploy
   the API.
6. Confirm `https://<your-api>.onrender.com/api/health` returns a JSON health
   response.

If the frontend is hosted on Vercel or Netlify instead, deploy only the API
service and use that site's URL for `CLIENT_URL`. For Google Sign-In, set
`VITE_GOOGLE_CLIENT_ID` and add the deployed frontend domain to the OAuth
client's authorized JavaScript origins in Google Cloud.

---

## 📸 Screenshots

Add screenshots here.

Example:

```
Home Page

Dashboard

Coding Arena

Mock Interview
```

---

## 🎯 Future Improvements

- AI Voice Interview
- Resume Analyzer
- Company-wise Interview Questions
- Video Mock Interviews
- AI Feedback System
- Leaderboard
- Interview Analytics
- Dark Mode
- Notifications

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push to GitHub

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**THINAKAR K**

GitHub: https://github.com/THINAKAR22

LinkedIn: *(Add your LinkedIn profile)*

---

## ⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub. It helps others discover the project and motivates future development.
