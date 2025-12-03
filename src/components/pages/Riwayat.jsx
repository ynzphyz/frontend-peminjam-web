import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom";
import { Trash2, RefreshCw, Search, X } from "lucide-react";

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
  exit: {
    opacity: 0,
    x: 20,
  },
};

export default function Riwayat() {
  const [historyData, setHistoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Semua");
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      console.log("🔍 Fetching dari: http://localhost:8080/history");

      const response = await fetch("http://localhost:8080/history");
      if (!response.ok) throw new Error("Gagal mengambil data");

      const data = await response.json();
      console.log("✅ Data dari backend:", data);

      setHistoryData(data || []);
    } catch (error) {
      console.error("❌ Error fetching history:", error);
      toast.error("Gagal memuat data riwayat");
      setHistoryData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDetailData = async (id) => {
    setDetailLoading(true);
    try {
      console.log(
        "🔍 Fetching detail dari: http://localhost:8080/get-peminjam-data?id=" +
          id
      );

      const response = await fetch(
        `http://localhost:8080/get-peminjam-data?id=${id}`
      );
      if (!response.ok) throw new Error("Gagal mengambil detail data");

      const data = await response.json();
      console.log("✅ Detail data:", data);

      setDetailData(data);
      setShowDetailModal(true);
    } catch (error) {
      console.error("❌ Error fetching detail:", error);
      toast.error("Gagal memuat detail data");
    } finally {
      setDetailLoading(false);
    }
  };

  // Fungsi untuk konversi status backend ke label UI
  function getUiStatus(status) {
    if (!status) return "Menunggu";
    const statusStr = String(status).toLowerCase();
    if (statusStr.includes("dipinjam") || statusStr.includes("approved"))
      return "Disetujui";
    if (statusStr.includes("menunggu") || statusStr.includes("pending"))
      return "Menunggu Persetujuan";
    if (statusStr.includes("tolak") || statusStr.includes("rejected"))
      return "Ditolak";
    if (statusStr.includes("kembali") || statusStr.includes("dikembalikan"))
      return "Dikembalikan";
    return status;
  }

  // Filter data
  const filteredData = historyData.filter((item) => {
    const nameMatch =
      !searchTerm ||
      (item.name &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.namaAlat &&
        item.namaAlat.toLowerCase().includes(searchTerm.toLowerCase()));

    const dateMatch = !selectedDate || item.date === selectedDate;

    const uiStatus = getUiStatus(item.status);
    const statusMatch =
      selectedStatus === "Semua" || uiStatus === selectedStatus;

    return nameMatch && dateMatch && statusMatch;
  });

  const handleDelete = async () => {
    if (!selectedItem) return;
    setIsDeleting(true);
    try {
      const response = await fetch(
        `http://localhost:8080/delete-history?id=${selectedItem.id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Gagal menghapus");

      setHistoryData((prev) =>
        prev.filter((item) => item.id !== selectedItem.id)
      );
      toast.success("✅ Data berhasil dihapus");
      setShowDeleteModal(false);
    } catch (error) {
      console.error("❌ Error deleting:", error);
      toast.error("❌ Gagal menghapus data");
    } finally {
      setIsDeleting(false);
      setSelectedItem(null);
    }
  };

  // Get status color & icon
  const getStatusBadge = (status) => {
    const uiStatus = getUiStatus(status);

    if (uiStatus === "Disetujui") {
      return {
        color: "bg-green-900/30 border-green-500/30 text-green-300",
        icon: "✓",
      };
    } else if (uiStatus === "Menunggu Persetujuan") {
      return {
        color: "bg-yellow-900/30 border-yellow-500/30 text-yellow-300",
        icon: "⏳",
      };
    } else if (uiStatus === "Ditolak") {
      return {
        color: "bg-red-900/30 border-red-500/30 text-red-300",
        icon: "✗",
      };
    } else if (uiStatus === "Dikembalikan") {
      return {
        color: "bg-blue-900/30 border-blue-500/30 text-blue-300",
        icon: "↩️",
      };
    }
    return {
      color: "bg-blue-900/30 border-blue-500/30 text-blue-300",
      icon: "●",
    };
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#0a183d] via-[#101a2b] to-[#1e293b] p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div className="mb-8" variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Riwayat Peminjaman
            </span>
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mb-4" />
          <p className="text-gray-300 text-lg">
            Kelola semua history peminjaman & pengembalian alat Anda
          </p>
        </motion.div>

        {/* Filter Section - Top */}
        <motion.div
          className="mb-8 grid grid-cols-1 md:grid-cols-12 gap-4"
          variants={itemVariants}
        >
          {/* Search Bar */}
          <motion.div
            className="md:col-span-6 relative"
            whileHover={{ scale: 1.02 }}
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
            <input
              type="text"
              placeholder="Cari nama, alat, atau ID peminjaman..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#0f3460]/50 border border-blue-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </motion.div>

          {/* Status Filter */}
          <motion.div className="md:col-span-3" variants={itemVariants}>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-6 py-3 bg-[#0f3460]/50 border border-blue-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 cursor-pointer"
            >
              <option value="Semua">Semua Status</option>
              <option value="Disetujui">✓ Disetujui</option>
              <option value="Menunggu Persetujuan">⏳ Menunggu</option>
              <option value="Ditolak">✗ Ditolak</option>
              <option value="Dikembalikan">↩️ Dikembalikan</option>
            </select>
          </motion.div>

          {/* Refresh Button */}
          <motion.div className="md:col-span-3 w-full" variants={itemVariants}>
            <motion.button
              onClick={fetchHistory}
              disabled={loading}
              className="w-full px-4 md:px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/50 whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
              <span className="hidden md:inline">Refresh</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Date Filter */}
        <motion.div className="mb-8" variants={itemVariants}>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full md:w-64 px-4 py-3 bg-[#0f3460]/50 border border-blue-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
          {selectedDate && (
            <motion.button
              onClick={() => setSelectedDate("")}
              className="mt-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              ✕ Hapus filter tanggal
            </motion.button>
          )}
        </motion.div>

        {/* Main Card */}
        <motion.div
          className="bg-[#16213a]/80 backdrop-blur-xl border border-blue-900 rounded-2xl shadow-2xl p-8"
          variants={itemVariants}
        >
          {/* Cards Section */}
          <motion.div className="space-y-4" variants={containerVariants}>
            {loading ? (
              <motion.div
                className="flex items-center justify-center py-20"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="text-gray-400 font-semibold">
                  ⏳ Memuat data...
                </span>
              </motion.div>
            ) : filteredData.length === 0 ? (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-400 text-lg">
                  📭 Tidak ada data ({historyData.length} total)
                </p>
              </motion.div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredData.map((item, idx) => {
                  const statusBadge = getStatusBadge(item.status);
                  return (
                    <motion.div
                      key={`${item.id}-${idx}`}
                      className="bg-gradient-to-r from-[#0f3460]/50 to-[#101a2b]/50 border border-blue-900/30 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 group"
                      custom={idx}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Left Content */}
                        <div className="flex-1 space-y-3">
                          <div className="space-y-1">
                            <h3 className="text-lg font-bold text-white">
                              {item.name || "Tidak Diketahui"}
                            </h3>
                            <p className="text-sm text-gray-400">
                              🆔 ID:{" "}
                              <span className="text-blue-300 font-semibold">
                                {item.id}
                              </span>
                            </p>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                            <div className="text-gray-400">
                              🔧{" "}
                              <span className="text-gray-300">
                                {item.namaAlat || "-"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <span>📅</span>
                              <span className="text-gray-300">{item.date}</span>
                            </div>
                            <div className="text-gray-400">
                              📋{" "}
                              <span className="text-gray-300">{item.type}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status & Actions */}
                        <div className="flex items-center gap-4 md:flex-col md:items-end">
                          <motion.span
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${statusBadge.color}`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {statusBadge.icon} {getUiStatus(item.status)}
                          </motion.span>

                          {/* Tombol Lihat Detail */}
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDetailData(null);
                              setShowDetailModal(true);
                              fetchDetailData(item.id);
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/50 text-blue-300 rounded-lg font-semibold transition-all text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            👁️ Lihat Detail
                          </motion.button>

                          {/* Tombol Hapus */}
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedItem(item);
                              setShowDeleteModal(true);
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/40 border border-red-500/50 text-red-300 rounded-lg font-semibold transition-all text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Trash2 size={16} />
                            Hapus
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </motion.div>

          {/* Stats */}
          {historyData.length > 0 && (
            <motion.div
              className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-blue-900/30"
              variants={containerVariants}
            >
              {[
                {
                  label: "Total",
                  value: historyData.length,
                  icon: "📊",
                  color: "from-blue-600 to-blue-400",
                },
                {
                  label: "Disetujui",
                  value: historyData.filter(
                    (d) => getUiStatus(d.status) === "Disetujui"
                  ).length,
                  icon: "✓",
                  color: "from-green-600 to-green-400",
                },
                {
                  label: "Menunggu",
                  value: historyData.filter(
                    (d) => getUiStatus(d.status) === "Menunggu Persetujuan"
                  ).length,
                  icon: "⏳",
                  color: "from-yellow-600 to-yellow-400",
                },
                {
                  label: "Ditolak",
                  value: historyData.filter(
                    (d) => getUiStatus(d.status) === "Ditolak"
                  ).length,
                  icon: "✗",
                  color: "from-red-600 to-red-400",
                },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="bg-[#101a2b]/50 border border-blue-800 rounded-lg p-4 text-center"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <p className="text-gray-400 text-xs font-semibold mb-1">
                    {stat.label}
                  </p>
                  <p
                    className={`text-2xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    {stat.icon} {stat.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Detail Modal - Portal */}
      {ReactDOM.createPortal(
        <AnimatePresence>
          {showDetailModal && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => !detailLoading && setShowDetailModal(false)}
            >
              <motion.div
                className="bg-[#16213a]/90 border border-blue-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <motion.h3
                      className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      📋 Detail Peminjaman
                    </motion.h3>
                    <motion.button
                      onClick={() => setShowDetailModal(false)}
                      disabled={detailLoading}
                      className="text-gray-400 hover:text-gray-300 transition-colors disabled:opacity-50"
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.button>
                  </div>

                  {detailLoading ? (
                    <motion.div
                      className="flex items-center justify-center py-20"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span className="text-gray-400 font-semibold">
                        ⏳ Memuat detail...
                      </span>
                    </motion.div>
                  ) : detailData ? (
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      {/* Row 1: Nama & ID */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#101a2b]/50 border border-blue-800 rounded-lg p-4">
                          <p className="text-sm text-gray-400 mb-1">
                            📝 Nama Peminjam
                          </p>
                          <p className="text-lg font-semibold text-white">
                            {detailData.nama || "-"}
                          </p>
                        </div>
                        <div className="bg-[#101a2b]/50 border border-blue-800 rounded-lg p-4">
                          <p className="text-sm text-gray-400 mb-1">
                            🆔 ID Peminjaman
                          </p>
                          <p className="text-lg font-semibold text-blue-300">
                            {detailData.id || "-"}
                          </p>
                        </div>
                      </div>

                      {/* Row 2: Kelas & NIS */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#101a2b]/50 border border-blue-800 rounded-lg p-4">
                          <p className="text-sm text-gray-400 mb-1">🏫 Kelas</p>
                          <p className="text-lg font-semibold text-white">
                            {detailData.kelas || "-"}
                          </p>
                        </div>
                        <div className="bg-[#101a2b]/50 border border-blue-800 rounded-lg p-4">
                          <p className="text-sm text-gray-400 mb-1">🔢 NIS</p>
                          <p className="text-lg font-semibold text-white">
                            {detailData.nis || "-"}
                          </p>
                        </div>
                      </div>

                      {/* Row 3: Nama Alat & Jumlah */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#101a2b]/50 border border-blue-800 rounded-lg p-4">
                          <p className="text-sm text-gray-400 mb-1">
                            🔧 Nama Alat
                          </p>
                          <p className="text-lg font-semibold text-white">
                            {detailData.namaAlat || "-"}
                          </p>
                        </div>
                        <div className="bg-[#101a2b]/50 border border-blue-800 rounded-lg p-4">
                          <p className="text-sm text-gray-400 mb-1">
                            📦 Jumlah Alat
                          </p>
                          <p className="text-lg font-semibold text-white">
                            {detailData.jumlahAlat || "-"} unit
                          </p>
                        </div>
                      </div>

                      {/* Row 4: Tanggal Pinjam & Kembali */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#101a2b]/50 border border-blue-800 rounded-lg p-4">
                          <p className="text-sm text-gray-400 mb-1">
                            📅 Tanggal Pinjam
                          </p>
                          <p className="text-lg font-semibold text-white">
                            {detailData.tanggalPinjam || "-"}
                          </p>
                        </div>
                        <div className="bg-[#101a2b]/50 border border-blue-800 rounded-lg p-4">
                          <p className="text-sm text-gray-400 mb-1">
                            📆 Tanggal Kembali
                          </p>
                          <p className="text-lg font-semibold text-white">
                            {detailData.tanggalKembali || "-"}
                          </p>
                        </div>
                      </div>

                      {/* Row 5: Lama Pinjam & No WA */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#101a2b]/50 border border-blue-800 rounded-lg p-4">
                          <p className="text-sm text-gray-400 mb-1">
                            ⏱️ Lama Pinjam
                          </p>
                          <p className="text-lg font-semibold text-white">
                            {detailData.lamaPinjam || "-"}
                          </p>
                        </div>
                        <div className="bg-[#101a2b]/50 border border-blue-800 rounded-lg p-4">
                          <p className="text-sm text-gray-400 mb-1">
                            📱 No. WhatsApp
                          </p>
                          <p className="text-lg font-semibold text-white">
                            {detailData.noWA || "-"}
                          </p>
                        </div>
                      </div>

                      {/* Row 6: Keterangan - Full Width */}
                      <div className="bg-[#101a2b]/50 border border-blue-800 rounded-lg p-4">
                        <p className="text-sm text-gray-400 mb-1">
                          📝 Keterangan
                        </p>
                        <p className="text-lg text-white">
                          {detailData.keterangan || "-"}
                        </p>
                      </div>

                      {/* Status Section - Full Width */}
                      {(detailData.approvalStatus ||
                        detailData.approvalDate ||
                        detailData.approverName) && (
                        <motion.div
                          className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-700 rounded-lg p-4 mt-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <p className="text-sm font-semibold text-blue-300 mb-3">
                            ✅ Informasi Persetujuan
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-xs text-gray-400 mb-1">
                                Status Persetujuan
                              </p>
                              <p className="text-white font-semibold">
                                {detailData.approvalStatus || "-"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 mb-1">
                                Tanggal Persetujuan
                              </p>
                              <p className="text-white font-semibold">
                                {detailData.approvalDate || "-"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 mb-1">
                                Pemberi Persetujuan
                              </p>
                              <p className="text-white font-semibold">
                                {detailData.approverName || "-"}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Close Button */}
                      <motion.button
                        onClick={() => setShowDetailModal(false)}
                        className="w-full mt-6 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg font-semibold transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Tutup
                      </motion.button>
                    </motion.div>
                  ) : null}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Delete Modal - Portal */}
      {ReactDOM.createPortal(
        <AnimatePresence>
          {showDeleteModal && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => !isDeleting && setShowDeleteModal(false)}
            >
              <motion.div
                className="bg-[#16213a]/90 border border-blue-900 rounded-xl shadow-2xl max-w-md w-full"
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <motion.h3
                      className="text-xl font-bold text-blue-400"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      ⚠️ Konfirmasi Hapus
                    </motion.h3>
                    <motion.button
                      onClick={() => setShowDeleteModal(false)}
                      disabled={isDeleting}
                      className="text-gray-400 hover:text-gray-300 transition-colors"
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      ✕
                    </motion.button>
                  </div>

                  {/* Warning */}
                  <motion.div
                    className="flex items-start gap-3 bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <span className="text-2xl flex-shrink-0">🗑️</span>
                    <p className="text-sm text-red-200">
                      Apakah Anda yakin ingin menghapus data ini? Tindakan ini
                      tidak dapat dibatalkan.
                    </p>
                  </motion.div>

                  {/* Data Preview */}
                  {selectedItem && (
                    <motion.div
                      className="bg-[#101a2b]/50 border border-blue-800 rounded-lg p-4 mb-6 space-y-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-gray-400">ID:</span>
                        <span className="text-sm font-semibold text-white">
                          {selectedItem.id}
                        </span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-gray-400">Nama:</span>
                        <span className="text-sm font-semibold text-white">
                          {selectedItem.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-gray-400">Alat:</span>
                        <span className="text-sm font-semibold text-white">
                          {selectedItem.namaAlat || "-"}
                        </span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-gray-400">Tanggal:</span>
                        <span className="text-sm font-semibold text-white">
                          {selectedItem.date}
                        </span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-gray-400">Status:</span>
                        <span
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                            getStatusBadge(selectedItem.status).color
                          }`}
                        >
                          {getUiStatus(selectedItem.status)}
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <motion.div
                    className="flex gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <motion.button
                      onClick={() => setShowDeleteModal(false)}
                      disabled={isDeleting}
                      className="flex-1 px-4 py-2.5 border border-blue-900 rounded-lg text-blue-400 hover:bg-blue-900/30 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Batal
                    </motion.button>
                    <motion.button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isDeleting ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            ⟳
                          </motion.span>
                          Menghapus...
                        </>
                      ) : (
                        <>🗑️ Hapus Data</>
                      )}
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  );
}
