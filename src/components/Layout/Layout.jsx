import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="content">
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
