import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        {/* Main Content */}
        <main className="p-4 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;