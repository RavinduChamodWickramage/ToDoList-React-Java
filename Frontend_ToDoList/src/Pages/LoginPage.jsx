import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { NavLink, useNavigate } from "react-router";
import { IoMdHome } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8080/api/auth/login`,
        {
          username,
          password,
        }
      );
      const token = response.data;
      localStorage.setItem("token", token);

      const userResponse = await axios.get(
        `http://localhost:8080/api/users/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (userResponse.data && userResponse.data.id) {
        localStorage.setItem("user", JSON.stringify(userResponse.data));
        console.log("User stored in localStorage:", userResponse.data);
        navigate("/dashboard");
      } else {
        throw new Error("Invalid user data received from the server.");
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError("Invalid username or password. Please try again.");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
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
                <CiLogin />
                Login to Account
              </h1>

              {error && (
                <p className="text-sm text-red-500 text-center dark:text-red-400">
                  {error}
                </p>
              )}

              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium  dark:text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 px-3 py-2 text-sm font-medium  dark:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-bold rounded-lg text-sm px-5 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Login
                </button>

                <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                  Don't have an account?{" "}
                  <NavLink
                    to="/register"
                    className="font-medium dark:text-gray-100 flex items-center gap-1"
                  >
                    <IoCreateOutline />
                    Register here
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

export default LoginPage;
