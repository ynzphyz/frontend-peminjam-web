import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    console.log("Menu clicked, current state:", menuOpen);
    setMenuOpen(!menuOpen);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a183d]">
      {/* Navbar dengan props yang benar */}
      <Navbar
        onMenuClick={handleMenuClick}
        menuOpen={menuOpen}
        closeMenu={handleCloseMenu}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={menuOpen} onClose={handleCloseMenu} />

        {/* Main Content */}
        <main className="flex-1 overflow-auto w-full">{children}</main>
      </div>
    </div>
  );
}
