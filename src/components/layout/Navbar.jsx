import React, { useEffect, useRef } from "react";

const Navbar = ({
  activeSection,
  setActiveSection,
  menuOpen,
  toggleMenu,
  closeMenu,
}) => {

  // Ref untuk menu
  const menuRef = useRef(null);

  // Tutup menu saat scroll
  useEffect(() => {
    if (!menuOpen) return;
    const handleScroll = () => closeMenu();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen, closeMenu]);

  // Tutup menu saat klik di luar area menu
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e) => {
      // Tambahkan pengecekan untuk tombol hamburger/close
      const hamburgerButton = e.target.closest('button[aria-label*="menu"]');
      if (hamburgerButton) return; // Jangan tutup jika klik pada tombol hamburger
      
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <nav className="bg-primary-600 text-white flex items-center justify-between py-5 px-6 md:px-10 shadow-lg font-semibold text-base tracking-wide relative z-20">
        <div className="cursor-default select-none font-extrabold text-xl flex-1 text-white">
          SMKN 7 SEMARANG
        </div>

        {/* Hamburger/Close button for mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-30 relative"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
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
          ref={menuRef}
          className={`flex-col md:flex-row md:flex md:items-center md:space-x-12 absolute md:static top-full left-0 w-full md:w-auto bg-primary-600 md:bg-transparent transition-all duration-300 ease-in-out overflow-hidden md:overflow-visible z-20 ${
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
            className={`block px-6 py-2 md:p-0 font-extrabold text-lg cursor-pointer select-none text-white hover:text-secondary-500 transition-colors duration-200 ${
              activeSection === "home" ? "text-secondary-500 underline" : ""
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
            className={`block px-6 py-2 md:p-0 cursor-pointer text-white hover:text-secondary-500 transition-colors duration-200 ${
              activeSection === "peminjaman" ? "font-bold text-secondary-500 underline" : ""
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
            className={`block px-6 py-2 md:p-0 cursor-pointer text-white hover:text-secondary-500 transition-colors duration-200 ${
              activeSection === "approval" ? "font-bold text-secondary-500 underline" : ""
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
            className={`block px-6 py-2 md:p-0 cursor-pointer text-white hover:text-secondary-500 transition-colors duration-200 ${
              activeSection === "pengembalian" ? "font-bold text-secondary-500 underline" : ""
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
            className={`block px-6 py-2 md:p-0 cursor-pointer text-white hover:text-secondary-500 transition-colors duration-200 ${
              activeSection === "riwayat" ? "font-bold text-secondary-500 underline" : ""
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
    </>
  );
};

export default Navbar;
