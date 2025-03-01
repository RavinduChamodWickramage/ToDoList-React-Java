import React, { useEffect, useState, useCallback } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate, useParams, NavLink } from "react-router";
import { IoMdHome } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";

function TaskPage() {
  const { taskId } = useParams();
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    isCompleted: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchTask = useCallback(async () => {
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
        `http://localhost:8080/api/tasks/${taskId}?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTask(response.data);
    } catch (err) {
      console.error("Failed to fetch task:", err.response?.data || err.message);
      setError("Failed to fetch task. Please try again.");
    }
  }, [taskId, navigate]);

  useEffect(() => {
    if (taskId) {
      fetchTask();
    }
  }, [taskId, fetchTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.id) {
        setError("User not found. Please log in again.");
        navigate("/login");
        return;
      }

      const userId = user.id;

      if (taskId) {
        await axios.put(
          `http://localhost:8080/api/tasks/${taskId}?userId=${userId}`,
          task,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(
          `http://localhost:8080/api/tasks?userId=${userId}`,
          task,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to save task:", err.response?.data || err.message);
      setError("Failed to save task. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <NavLink
            to="/"
            className="flex items-center mb-6 text-2xl font-bold dark:text-gray-800"
          >
            <IoMdHome />
            ToDoList
          </NavLink>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-center md:text-2xl dark:text-white flex items-center justify-center gap-2">
                <IoCreateOutline />
                {taskId ? "Update Task" : "Add Task"}
              </h1>

              {error && (
                <p className="text-sm text-red-500 text-center dark:text-red-400">
                  {error}
                </p>
              )}

              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={task.title}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter title"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    value={task.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter description"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="dueDate"
                    className="block mb-2 text-sm font-medium dark:text-white"
                  >
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    value={task.dueDate}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-bold rounded-lg text-sm px-5 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  {taskId ? "Update Task" : "Add Task"}
                </button>

                <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                  Go back to{" "}
                  <NavLink
                    to="/dashboard"
                    className="font-medium dark:text-gray-100 flex items-center gap-1"
                  >
                    <IoMdHome />
                    Dashboard
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TaskPage;
