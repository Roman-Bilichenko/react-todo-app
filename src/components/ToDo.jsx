import { useEffect, useState } from "react";
import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import ToDoInfo from "./ToDoInfo";
import TodoList from "./TodoList";

const ToDo = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [
      { id: "task-1", title: "by the milk", isDone: false },
      { id: "task-2", title: "by the berry", isDone: true },
    ];
  });

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const deleteAllTasks = () => {
    const isCorfirmed = confirm("Are you sure you want to delete all tasks?");

    if (isCorfirmed) {
      setTasks([]);
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskComplete = (taskId, isDone) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isDone };
        }
        return task;
      })
    );
  };

  const addTask = () => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false,
      };

      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      setSearchQuery("");
    }
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const clearSearchQuery = searchQuery.trim().toLowerCase();
  const filteredTasks =
    clearSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
          title.toLowerCase().includes(clearSearchQuery)
        )
      : null;

  return (
    <div>
      <div className="todo">
        <h1 className="todo__title">To Do List</h1>
        <AddTaskForm
          addTask={addTask}
          newTaskTitle={newTaskTitle}
          setNewTaskTitle={setNewTaskTitle}
        />
        <SearchTaskForm
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <ToDoInfo
          total={tasks.length}
          done={tasks.filter(({ isDone }) => isDone).length}
          onDeleteAllButtonClick={deleteAllTasks}
        />
        <TodoList
          filteredTasks={filteredTasks}
          tasks={tasks}
          onDeleteTaskButtonClick={deleteTask}
          onTaskCompleteChange={toggleTaskComplete}
        />
      </div>
    </div>
  );
};

export default ToDo;
