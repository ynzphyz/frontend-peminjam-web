import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseMenu = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a183d]">
      {/* Navbar dengan z-40 */}
      <Navbar
        onMenuClick={handleMenuClick}
        menuOpen={sidebarOpen}
        closeMenu={handleCloseMenu}
      />

      <div className="flex flex-1 pt-16">
        {/* Sidebar dengan z-40 */}
        <Sidebar isOpen={sidebarOpen} onClose={handleCloseMenu} />

        {/* Main content */}
        <main className="flex-1 overflow-auto w-full">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
