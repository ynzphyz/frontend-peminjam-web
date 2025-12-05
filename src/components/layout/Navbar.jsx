import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        const hamburgerButton = document.querySelector(
          "[aria-label='Toggle menu']"
        );
        if (hamburgerButton && hamburgerButton.contains(e.target)) {
          return;
        }
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  const toggleMenu = (e) => {
    e.stopPropagation();
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = (e) => {
    e?.stopPropagation();
    closeTimeoutRef.current = setTimeout(() => {
      setMenuOpen(false);
    }, 0);
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
    closeMenu(e);
  };

  // Role-based links:
  // - Admin: only Home and Admin Dashboard
  // - Non-admin: regular app links
  const baseLinks = [
    { path: "/", label: "Home" },
    { path: "/form-peminjaman", label: "Peminjaman" },
    { path: "/form-pengembalian", label: "Pengembalian" },
  ];
  const adminLinks = [
    { path: "/", label: "Home" },
    { path: "/admin", label: "Admin Dashboard" },
  ];
  const navLinks = isAdmin ? adminLinks : baseLinks;

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Premium Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-[#0a183d] via-[#0f1b35] to-[#1a2a4a] border-b border-blue-900/30 backdrop-blur-xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo Section */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none"
            >
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-blue-500/40"
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                S7
              </motion.div>

              <div className="hidden sm:flex flex-col">
                <motion.h1
                  className="text-base font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent leading-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  SMKN 7
                </motion.h1>
                <motion.p
                  className="text-xs font-semibold text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  SEMARANG
                </motion.p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                >
                  <Link
                    to={link.path}
                    className={`relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                      isActive(link.path)
                        ? "text-blue-200 bg-gradient-to-r from-blue-600/50 to-cyan-600/30"
                        : "text-gray-300 hover:text-blue-300"
                    }`}
                  >
                    {link.label}

                    {isActive(link.path) && (
                      <motion.div
                        className="absolute -bottom-1 left-4 right-4 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                        layoutId="navbar-indicator"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <div className="text-sm text-gray-300 px-4 py-2 rounded-lg bg-blue-600/20">
                    <span className="font-semibold text-blue-200">{user?.name}</span>
                    <span className="text-gray-400 ml-2">({user?.role})</span>
                  </div>
                  <motion.button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold text-sm hover:from-red-700 hover:to-red-800 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogOut size={16} />
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    onClick={() => navigate("/login")}
                    className="px-4 py-2 rounded-lg text-blue-300 font-semibold text-sm hover:bg-blue-600/20 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Login
                  </motion.button>
                  <motion.button
                    onClick={() => navigate("/register")}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-sm hover:from-blue-700 hover:to-cyan-700 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register
                  </motion.button>
                </>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <motion.button
              onClick={toggleMenu}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-blue-600/30 transition-all"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  className="w-full h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                  animate={{
                    rotate: menuOpen ? 45 : 0,
                    y: menuOpen ? 8 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                  animate={{ opacity: menuOpen ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                  animate={{
                    rotate: menuOpen ? -45 : 0,
                    y: menuOpen ? -8 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence mode="wait">
          {menuOpen && (
            <motion.div
              ref={menuRef}
              className="md:hidden bg-gradient-to-b from-[#0a2851]/90 to-[#051530]/90 backdrop-blur-lg border-t border-blue-500/30"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={handleLinkClick}
                      className={`block px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                        isActive(link.path)
                          ? "text-blue-300 bg-gradient-to-r from-blue-600/30 to-cyan-600/20 border border-blue-500/50"
                          : "text-gray-300 hover:text-blue-300 hover:bg-blue-600/20"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Auth Buttons */}
                <div className="border-t border-blue-500/30 pt-4 mt-4">
                  {isAuthenticated ? (
                    <>
                      <div className="text-sm text-gray-300 px-4 py-3 rounded-lg bg-blue-600/20 mb-2">
                        <span className="font-semibold text-blue-200">{user?.name}</span>
                        <span className="text-gray-400 ml-2">({user?.role})</span>
                      </div>
                      <motion.button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold text-sm hover:from-red-700 hover:to-red-800 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <LogOut size={16} />
                        Logout
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.button
                        onClick={() => {
                          navigate("/login");
                          handleLinkClick();
                        }}
                        className="w-full px-4 py-3 rounded-lg text-blue-300 font-semibold text-sm hover:bg-blue-600/20 transition-all mb-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Login
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          navigate("/register");
                          handleLinkClick();
                        }}
                        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-sm hover:from-blue-700 hover:to-cyan-700 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Register
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
            onClick={closeMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
