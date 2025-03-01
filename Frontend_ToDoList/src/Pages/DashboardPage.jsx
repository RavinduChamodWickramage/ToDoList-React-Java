import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "../App.css";
import { IoAdd, IoCreateOutline, IoTrash } from "react-icons/io5";
import Navbar from "../Components/Navbar";

function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.id) {
        setError("User not found. Please log in again.");
        navigate("/login");
        return;
      }

      const userId = user.id;

      const response = await axios.get(
        `http://localhost:8080/api/tasks?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(response.data);
    } catch (err) {
      console.error(
        "Failed to fetch tasks:",
        err.response?.data || err.message
      );
      setError("Failed to fetch tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.id) {
        setError("User not found. Please log in again.");
        navigate("/login");
        return;
      }

      const userId = user.id;

      await axios.delete(
        `http://localhost:8080/api/tasks/${taskId}?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchTasks();
    } catch (err) {
      console.error(
        "Failed to delete task:",
        err.response?.data || err.message
      );
      setError("Failed to delete task. Please try again.");
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.id) {
        setError("User not found. Please log in again.");
        navigate("/login");
        return;
      }

      const userId = user.id;

      const taskToUpdate = tasks.find((task) => task.id === taskId);
      if (!taskToUpdate) {
        setError("Task not found.");
        return;
      }

      const updatedTask = {
        ...taskToUpdate,
        isCompleted: newStatus === "Completed",
      };

      await axios.put(
        `http://localhost:8080/api/tasks/${taskId}?userId=${userId}`,
        updatedTask,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, isCompleted: newStatus === "Completed" }
            : task
        )
      );
    } catch (err) {
      console.error(
        "Failed to update task status:",
        err.response?.data || err.message
      );
      setError("Failed to update task status. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Dashboard
          </h1>

          {error && (
            <p className="text-red-500 dark:text-red-400 mb-6 text-center">
              {error}
            </p>
          )}

          <div className="flex justify-end">
            <button
              onClick={() => navigate("/task")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-bold flex items-center gap-2 mb-8"
            >
              <IoAdd className="text-xl" />
              Add Task
            </button>
          </div>

          {loading ? (
            <p className="text-center">Loading tasks...</p>
          ) : (
            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="p-4 border dark:border-gray-600 text-left text-gray-900 dark:text-white">
                      #
                    </th>
                    <th className="p-4 border dark:border-gray-600 text-left text-gray-900 dark:text-white">
                      Title
                    </th>
                    <th className="p-4 border dark:border-gray-600 text-left text-gray-900 dark:text-white">
                      Description
                    </th>
                    <th className="p-4 border dark:border-gray-600 text-left text-gray-900 dark:text-white">
                      Due Date
                    </th>
                    <th className="p-4 border dark:border-gray-600 text-left text-gray-900 dark:text-white">
                      Status
                    </th>
                    <th className="p-4 border dark:border-gray-600 text-left text-gray-900 dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr
                      key={task.id}
                      className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="p-4 border dark:border-gray-600 text-gray-900 dark:text-white">
                        {index + 1}
                      </td>
                      <td className="p-4 border dark:border-gray-600 text-gray-900 dark:text-white">
                        {task.title}
                      </td>
                      <td className="p-4 border dark:border-gray-600 text-gray-900 dark:text-white">
                        {task.description}
                      </td>
                      <td className="p-4 border dark:border-gray-600 text-gray-900 dark:text-white">
                        {task.dueDate}
                      </td>
                      <td className="p-4 border dark:border-gray-600 text-gray-900 dark:text-white">
                        <select
                          value={task.isCompleted ? "Completed" : "Pending"}
                          onChange={(e) =>
                            handleStatusChange(task.id, e.target.value)
                          }
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            task.isCompleted
                              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                              : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="p-4 border dark:border-gray-600 text-gray-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/task/${task.id}`)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 flex items-center gap-2"
                          >
                            <IoCreateOutline />
                            Update
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 flex items-center gap-2"
                          >
                            <IoTrash />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
