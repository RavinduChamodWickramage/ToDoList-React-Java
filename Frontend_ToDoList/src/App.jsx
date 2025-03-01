import { NavLink } from "react-router";
import "./App.css";

function App() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 py-4 backdrop-blur-2xl backdrop-saturate-200 bg-white/80 border-white/80 w-full max-w-full rounded-none px-4 text-white border-0">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-2xl font-bold text-gray-900">ToDoList</p>
          <div className="hidden lg:flex items-center gap-4">
            <button
              className="px-6 py-3 text-s font-bold uppercase text-gray-900 bg-gray-300 rounded-lg hover:bg-gray-900/10 active:bg-gray-900/20 transition-all"
              type="button"
            >
              <NavLink to="/login">Login</NavLink>
            </button>
            <button
              className="px-6 py-3 text-s font-bold uppercase text-white bg-gray-900 rounded-lg shadow-md hover:bg-gray-800 active:bg-gray-700 transition-all"
              type="button"
            >
              <NavLink to="/register">Register</NavLink>
            </button>
          </div>
          <button
            className="lg:hidden ml-auto w-10 h-10 rounded-lg hover:bg-gray-900/10 active:bg-gray-900/20 transition-all"
            type="button"
          >
            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </nav>

      <header className="p-8 bg-white">
        <div className="container mx-auto text-center pt-12 pb-6 lg:pb-20">
          <h1 className="text-3xl font-semibold text-gray-900 lg:text-5xl lg:leading-tight">
            Simplify Your Life with ToDo List
          </h1>
          <p className="mt-4 text-lg text-gray-800">
            Stay organized, boost productivity, and achieve your goals
            effortlessly. Whether you're managing daily tasks or planning
            projects, our tools are designed to simplify your life and help you
            focus on what truly matters.
          </p>
        </div>
        <div className="w-full lg:container lg:mx-auto">
          <img
            src="https://i.pcmag.com/imagery/articles/05hXk1J5R4iHWkM13wqrr9M-7.fit_lim.size_768x.jpg"
            alt="Cover Photo"
            className="w-full h-96 rounded-lg object-contain lg:h-[30rem]"
          />
        </div>
      </header>
    </>
  );
}

export default App;
