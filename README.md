# 📋 Task Management System

A modern, full-stack MERN Task Management application built with **React**, **Node.js**, **Express**, and **MongoDB**. Designed for seamless task tracking, organization, and status management with a responsive interface.

---

## ✨ Features

- **Create Tasks**: Add tasks with title, description, and due date.
- **View & List Tasks**: Real-time display of all stored tasks sorted by creation date.
- **Edit Tasks**: Modify title, description, and due dates effortlessly.
- **Status Toggling**: Instantly switch tasks between *Pending* and *Completed*.
- **Filter Tasks**: Filter task views by:
  - **All**
  - **Completed**
  - **Pending**
- **Delete Tasks**: Remove completed or redundant tasks with one click.
- **Resilient Storage Architecture**: Uses MongoDB with automatic persistent local file fallback (`data/tasks.json`) if MongoDB is unavailable.
- **One-Command Dev Workflow**: Run both frontend and backend concurrently from the root directory.

---

## 🛠️ Tech Stack

### Frontend
- **React 19**
- **Vite** (Next-generation frontend tooling)
- **Axios** (Promise-based HTTP client)
- Modern Vanilla CSS styling

### Backend
- **Node.js**
- **Express 5**
- **MongoDB** & **Mongoose 9**
- **Cors** & **Dotenv**
- **Nodemon** (Dev server hot reloading)

### Deployment & Tooling
- **Concurrently** (Unified dev environment)
- **Docker** & **Docker Compose**

---

## 📁 Project Structure

```bash
TaskManagerApp/
├── backend/
│   ├── controllers/
│   │   └── taskController.js    # Task business logic & CRUD handlers
│   ├── models/
│   │   └── Task.js              # Mongoose schema & resilient data layer
│   ├── routes/
│   │   └── taskRoutes.js        # Express API routes
│   ├── .env.example             # Backend environment template
│   ├── Dockerfile               # Backend Docker container config
│   ├── package.json             # Backend dependencies & scripts
│   └── server.js                # Express server entry point
├── frontend/
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── assets/              # Icons & images
│   │   ├── App.jsx              # Main React application component
│   │   ├── index.css            # Global styles
│   │   └── main.jsx             # React DOM entry point
│   ├── Dockerfile               # Frontend Docker container config
│   ├── index.html               # Main HTML entry
│   ├── package.json             # Frontend dependencies & scripts
│   └── vite.config.js           # Vite configuration
├── docker-compose.yml           # Multi-container orchestration
├── package.json                 # Root script runner for concurrent dev
├── .gitignore                   # Git ignore rules
└── README.md                    # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (v9 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local Server or MongoDB Atlas connection string)

---

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Varma558/Task-Management-System.git
   cd Task-Management-System
   ```

2. **Install all dependencies:**
   You can install all root, backend, and frontend dependencies with:
   ```bash
   npm install
   ```
   *(Or individually inside `backend/` and `frontend/` using `npm install`)*

3. **Configure Environment Variables:**
   In the `backend/` directory, create a `.env` file (you can copy from `.env.example`):
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/tasks
   ```
   > **Note:** If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

---

## 💻 Running the Application

### Option 1: Run Concurrently from the Root (Recommended)

Start both backend and frontend servers simultaneously with a single command:
```bash
npm run dev
```
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

---

### Option 2: Run Backend and Frontend Separately

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

---

### Option 3: Run with Docker Compose

If Docker is installed on your system:
```bash
docker-compose up --build
```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Request Body Example |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/tasks` | Fetch all tasks | *None* |
| **POST** | `/api/tasks` | Create a new task | `{"title": "Task", "description": "Details", "dueDate": "2026-10-25"}` |
| **PUT** | `/api/tasks/:id` | Update task details or toggle status | `{"completed": true}` or `{"title": "Updated"}` |
| **DELETE** | `/api/tasks/:id` | Delete a task by ID | *None* |

---

## 👤 Author

- **Varma** - [GitHub Profile](https://github.com/Varma558)