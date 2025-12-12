import React, { useEffect, useState, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Users,
  FileText,
  Settings,
  ClipboardList,
  History,
  Sparkles,
  Bell,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Package,
  UserCheck,
  Calendar,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { fetchStats } from "../../utils/api";
import AdminSidebar from "../layout/AdminSidebar";
import Reports from "./Reports";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [pendingPeminjaman, setPendingPeminjaman] = useState([]);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Debug logging
  console.log("🔍 AdminDashboard - Current user:", user);
  console.log("🔍 AdminDashboard - Is admin?:", user?.role === "admin");

  const [stats, setStats] = useState([
    {
      label: "Total Peminjaman",
      value: "…",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Total Users",
      value: "…",
      icon: Users,
      color: "from-cyan-500 to-cyan-600",
    },
    {
      label: "Pending Approval",
      value: "…",
      icon: Clock,
      color: "from-orange-500 to-orange-600",
    },
    {
      label: "Approved",
      value: "…",
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
    },
  ]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await fetchStats();
        if (!mounted) return;
        setStats((prev) => [
          { ...prev[0], value: String(data.totalPeminjaman ?? 0) },
          { ...prev[1], value: String(data.totalUsers ?? 0) },
          { ...prev[2], value: String(data.pendingApproval ?? 0) },
          { ...prev[3], value: String(data.approvedCount ?? 0) },
        ]);
      } catch {
        if (!mounted) return;
        // Fallback: keep placeholders
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Fetch pending peminjaman for reports
  useEffect(() => {
    let mounted = true;
    const fetchPendingPeminjaman = async () => {
      try {
        const response = await fetch("http://localhost:8080/peminjaman", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch");

        const result = await response.json();
        const data = result.data || result;

        if (!mounted) return;

        // Filter only pending status
        const pending = Array.isArray(data)
          ? data.filter((p) => p.status === "pending")
          : [];

        setPendingPeminjaman(pending);
      } catch (error) {
        console.error("Error fetching pending peminjaman:", error);
      }
    };

    fetchPendingPeminjaman();
    return () => {
      mounted = false;
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAccountDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0a183d] via-[#0f1b35] to-[#1a2a4a] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar
        pendingCount={pendingPeminjaman.length}
        onTabChange={setActiveTab}
        activeTab={activeTab}
      />

      {/* Main Content Area */}
      <div
        className="flex-1 ml-64 overflow-y-auto scrollbar-hide"
        style={{
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* IE and Edge */,
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-40 bg-gradient-to-r from-[#0a183d]/95 via-[#0f1b35]/95 to-[#1a2a4a]/95 backdrop-blur-xl border-b border-blue-500/20">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                  {activeTab === "overview" && "Dashboard Overview"}
                  {activeTab === "reports" && "Reports & Notifications"}
                  {activeTab === "approvals" && "All Approvals"}
                  {activeTab === "analytics" && "Analytics"}
                  {activeTab === "users" && "User Management"}
                  {activeTab === "products" && "Equipment Management"}
                  {activeTab === "settings" && "System Settings"}
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  Welcome back, {user?.name} 👋
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Date Display */}
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/30 rounded-lg">
                  <Calendar size={18} className="text-blue-400" />
                  <span className="text-sm text-gray-300">
                    {new Date().toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* Notification Badge */}
                {pendingPeminjaman.length > 0 && (
                  <motion.button
                    onClick={() => setActiveTab("reports")}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-lg hover:bg-orange-500/30 transition"
                  >
                    <Bell size={18} className="text-orange-400" />
                    <span className="text-sm font-semibold text-orange-300">
                      {pendingPeminjaman.length}
                    </span>
                  </motion.button>
                )}

                {/* Account Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <motion.button
                    onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-lg hover:border-blue-500/50 transition-all"
                  >
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                      {getInitials(user?.name)}
                    </div>
                    
                    {/* User Info */}
                    <div className="text-left hidden sm:block">
                      <p className="text-sm font-semibold text-white">
                        {user?.name || "Admin"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {user?.email || "admin@smkn7.id"}
                      </p>
                    </div>

                    {/* Chevron */}
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform ${
                        accountDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {accountDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-64 bg-gradient-to-br from-[#0f2855] to-[#051530] border border-blue-500/30 rounded-xl shadow-2xl shadow-blue-900/50 overflow-hidden z-50"
                      >
                        {/* User Info Header */}
                        <div className="p-4 border-b border-blue-500/20 bg-blue-600/10">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                              {getInitials(user?.name)}
                            </div>
                            <div className="flex-1">
                              <p className="text-white font-semibold text-sm">
                                {user?.name || "Admin User"}
                              </p>
                              <p className="text-gray-400 text-xs truncate">
                                {user?.email || "admin@smkn7.id"}
                              </p>
                              <span className="inline-block mt-1 px-2 py-0.5 bg-cyan-500/20 text-cyan-300 text-xs rounded-full font-medium">
                                {user?.role === "admin" ? "Administrator" : "User"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          <button
                            onClick={() => {
                              setActiveTab("settings");
                              setAccountDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-blue-600/20 transition-all text-left"
                          >
                            <User size={18} className="text-blue-400" />
                            <div>
                              <p className="text-sm font-medium">Profile</p>
                              <p className="text-xs text-gray-500">
                                View and edit profile
                              </p>
                            </div>
                          </button>

                          <button
                            onClick={() => {
                              setActiveTab("settings");
                              setAccountDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-blue-600/20 transition-all text-left"
                          >
                            <Settings size={18} className="text-cyan-400" />
                            <div>
                              <p className="text-sm font-medium">Settings</p>
                              <p className="text-xs text-gray-500">
                                Manage preferences
                              </p>
                            </div>
                          </button>
                        </div>

                        {/* Logout */}
                        <div className="p-2 border-t border-blue-500/20">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-600/20 transition-all text-left"
                          >
                            <LogOut size={18} />
                            <div>
                              <p className="text-sm font-medium">Logout</p>
                              <p className="text-xs text-red-500/70">
                                Sign out of your account
                              </p>
                            </div>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 pb-20">
          {/* Animated Background */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 ml-64">
            <motion.div
              className="absolute top-20 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-10"
              animate={{ y: [0, 100, 0], x: [0, 50, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-10"
              animate={{ y: [0, -100, 0], x: [0, -50, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Stats Grid - Show on Overview tab */}
          {activeTab === "overview" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative bg-gradient-to-br from-[#0f2855]/80 to-[#051530]/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-6 hover:border-blue-500/40 transition-all shadow-lg shadow-blue-900/20 overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-cyan-600/0 group-hover:from-blue-600/10 group-hover:to-cyan-600/10 transition-all duration-500" />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-gray-300 text-sm font-medium">
                            {stat.label}
                          </h3>
                          <div
                            className={`bg-gradient-to-br ${stat.color} p-3 rounded-xl shadow-md group-hover:scale-110 transition-transform`}
                          >
                            <Icon size={20} className="text-white" />
                          </div>
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">
                          {stat.value}
                        </p>
                        <div className="flex items-center gap-2 text-xs">
                          <TrendingUp size={14} className="text-green-400" />
                          <span className="text-green-400">+12%</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - 2 cols */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Quick Actions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-[#0f2855]/80 to-[#051530]/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-6 shadow-lg"
                  >
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Sparkles size={20} className="text-cyan-400" />
                      Quick Actions
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                      <Link to="/form-approval">
                        <motion.div
                          whileHover={{ scale: 1.03, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          className="p-5 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 hover:border-blue-500/60 transition-all text-left group"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-blue-600/30">
                              <ClipboardList
                                size={20}
                                className="text-blue-200"
                              />
                            </div>
                            <h3 className="text-base font-semibold text-blue-200 group-hover:text-cyan-300 transition-colors">
                              Form Approval
                            </h3>
                          </div>
                          <p className="text-xs text-gray-400">
                            Review peminjaman
                          </p>
                        </motion.div>
                      </Link>

                      <Link to="/riwayat">
                        <motion.div
                          whileHover={{ scale: 1.03, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          className="p-5 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 hover:border-blue-500/60 transition-all text-left group"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-blue-600/30">
                              <History size={20} className="text-blue-200" />
                            </div>
                            <h3 className="text-base font-semibold text-blue-200 group-hover:text-cyan-300 transition-colors">
                              Riwayat
                            </h3>
                          </div>
                          <p className="text-xs text-gray-400">Lihat history</p>
                        </motion.div>
                      </Link>

                      <button onClick={() => setActiveTab("reports")}>
                        <motion.div
                          whileHover={{ scale: 1.03, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          className="p-5 rounded-xl bg-gradient-to-br from-orange-600/20 to-yellow-600/20 border border-orange-500/30 hover:border-orange-500/60 transition-all text-left group relative"
                        >
                          {pendingPeminjaman.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                              {pendingPeminjaman.length}
                            </span>
                          )}
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-orange-600/30">
                              <Bell size={20} className="text-orange-200" />
                            </div>
                            <h3 className="text-base font-semibold text-orange-200 group-hover:text-yellow-300 transition-colors">
                              Reports
                            </h3>
                          </div>
                          <p className="text-xs text-gray-400">
                            Peminjaman pending
                          </p>
                        </motion.div>
                      </button>

                      <button onClick={() => setActiveTab("analytics")}>
                        <motion.div
                          whileHover={{ scale: 1.03, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          className="p-5 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 hover:border-purple-500/60 transition-all text-left group"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-purple-600/30">
                              <BarChart3
                                size={20}
                                className="text-purple-200"
                              />
                            </div>
                            <h3 className="text-base font-semibold text-purple-200 group-hover:text-pink-300 transition-colors">
                              Analytics
                            </h3>
                          </div>
                          <p className="text-xs text-gray-400">
                            Statistik detail
                          </p>
                        </motion.div>
                      </button>
                    </div>
                  </motion.div>

                  {/* Recent Activity */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-[#0f2855]/80 to-[#051530]/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-6 shadow-lg"
                  >
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <Clock size={18} className="text-cyan-400" />
                      Recent Activity
                    </h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <span>
                          {pendingPeminjaman.length} peminjaman menunggu
                          approval
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Sistem berjalan normal</span>
                      </li>
                      <li className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span>Total {stats[0].value} peminjaman tercatat</span>
                      </li>
                    </ul>
                  </motion.div>
                </div>

                {/* Right Sidebar - 1 col */}
                <div className="space-y-6">
                  {/* Recent Updates */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gradient-to-br from-[#0f2855]/80 to-[#051530]/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-6 shadow-lg"
                  >
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Bell size={18} className="text-cyan-400" />
                      Recent Updates
                    </h3>
                    <div className="space-y-4">
                      {pendingPeminjaman.slice(0, 3).map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-3 p-3 rounded-lg bg-blue-600/10 border border-blue-500/20 hover:border-blue-500/40 transition cursor-pointer"
                          onClick={() => setActiveTab("reports")}
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {item.nama?.charAt(0) || "?"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">
                              {item.nama}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              Pending: {item.nama_alat}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                      {pendingPeminjaman.length === 0 && (
                        <p className="text-center text-gray-500 py-4 text-sm">
                          No pending updates
                        </p>
                      )}
                    </div>
                  </motion.div>

                  {/* System Status */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-xl rounded-2xl border border-green-500/30 p-6 shadow-lg"
                  >
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <CheckCircle size={18} className="text-green-400" />
                      System Status
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Server</span>
                        <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full font-semibold">
                          Online
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Database</span>
                        <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full font-semibold">
                          Connected
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">API</span>
                        <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full font-semibold">
                          Active
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </>
          )}

          {/* REPORTS TAB */}
          {activeTab === "reports" && (
            <Reports />
          )}

          {/* APPROVALS TAB */}
          {activeTab === "approvals" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-br from-[#0f2855]/80 to-[#051530]/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle size={24} className="text-green-400" />
                All Approvals
              </h2>
              <div className="text-center py-12">
                <FileText size={48} className="text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Coming Soon
                </h3>
                <p className="text-gray-400">
                  Fitur untuk melihat semua approval akan segera tersedia
                </p>
                <Link
                  to="/riwayat"
                  className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Lihat Riwayat
                </Link>
              </div>
            </motion.div>
          )}

          {/* USERS TAB */}
          {activeTab === "users" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-br from-[#0f2855]/80 to-[#051530]/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <UserCheck size={24} className="text-cyan-400" />
                User Management
              </h2>
              <div className="text-center py-12">
                <Users size={48} className="text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Coming Soon
                </h3>
                <p className="text-gray-400">
                  Fitur manajemen user akan segera tersedia
                </p>
                <div className="mt-6 text-sm text-gray-500">
                  <p>Total Users: {stats[1].value}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-br from-[#0f2855]/80 to-[#051530]/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Settings size={24} className="text-gray-400" />
                System Settings
              </h2>
              <div className="text-center py-12">
                <Settings size={48} className="text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Coming Soon
                </h3>
                <p className="text-gray-400">
                  Fitur pengaturan sistem akan segera tersedia
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
