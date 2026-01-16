# React To-Do List (Vite) 📝

A simple To-Do List application built with React and Vite.  
The project demonstrates CRUD operations, task search, state management via Context API, and interaction with a mock backend using JSON Server.

---

## 🚀 Features

- Add new tasks
- Delete a single task
- Delete all tasks
- Mark tasks as completed using a checkbox
- Search tasks by title
- Persist tasks via backend (JSON Server)
- Custom React hooks
- Input validation without third-party libraries
- Fast development build powered by Vite

---

## 🛠️ Technologies Used

- React
- Vite
- JavaScript (ES6+)
- React Hooks
- Context API
- JSON Server
- Fetch API
- HTML5
- CSS3

---

## 📦 Installation & Run

1. Clone the repository:
```bash
git clone https://github.com/Roman-Bilichenko/react-todo-app
```

2. Go to the project directory:
```bash
cd react-todo-app
```

3. Install dependencies:
```bash
npm install
```
 4. The project uses JSON Server as a mock backend.
    Start the server:
```bash
npx json-server --watch db.json --port 3001
```
 5. API will be available at:
 ```bash
 http://localhost:3001/tasks
 ```

 6. Start the React app:
 ```bash
 npm run dev
 ```


The application will be available at:
👉 http://localhost:5173


🔌 Tasks API

The project uses a separated API layer:

- getAll() — fetch all tasks

- add(task) — create a new task

- delete(id) — delete task by id

- deleteAll(tasks) — delete all tasks

- toggleComplete(id, isDone) — update task completion status