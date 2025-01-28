import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Dashboard() {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:w-[30%] flex flex-col bg-black border border-gray-700 text-white">
        <h1 className="text-2xl font-semibold flex justify-center">Admin</h1>
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
