
# 📚 Student Task Manager

## 1. Project Title & Goal
A full-stack Single Page Application (SPA) built with React, Express, and SQLite that allows students to persistently add and view homework tasks with real-time UI updates and no page reloads, running entirely on a local machine.

---

## 2. Setup Instructions

> ⚠️ This project runs **entirely locally** and does **not use any external APIs**.
>
#### Prerequisites

>Node.js v18+

>npm

### Backend Setup
```bash
cd backend
npm install
node server.js
````

The backend server will start at:

```
http://localhost:5000
```

> ℹ️ The SQLite database file (tasks.db) is automatically created on server startup, so no manual database setup is required.

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at:

```
http://localhost:5173
```

---

## 3. The Logic (How I Thought)

### Why did I choose this approach?

* I intentionally used **React** instead of plain HTML/JavaScript to demonstrate component-based UI development and scalable state management, even for a simple problem.
* React enables true SPA behavior, ensuring the task list updates instantly without page reloads.
* The backend is built with **Express** and exposes minimal REST endpoints (add task, list tasks) to clearly separate data handling from UI logic.
* I chose **SQLite** over a JSON file because it provides structured, reliable local persistence, avoids file-write race conditions, and scales better if filtering or task metadata is added later.
* After every task creation, the frontend re-fetches the task list to keep the UI state fully synchronized with the database.

### Hardest bug I faced & how I fixed it

The most challenging issue was handling task **timestamps** consistently across the backend and frontend.
Initially, newly added tasks displayed incorrect or invalid “time ago” values due to improper date parsing on the frontend.

**How I fixed it:**

* Ensured timestamps were generated using `CURRENT_TIMESTAMP` in SQLite
* Properly parsed the timestamp on the frontend
* Implemented a custom `timeAgo()` utility with edge-case handling

---

## 4. Output Screenshots

### Home Page Showing Added Tasks

![Student Task Manager Screenshot](screenshots/home1.png)

> The screenshot shows a list of **at least 3 tasks**, as required in the problem statement.

### AllTasks Page Showing All Tasks

![Student Task Manager Screenshot](screenshots/alltasks.png)

> The screenshot shows a list of **all tasks**,

---

## 5. Future Improvements

If I had 2 more days, I would:

* Add task completion status (mark as done / pending)
* Enable editing existing tasks
* Implement stronger input validation and inline user feedback
* Improve backend error handling and API response consistency
* Add pagination or lazy loading for large task lists
* Deploy the application for easier access and demonstration
