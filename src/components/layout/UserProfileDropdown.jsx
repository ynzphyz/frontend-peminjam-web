import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Safety check for user
  if (!user) {
    console.warn("UserProfileDropdown: user is null/undefined");
    return null;
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setIsOpen(false);
  };

  const menuItems = [
    {
      icon: User,
      label: "Profile",
      onClick: handleProfileClick,
      color: "text-blue-400",
      hoverBg: "hover:bg-blue-600/20",
    },
    {
      icon: Settings,
      label: "Settings",
      onClick: handleProfileClick,
      color: "text-purple-400",
      hoverBg: "hover:bg-purple-600/20",
    },
    {
      icon: LogOut,
      label: "Logout",
      onClick: handleLogout,
      color: "text-red-400",
      hoverBg: "hover:bg-red-600/20",
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-600/10 border border-blue-500/30 hover:border-blue-400/60 transition-all group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Avatar with Kaggle-style ring */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-500 p-[2.5px] shadow-lg shadow-blue-500/40">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>
          {/* Online indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0a183d] shadow-lg"></div>
        </div>

        {/* User Info */}
        <div className="hidden sm:flex flex-col items-start min-w-0">
          <span className="text-sm font-semibold text-white leading-tight truncate max-w-[150px]">
            {user?.name || "User"}
          </span>
          <span className="text-xs text-gray-400 leading-tight truncate max-w-[150px]">
            {user?.email || ""}
          </span>
        </div>

        {/* Chevron Icon */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400 group-hover:text-blue-300 ml-auto"
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-64 bg-gradient-to-b from-[#0f1f3d] to-[#0a1530] border border-blue-500/30 rounded-xl shadow-2xl shadow-blue-900/50 overflow-hidden z-50 backdrop-blur-xl"
          >
            {/* User Info Header - Exact same format as Admin */}
            <div className="px-4 py-4 border-b border-blue-500/20 bg-gradient-to-r from-blue-600/20 to-cyan-600/10">
              <div className="flex items-center gap-3 mb-3">
                {/* Avatar with Kaggle-style ring */}
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-500 p-[3px] shadow-xl shadow-blue-500/50">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  </div>
                  {/* Online indicator */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-3 border-[#0f1f3d] shadow-lg animate-pulse"></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{user?.email || ""}</p>
                  <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-cyan-500/20 text-cyan-300 text-xs rounded-full font-semibold capitalize border border-cyan-500/30">
                    {user?.role === "admin" ? "Administrator" : "User"}
                  </span>
                </div>
              </div>
              
              {/* Show NIS and Kelas for non-admin users */}
              {user?.role !== "admin" && user?.nis && (
                <div className="space-y-2 mt-3">
                  <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-blue-900/40 to-blue-800/30 rounded-lg border border-blue-500/30 shadow-sm">
                    <span className="text-xs text-gray-300 font-semibold">NIS</span>
                    <span className="text-sm font-bold text-blue-300">
                      {user.nis}
                    </span>
                  </div>
                  {user?.kelas && (
                    <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-cyan-900/40 to-cyan-800/30 rounded-lg border border-cyan-500/30 shadow-sm">
                      <span className="text-xs text-gray-300 font-semibold">Kelas</span>
                      <span className="text-sm font-bold text-cyan-300">
                        {user.kelas}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={index}
                    onClick={item.onClick}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${item.hoverBg} group border-l-2 border-transparent hover:border-l-2 ${
                      item.label === "Logout" ? "hover:border-red-500" : "hover:border-blue-500"
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`p-2 rounded-lg ${
                      item.label === "Profile" ? "bg-blue-500/20" :
                      item.label === "Settings" ? "bg-purple-500/20" :
                      "bg-red-500/20"
                    }`}>
                      <Icon
                        size={18}
                        className={`${item.color} group-hover:scale-110 transition-transform`}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-300 group-hover:text-white">
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfileDropdown;
