import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Function to close sidebar on NavLink click
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="">
      {/* Hamburger Icon (outside the sidebar) */}
      {!isOpen && (
        <button
          className="p- md:hidden focus:outline-none"
          onClick={toggleSidebar}
        >
          <span className="text-2xl font-bold">&#9776;</span>{" "}
          {/* Hamburger symbol */}
        </button>
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[50%] bg-black p-4 transform transition-transform duration-300 ease-in-out 
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative md:w-full md:block`}
      >
        {/* Close Icon at the Top */}
        <div className="flex justify-end mb-4 md:hidden">
          <button
            className="text-2xl font-bold focus:outline-none"
            onClick={toggleSidebar}
          >
            &#x2715; {/* Close symbol */}
          </button>
        </div>

        {/* Nav Links */}
        <div className="uppercase pt-2">
          <div className="bg-gray-900 hover:bg-gray-700 transition duration p-2 mt-2">
            <NavLink
              to="all-articles"
              onClick={closeSidebar} // Close sidebar when clicked
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "text-white text-xl my-4"
              }
            >
              All Articles
            </NavLink>
          </div>
          <div className="bg-gray-900 hover:bg-gray-700 transition duration p-2 mt-2">
            <NavLink
              to="add-articles"
              onClick={closeSidebar} // Close sidebar when clicked
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "text-white text-xl my-4"
              }
            >
              Add Articles
            </NavLink>
          </div>
          {/* <div className="bg-gray-900 hover:bg-gray-700 transition duration p-2 mt-2">
            <NavLink
              to="all-category"
              onClick={closeSidebar} // Close sidebar when clicked
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "text-white text-xl my-4"
              }
            >
              All Category
            </NavLink>
          </div> */}

          <div className="bg-gray-900 hover:bg-gray-700 transition duration p-2 mt-2">
            <NavLink
              to="add-category"
              onClick={closeSidebar} // Close sidebar when clicked
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "text-white text-xl my-4"
              }
            >
              Add Category
            </NavLink>
          </div>
          <div className="bg-gray-900 hover:bg-gray-700 transition duration p-2 mt-2">
            <NavLink
              to="create-match-card"
              onClick={closeSidebar} // Close sidebar when clicked
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "text-white text-xl my-4"
              }
            >
              Create Match Card
            </NavLink>
          </div>
          <div className="bg-gray-900 hover:bg-gray-700 transition duration p-2 mt-2">
            <NavLink
              to="add-match-posts"
              onClick={closeSidebar} // Close sidebar when clicked
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "text-white text-xl my-4"
              }
            >
              Add Matches Stats
            </NavLink>
          </div>
          <div className="bg-gray-900 hover:bg-gray-700 transition duration p-2 mt-2">
            <NavLink
              to="add-flag-imageURL"
              onClick={closeSidebar} // Close sidebar when clicked
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "text-white text-xl my-4"
              }
            >
              Add Flag imageURL
            </NavLink>
          </div>
          <div className="bg-gray-900 hover:bg-gray-700 transition duration p-2 mt-2">
            <NavLink
              to="create-cricket-statistics-hub"
              onClick={closeSidebar} // Close sidebar when clicked
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "text-white text-xl my-4"
              }
            >
              Create Cricket Statistics Hub
            </NavLink>
          </div>
          <div className="bg-gray-900 hover:bg-gray-700 transition duration p-2 mt-2">
            <NavLink
              to="statistical-articles"
              onClick={closeSidebar} // Close sidebar when clicked
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "text-white text-xl my-4"
              }
            >
              Statistical Articles
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
