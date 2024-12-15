import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className='pt-24'>
      <div>
        <NavLink 
          to="all-posts" 
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
          className={({ isActive }) =>
            isActive ? 'text-blue-500 font-bold' : 'text-gray-500'
          }
        >
          Add Category
        </NavLink>
        <hr />
      </div>
    </div>
  );
}

export default Sidebar;
