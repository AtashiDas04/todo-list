"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks when the page loads
  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTasks(data.tasks);
        }
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // Function to delete a task
  const deleteTask = async (id) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (data.success) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== data.deletedId));
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <h1 className="text-4xl font-bold text-white mb-6">Smart Todo List</h1>

      {/* Task List */}
      <ul className="w-full max-w-md bg-gray-800 p-4 rounded-lg shadow-lg">
        {tasks.length === 0 ? (
          <p className="text-white text-center">No tasks available</p>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center bg-gray-700 p-2 my-2 rounded">
              <span className="text-white">{task.task}</span>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
