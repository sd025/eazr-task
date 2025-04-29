📂 Repository Structure
``` bash 
eazr-task/
├── frontend/       # Frontend (React, Vite, TypeScript, Tailwind, ShadCN UI)
├── backend/       # Backend (Node.js, Express, MongoDB, Mongoose, JWT)
└── README.md
``` 

🌐 Live Demo
https://eazr-task.onrender.com/

🛠️ Tech Stack
Frontend: React 19, Vite, TypeScript, Tailwind CSS, ShadCN UI, MUI DataGrid, React Hot Toast

Backend: Node.js, Express.js, MongoDB Atlas, Mongoose, JSON Web Tokens (JWT)

⚙️ Setup Instructions
1. Clone
``` bash 
git clone https://github.com/sd025/eazr-task.git
cd eazr-task
``` 

2. Backend
``` bash 
cd backend
npm install
npm run dev
```

Create .env in server/:
``` bash 
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
``` 

3. Frontend
``` bash 
cd frontend
npm install
npm run dev
```
Open http://localhost:3000 in your browser.

🔌 API Documentation
Auth
POST /api/auth/signup
Body: { name, email, password }

POST /api/auth/login
Body: { email, password }

Tasks (JWT in Authorization: Bearer <token> header)
GET /api/tasks

POST /api/tasks
Body: { title, description, status, dueDate }

PUT /api/tasks/:id
Body: any of { title, description, status, dueDate }

DELETE /api/tasks/:id

🧠 Approach & Challenges
Modular Architecture: Separate frontend/ and backend/, clear folders for routes, controllers, models, components.

State Management: Simple useState/useEffect, no global context.

API Layer: Centralized Axios instances with interceptors for auth.

Responsive UI: Tailwind + MUI DataGrid → usable on mobile & desktop.


Trade-offs:

Kept state management minimal rather than introducing Redux or Context.
