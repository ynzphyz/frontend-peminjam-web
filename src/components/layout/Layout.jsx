import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseMenu = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a183d]">
      {/* Navbar */}
      <Navbar
        onMenuClick={handleMenuClick}
        menuOpen={sidebarOpen}
        closeMenu={handleCloseMenu}
      />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={handleCloseMenu} />

        {/* Main Content */}
        <main className="flex-1 overflow-auto w-full relative">{children}</main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
