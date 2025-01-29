"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isAdding, setIsAdding] = useState(false);

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

  // Function to add a new task
  const addTask = async () => {
    if (!newTask.trim()) return;
    
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: newTask }),
      });

      const data = await res.json();
      if (data.success) {
        setTasks((prevTasks) => [...prevTasks, data.task]); // Add new task to list
        setNewTask(""); // Reset input
        setIsAdding(false); // Hide input box
      }
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <h1 className="text-4xl font-bold text-white mb-6">Smart Todo List</h1>

      {/* Add Task Button */}
      <button
        onClick={() => setIsAdding(true)}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add Task
      </button>

      {/* Input Box for New Task */}
      {isAdding && (
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task..."
            className="p-2 border rounded w-64"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={() => setIsAdding(false)}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Discard
          </button>
        </div>
      )}

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
