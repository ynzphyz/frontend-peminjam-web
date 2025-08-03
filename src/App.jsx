import React, { useState } from "react";
import HomePage from "./HomePage";
import Peminjaman from "./Peminjaman";
import Pengembalian from "./Pengembalian";
import Approval from "./Approval";
import Riwayat from "./Riwayat";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-white to-indigo-100 flex flex-col relative">
      <nav className="bg-gray-900 text-white flex items-center justify-between py-5 px-6 md:px-10 shadow-md font-semibold text-base tracking-wide relative z-20">
        <div className="cursor-default select-none font-extrabold text-xl flex-1">
          SMKN 7 SEMARANG
        </div>
        {/* Hamburger button for mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-white rounded transform transition duration-300 ease-in-out ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-white rounded transition duration-300 ease-in-out ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-white rounded transform transition duration-300 ease-in-out ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
        {/* Menu links */}
        <div
          className={`flex-col md:flex-row md:flex md:items-center md:space-x-12 absolute md:static top-full left-0 w-full md:w-auto bg-gray-900 md:bg-transparent transition-all duration-300 ease-in-out overflow-hidden md:overflow-visible ${
            menuOpen ? "max-h-60 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
          } md:max-h-full md:opacity-100`}
        >
          <a
            href="#"
          onClick={(e) => {
              e.preventDefault();
              setActiveSection("home");
              closeMenu();
              window.scrollTo(0, 0);
            }}
            className={`block px-6 py-2 md:p-0 font-extrabold text-lg cursor-pointer select-none ${
              activeSection === "home" ? "underline" : ""
            }`}
          >
            Home
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection("peminjaman");
              closeMenu();
              window.scrollTo(0, 0);
            }}
            className={`block px-6 py-2 md:p-0 cursor-pointer hover:underline transition duration-200 ${
              activeSection === "peminjaman" ? "font-bold underline" : ""
            }`}
          >
            Peminjaman
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection("approval");
              closeMenu();
              window.scrollTo(0, 0);
            }}
            className={`block px-6 py-2 md:p-0 cursor-pointer hover:underline transition duration-200 ${
              activeSection === "approval" ? "font-bold underline" : ""
            }`}
          >
            Approval
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection("pengembalian");
              closeMenu();
              window.scrollTo(0, 0);
            }}
            className={`block px-6 py-2 md:p-0 cursor-pointer hover:underline transition duration-200 ${
              activeSection === "pengembalian" ? "font-bold underline" : ""
            }`}
          >
            Pengembalian
          </a>
           <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection("riwayat");
              closeMenu();
              window.scrollTo(0, 0);
            }}
            className={`block px-6 py-2 md:p-0 cursor-pointer hover:underline transition duration-200 ${
              activeSection === "riwayat" ? "font-bold underline" : ""
            }`}
          >
            Riwayat
          </a>
        </div>
      </nav>
      {/* Backdrop overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        ></div>
      )}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-0">
        {renderSection()}
      </main>
      <ToastContainer />
    </div>
  );
}
