import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Dashboard() {
  return (
    <div>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-[30%] flex flex-col  p-4 bg-gray-100">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-[70%] border-l-2  p-4">
          <Outlet /> {/* This is where nested routes will be rendered */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
