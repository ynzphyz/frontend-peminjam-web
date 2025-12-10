import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Users, FileText, Settings, ClipboardList, History, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { fetchStats } from "../../utils/api";

const AdminDashboard = () => {
  const { user } = useAuth();

  // Debug logging
  console.log("🔍 AdminDashboard - Current user:", user);
  console.log("🔍 AdminDashboard - Is admin?:", user?.role === "admin");

  const [stats, setStats] = useState([
    { label: "Total Peminjaman", value: "…", icon: FileText, color: "from-blue-500 to-blue-600" },
    { label: "Total Users", value: "…", icon: Users, color: "from-cyan-500 to-cyan-600" },
    { label: "Pending Approval", value: "…", icon: BarChart3, color: "from-orange-500 to-orange-600" },
    { label: "System Status", value: "Online", icon: Settings, color: "from-green-500 to-green-600" },
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
          { ...prev[3] },
        ]);
      } catch (_e) {
        if (!mounted) return;
        // Fallback: keep placeholders; status remains Online for UI stability
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-[#0a183d] via-[#0f1b35] to-[#1a2a4a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 rounded-2xl overflow-hidden border border-blue-500/20"
        >
          <div className="relative bg-gradient-to-r from-blue-900/40 via-blue-700/20 to-cyan-700/20 p-8 md:p-10">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-600/30 backdrop-blur"><Sparkles size={26} className="text-cyan-300"/></div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="mt-2 text-gray-300">Selamat datang, {user?.name} 👋 — kelola persetujuan dan pantau aktivitas sistem di sini.</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/form-approval" className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold hover:from-blue-700 hover:to-cyan-700 transition">
                Buka Form Approval
              </Link>
              <Link to="/riwayat" className="px-4 py-2 rounded-lg bg-blue-600/20 text-blue-200 text-sm font-semibold hover:bg-blue-600/30 transition">
                Lihat Riwayat
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-[#0f2855]/80 to-[#051530]/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-6 hover:border-blue-500/40 transition-all shadow-lg shadow-blue-900/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-300 text-sm font-medium">{stat.label}</h3>
                  <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg shadow-md`}>
                    <Icon size={20} className="text-white" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Management Tools */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-[#0f2855]/80 to-[#051530]/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-8 shadow-lg shadow-blue-900/20"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Management Tools</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/form-approval">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-6 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 hover:border-blue-500/60 transition-all text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-600/30"><ClipboardList size={18} className="text-blue-200"/></div>
                  <h3 className="text-lg font-semibold text-blue-200 group-hover:text-cyan-300 transition-colors">
                    Form Approval
                  </h3>
                </div>
                <p className="text-sm text-gray-400">Review dan setujui permohonan peminjaman</p>
              </motion.div>
            </Link>

            <Link to="/riwayat">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-6 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 hover:border-blue-500/60 transition-all text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-600/30"><History size={18} className="text-blue-200"/></div>
                  <h3 className="text-lg font-semibold text-blue-200 group-hover:text-cyan-300 transition-colors">
                    Riwayat
                  </h3>
                </div>
                <p className="text-sm text-gray-400">Lihat riwayat peminjaman dan pengembalian</p>
              </motion.div>
            </Link>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 hover:border-blue-500/60 transition-all text-left group"
            >
              <h3 className="text-lg font-semibold text-blue-200 mb-2 group-hover:text-cyan-300 transition-colors">
                Pengaturan Sistem
              </h3>
              <p className="text-sm text-gray-400">Kelola preferensi dan konfigurasi sistem</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Recent Activity & Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 p-6 bg-gradient-to-br from-[#0f2855]/60 to-[#051530]/60 border border-blue-500/20 rounded-xl shadow-md"
          >
            <h3 className="text-white font-semibold mb-4">Aktivitas Terbaru</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>• 2 pengajuan baru menunggu persetujuan</li>
              <li>• 1 pengembalian alat telah diproses</li>
              <li>• Sistem berjalan normal tanpa error</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl shadow-md"
          >
            <p className="text-gray-300 text-sm">
              <span className="font-semibold text-blue-300">Tip:</span> Gunakan tombol <span className="text-cyan-300">Form Approval</span> untuk menyetujui permohonan yang masuk dan pantau proses melalui <span className="text-cyan-300">Riwayat</span>.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
