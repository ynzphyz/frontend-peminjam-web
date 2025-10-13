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
      {/* Updated Navbar with dark theme */}
      <nav className="bg-slate-800 text-white shadow-xl border-b border-slate-700 font-medium text-base tracking-wide relative z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 md:px-10">
          <div className="cursor-default select-none font-bold text-xl text-white">
            SMKN 7 SEMARANG
          </div>

          {/* Improved Hamburger/Close button for mobile */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 z-30 relative"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-0.5 w-5 bg-white rounded transform transition-all duration-300 ease-in-out ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-5 bg-white rounded transition-all duration-300 ease-in-out ${
                menuOpen ? "opacity-0" : "opacity-100"
              } mt-1`}
            ></span>
            <span
              className={`block h-0.5 w-5 bg-white rounded transform transition-all duration-300 ease-in-out ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              } mt-1`}
            ></span>
          </button>

          {/* Desktop Menu Links */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection("home");
                window.scrollTo(0, 0);
              }}
              className={`px-3 py-2 rounded-lg font-semibold text-sm uppercase tracking-wider cursor-pointer select-none transition-all duration-200 ${
                activeSection === "home" 
                  ? "text-blue-400 bg-slate-700" 
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
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
              className={`px-3 py-2 rounded-lg font-semibold text-sm uppercase tracking-wider cursor-pointer transition-all duration-200 ${
                activeSection === "peminjaman" 
                  ? "text-blue-400 bg-slate-700" 
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              Peminjaman
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection("approval");
                window.scrollTo(0, 0);
              }}
              className={`px-3 py-2 rounded-lg font-semibold text-sm uppercase tracking-wider cursor-pointer transition-all duration-200 ${
                activeSection === "approval" 
                  ? "text-blue-400 bg-slate-700" 
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              Approval
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection("pengembalian");
                window.scrollTo(0, 0);
              }}
              className={`px-3 py-2 rounded-lg font-semibold text-sm uppercase tracking-wider cursor-pointer transition-all duration-200 ${
                activeSection === "pengembalian" 
                  ? "text-blue-400 bg-slate-700" 
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              Pengembalian
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection("riwayat");
                window.scrollTo(0, 0);
              }}
              className={`px-3 py-2 rounded-lg font-semibold text-sm uppercase tracking-wider cursor-pointer transition-all duration-200 ${
                activeSection === "riwayat" 
                  ? "text-blue-400 bg-slate-700" 
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              Riwayat
            </a>
          </div>
        </div>

        {/* Improved Mobile Menu */}
        <div
          ref={menuRef}
          className={`md:hidden bg-slate-800 border-t border-slate-700 transition-all duration-300 ease-in-out overflow-hidden ${
            menuOpen 
              ? "max-h-80 opacity-100 shadow-xl" 
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-4 space-y-1">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection("home");
                closeMenu();
                window.scrollTo(0, 0);
              }}
              className={`block px-4 py-3 rounded-lg font-semibold text-base cursor-pointer transition-all duration-200 ${
                activeSection === "home" 
                  ? "text-blue-400 bg-slate-700" 
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
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
              className={`block px-4 py-3 rounded-lg font-semibold text-base cursor-pointer transition-all duration-200 ${
                activeSection === "peminjaman" 
                  ? "text-blue-400 bg-slate-700" 
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
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
              className={`block px-4 py-3 rounded-lg font-semibold text-base cursor-pointer transition-all duration-200 ${
                activeSection === "approval" 
                  ? "text-blue-400 bg-slate-700" 
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
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
              className={`block px-4 py-3 rounded-lg font-semibold text-base cursor-pointer transition-all duration-200 ${
                activeSection === "pengembalian" 
                  ? "text-blue-400 bg-slate-700" 
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
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
              className={`block px-4 py-3 rounded-lg font-semibold text-base cursor-pointer transition-all duration-200 ${
                activeSection === "riwayat" 
                  ? "text-blue-400 bg-slate-700" 
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              Riwayat
            </a>
          </div>
        </div>
      </nav>

      {/* Improved Backdrop overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-10 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default Navbar;
