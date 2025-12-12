import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Bell,
  Package,
  FileText,
  Settings,
  Plus,
  LogOut,
  ClipboardList,
  History,
  UserCheck,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const AdminSidebar = ({ pendingCount = 0, onTabChange, activeTab }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    {
      id: "overview",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: null,
    },
    {
      id: "reports",
      label: "Reports",
      icon: Bell,
      badge: pendingCount,
      path: null,
    },
    {
      id: "approvals",
      label: "All Approvals",
      icon: ClipboardList,
      path: null,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      path: null,
    },
    {
      id: "users",
      label: "User Management",
      icon: UserCheck,
      path: null,
    },
    {
      id: "products",
      label: "Equipment",
      icon: Package,
      path: null,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      path: null,
    },
  ];

  const externalLinks = [
    {
      label: "Form Approval",
      icon: Plus,
      path: "/form-approval",
      color: "text-cyan-400",
    },
    {
      label: "Riwayat",
      icon: History,
      path: "/riwayat",
      color: "text-blue-400",
    },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-[#0a183d] via-[#0f1b35] to-[#1a2a4a] border-r border-blue-500/20 z-50 flex flex-col"
    >
      {/* Logo/Brand */}
      <div className="p-4 border-b border-blue-500/20">
        <h1 className="text-xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          ADMIN PANEL
        </h1>
        <p className="text-xs text-gray-400 mt-1">SMKN 7 Semarang</p>
      </div>

      {/* Main Menu */}
      <nav className="p-3 space-y-1 flex-1 overflow-y-auto scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
          Main Menu
        </p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl font-medium transition-all relative ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30"
                  : "text-gray-400 hover:text-white hover:bg-blue-600/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} />
                <span className="text-sm">{item.label}</span>
              </div>
              {item.badge > 0 && (
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-orange-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                >
                  {item.badge}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* External Links */}
      <div className="px-3 py-3 border-t border-blue-500/20">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
          Quick Actions
        </p>
        <div className="space-y-1">
          {externalLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.path} to={link.path}>
                <motion.div
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-blue-600/10 transition-all"
                >
                  <Icon size={20} className={link.color} />
                  <span className="text-sm font-medium">{link.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Logout */}
      <div className="p-3 border-t border-blue-500/20">
        <motion.button
          onClick={handleLogout}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-600/10 transition-all font-medium"
        >
          <LogOut size={20} />
          <span className="text-sm">Logout</span>
        </motion.button>
      </div>

    </motion.aside>
  );
};

export default AdminSidebar;
