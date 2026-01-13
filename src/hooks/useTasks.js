import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import useTasksLocaleStorage from "./useTasksLocaleStorage";

const useTasks = () => {
  const { savedTasks, saveTasks } = useTasksLocaleStorage();

  const [tasks, setTasks] = useState(
    savedTasks ?? [
      { id: "task-1", title: "by the milk", isDone: false },
      { id: "task-2", title: "by the berry", isDone: true },
    ]
  );

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const newTaskInputRef = useRef(null);

  const deleteAllTasks = useCallback(() => {
    const isCorfirmed = confirm("Are you sure you want to delete all tasks?");

    if (isCorfirmed) {
      setTasks([]);
    }
  }, []);

  const deleteTask = useCallback(
    (taskId) => {
      setTasks(tasks.filter((task) => task.id !== taskId));
    },
    [tasks]
  );

  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
      setTasks(
        tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, isDone };
          }
          return task;
        })
      );
    },
    [tasks]
  );

  const addTask = useCallback(
    (title) => {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title,
        isDone: false,
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskTitle("");
      setSearchQuery("");
      newTaskInputRef.current.focus();
    },
    []
  );

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    newTaskInputRef.current.focus();
  }, []);

  // const filteredTasks = useMemo(() => {
  //   const clearSearchQuery = searchQuery.trim().toLowerCase();

  //   clearSearchQuery.length > 0
  //     ? tasks.filter(({ title }) =>
  //         title.toLowerCase().includes(clearSearchQuery)
  //       )
  //     : null;
  // }, [searchQuery, tasks]);

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();

    if (!clearSearchQuery) {
      return null;
    }

    return tasks.filter(({ title }) =>
      title.toLowerCase().includes(clearSearchQuery)
    );
  }, [searchQuery, tasks]);

  return {
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
  };
};

export default useTasks;
