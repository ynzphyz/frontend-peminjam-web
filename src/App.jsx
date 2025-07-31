

import React, { useState } from "react";
import HomePage from "./HomePage";
import Peminjaman from "./Peminjaman";
import Pengembalian from "./Pengembalian";
import Approval from "./Approval";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <HomePage />;
      case "peminjaman":
        return <Peminjaman />;
      case "pengembalian":
        return <Pengembalian />;
      case "approval":
        return <Approval />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-white to-indigo-100 flex flex-col">
      <nav className="bg-gray-900 text-white flex items-center justify-start space-x-12 py-5 px-10 shadow-md font-semibold text-base tracking-wide">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveSection("home");
            window.scrollTo(0, 0);
          }}
          className={`font-extrabold text-2xl cursor-pointer select-none mr-16 ${
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
            window.scrollTo(0, 0);
          }}
          className={`cursor-pointer hover:underline transition duration-200 ${
            activeSection === "peminjaman" ? "font-bold underline" : ""
          }`}
        >
          Peminjaman
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveSection("pengembalian");
            window.scrollTo(0, 0);
          }}
          className={`cursor-pointer hover:underline transition duration-200 ${
            activeSection === "pengembalian" ? "font-bold underline" : ""
          }`}
        >
          Pengembalian
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveSection("approval");
            window.scrollTo(0, 0);
          }}
          className={`cursor-pointer hover:underline transition duration-200 ${
            activeSection === "approval" ? "font-bold underline" : ""
          }`}
        >
          Approval
        </a>
      </nav>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative">
        {renderSection()}
      </main>
      <ToastContainer />
    </div>
  );
}
