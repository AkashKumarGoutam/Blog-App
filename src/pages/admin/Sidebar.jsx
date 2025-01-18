import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

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
    <div className='pt-16'>
      {/* Hamburger Icon (outside the sidebar) */}
      {!isOpen && (
        <button 
          className="p- md:hidden focus:outline-none"
          onClick={toggleSidebar}
        >
          <span className="text-2xl font-bold">&#9776;</span> {/* Hamburger symbol */}
        </button>
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[70%] bg-gray-100 p-4 transform transition-transform duration-300 ease-in-out 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:w-full md:block`}
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
        <div className='pt-8'>
          <div>
            <NavLink
              to="all-posts"
              onClick={closeSidebar} // Close sidebar when clicked
              className={({ isActive }) =>
                isActive ? 'text-blue-500 font-bold' : 'text-gray-500'
              }
            >
              All Posts
            </NavLink>
            <hr />
          </div>
          <div>
            <NavLink
              to="all-category"
              onClick={closeSidebar} // Close sidebar when clicked
              className={({ isActive }) =>
                isActive ? 'text-blue-500 font-bold' : 'text-gray-500'
              }
            >
              All Category
            </NavLink>
            <hr />
          </div>
          <div>
            <NavLink
              to="add-posts"
              onClick={closeSidebar} // Close sidebar when clicked
              className={({ isActive }) =>
                isActive ? 'text-blue-500 font-bold' : 'text-gray-500'
              }
            >
              Add Post
            </NavLink>
            <hr />
          </div>
          <div>
            <NavLink
              to="add-category"
              onClick={closeSidebar} // Close sidebar when clicked
              className={({ isActive }) =>
                isActive ? 'text-blue-500 font-bold' : 'text-gray-500'
              }
            >
              Add Category
            </NavLink>
            <hr />
          </div>
          <div>
            <NavLink
              to="add-matches"
              onClick={closeSidebar} // Close sidebar when clicked
              className={({ isActive }) =>
                isActive ? 'text-blue-500 font-bold' : 'text-gray-500'
              }
            >
              Add Matches
            </NavLink>
            <hr />
          </div>
          <div>
            <NavLink
              to="add-match-posts"
              onClick={closeSidebar} // Close sidebar when clicked
              className={({ isActive }) =>
                isActive ? 'text-blue-500 font-bold' : 'text-gray-500'
              }
            >
              Add Matches post
            </NavLink>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
