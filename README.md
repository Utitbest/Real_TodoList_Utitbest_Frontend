# Real TodoList Frontend — Utitbest

This is the frontend interface for the Real TodoList application. It provides a clean, interactive UI for creating, managing, completing, and reordering tasks. The frontend communicates with a Node.js backend hosted on Railway and uses a Neon PostgreSQL database.

---

## 🎨 Features

- Add new tasks
- Mark tasks as completed or active
- Delete all completed tasks
- Drag-and-drop task reordering
- Real-time updates synced with backend API
- Fully responsive UI

---

## 🛠 Tech Stack

- **Vite** (Frontend tooling)
- **React**
- **Tailwind CSS**
- **Railway** (Backend hosting)
- **Neon** (Database)
- **Netlify**

---

## 📦 Installation

Clone the project:

```bash
git clone https://github.com/your-username/real-todolist-frontend.git
cd real-todolist-frontend
npm install


▶️ Running Locally
Start the development server:

npm run dev
Your app will be available at:

http://localhost:5173


🌐 Connecting to the Backend
Update your API base URL inside your frontend code:

const API_BASE = "https://your-backend-url.up.railway.app";

Example:

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server:{
    proxy:{
      "/todo":{
        target: "https://realtodolistutitbestbackend-production.up.railway.app/", //production mode or yur local backend url
        changeOrigin: true,
        secure: false
      }
    }
  }
})

use it like this:
await fetch(/todo){
  fetch from backend in your frontend;
}  

🚀 Deployment
You can deploy this frontend to any static hosting provider:

Netlify

Vercel

GitHub Pages

Cloudflare Pages

Just build the project:

npm run build
Then upload the dist/ folder to your hosting provider.

🧠 Author
Built by Utitbest
Location: Uyo, Akwa Ibom State, Nigeria Year: 2025
