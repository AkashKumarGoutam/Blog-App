import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Dashboard() {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:w-[30%] flex flex-col p-4 bg-gray-100">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="md:w-[70%] w-full border-l-2 p-4">
        <Outlet /> {/* Nested routes will render here */}
      </div>
    </div>
  );
}

export default Dashboard;
