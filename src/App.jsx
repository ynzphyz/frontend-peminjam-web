import React, { useState } from "react";
import HomePage from "./components/pages/HomePage";
import Peminjaman from "./components/pages/Peminjaman";
import Pengembalian from "./components/pages/Pengembalian";
import Approval from "./components/pages/Approval";
import Riwayat from "./components/pages/Riwayat";
import Layout from "./components/layout/Layout";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <HomePage onNavigate={setActiveSection} />;
      case "peminjaman":
        return <Peminjaman />;
      case "pengembalian":
        return <Pengembalian />;
      case "approval":
        return <Approval />;
      case "riwayat":
        return <Riwayat />;
      default:
        return <HomePage onNavigate={setActiveSection} />;
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <Layout
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      menuOpen={menuOpen}
      toggleMenu={toggleMenu}
      closeMenu={closeMenu}
    >
      {renderSection()}
    </Layout>
  );
}
