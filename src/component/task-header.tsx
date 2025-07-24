"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  id: number;
  task_name: string;
  description: string;
  due_date: string;
}

export default function Header() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/task");
      setTasks(response.data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      // Delete expects id in body JSON for your backend
      await axios.delete("/api/task", { data: { id } });
      fetchTasks(); // Refresh task list
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;

    try {
      if (editingTask.id === 0) {
        // Add new task - POST
        await axios.post("/api/task", {
          task_name: editingTask.task_name,
          description: editingTask.description,
          due_date: editingTask.due_date,
        });
      } else {
        // Update existing task - PUT
        await axios.put("/api/task", {
          id: editingTask.id,
          task_name: editingTask.task_name,
          description: editingTask.description,
          due_date: editingTask.due_date,
        });
      }

      setEditingTask(null);
      setShowForm(false);
      fetchTasks(); // Refresh task list
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const handleAddNew = () => {
    setEditingTask({
      id: 0,
      task_name: "",
      description: "",
      due_date: new Date().toISOString().slice(0, 16), // format for datetime-local input
    });
    setShowForm(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (editingTask) {
      setEditingTask({ ...editingTask, [name]: value });
    }
  };

  return (
    <div className="p-6">
        <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Tasks</h1>
                <button onClick={handleAddNew}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  + New Task
                </button>
        </div>

      {showForm && editingTask && (
        <form onSubmit={handleFormSubmit} className="mb-6 space-y-4">
          <input
            type="text"
            name="task_name"
            placeholder="Task Name"
            value={editingTask.task_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={editingTask.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={3}
            required
          />
          <input
            type="datetime-local"
            name="due_date"
            value={editingTask.due_date ? editingTask.due_date.slice(0, 16) : ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editingTask.id === 0 ? "Add Task" : "Update Task"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingTask(null);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="p-4 border rounded shadow-sm flex justify-between items-start"
          >
            <div>
              <h3 className="text-lg font-semibold">{task.task_name}</h3>
              <p>{task.description}</p>
              <small className="text-gray-500">
                Due: {new Date(task.due_date).toLocaleString()}
              </small>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(task)}
                className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
