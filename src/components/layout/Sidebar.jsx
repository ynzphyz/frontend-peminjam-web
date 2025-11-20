import React from "react";
import { Link, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/form-peminjaman", label: "Peminjaman" },
    { path: "/form-approval", label: "Approval" },
    { path: "/form-pengembalian", label: "Pengembalian" },
    { path: "/riwayat", label: "Riwayat" },
  ];

  const isActive = (path) => location.pathname === path;

  const sidebarVariants = {
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        delay: 0.2,
      },
    },
    open: {
      opacity: 1,
    },
  };

  const linkVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-[#051e3e] via-[#0a2851] to-[#051e3e] border-r-2 border-blue-500/60 backdrop-blur-xl shadow-2xl z-50"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-blue-500/30">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-blue-500/40"
                  whileHover={{ scale: 1.05 }}
                >
                  S7
                </motion.div>
                <div className="flex flex-col">
                  <h1 className="text-sm font-bold text-blue-300 leading-none">
                    SMKN 7
                  </h1>
                  <p className="text-xs font-semibold text-gray-400">
                    SEMARANG
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <motion.button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-600/30 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 px-6 py-8">
              <nav className="space-y-2">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.path}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={onClose}
                      className={`group relative flex items-center px-4 py-3 rounded-lg font-semibold text-base transition-all duration-300 ${
                        isActive(link.path)
                          ? "text-blue-200 bg-blue-600/50 border border-blue-500/50"
                          : "text-gray-200 hover:text-blue-300 hover:bg-blue-600/20"
                      }`}
                    >
                      {/* Active Indicator */}
                      {isActive(link.path) && (
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-r-full"
                          layoutId="sidebar-indicator"
                        />
                      )}

                      {/* Icon Placeholder - you can add specific icons later */}
                      <div className="w-5 h-5 mr-3 flex items-center justify-center">
                        <div className={`w-2 h-2 rounded-full ${
                          isActive(link.path) ? "bg-blue-400" : "bg-gray-400"
                        }`} />
                      </div>

                      <span className="flex-1">{link.label}</span>

                      {/* Arrow for active state */}
                      {isActive(link.path) && (
                        <motion.svg
                          className="w-4 h-4 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </motion.svg>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-blue-500/30">
              <motion.div
                className="text-center text-xs text-gray-400"
                variants={linkVariants}
                initial="closed"
                animate="open"
                transition={{ delay: 0.5 }}
              >
                Sistem Peminjaman Alat Praktik
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
