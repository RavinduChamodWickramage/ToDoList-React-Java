import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "../App.css";
import { IoLogOut, IoPersonCircle } from "react-icons/io5";

function Navbar() {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get("http://localhost:8080/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (err) {
      console.error("Failed to fetch user details:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleUpdateProfile = () => {
    navigate("/update-profile");
  };

  const generateAvatar = (firstName, lastName) => {
    const firstLetter = firstName ? firstName.charAt(0).toUpperCase() : "";
    const lastLetter = lastName ? lastName.charAt(0).toUpperCase() : "";
    return `${firstLetter}${lastLetter}`;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 py-4 backdrop-blur-2xl backdrop-saturate-200 bg-white/80 border-white/80 w-full max-w-full rounded-none px-4 text-white border-0">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-2xl font-bold text-gray-900">ToDoList</p>

          {user && (
            <div className="flex items-center gap-4">
              <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold cursor-pointer">
                  {generateAvatar(user.firstName, user.lastName)}
                </div>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                    <div className="p-4">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.username}
                      </p>
                    </div>
                    <hr className="border-gray-200 dark:border-gray-700" />
                    <button
                      onClick={handleUpdateProfile}
                      className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                      <IoPersonCircle />
                      Update Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                      <IoLogOut />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
