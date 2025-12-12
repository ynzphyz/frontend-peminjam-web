import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Calendar,
  Package,
  User,
  Clock,
  Search,
  Check,
  X,
  FileText,
  Eye,
  RefreshCw,
} from "lucide-react";
import { API_BASE_URL } from "../../utils/api";

const Reports = () => {
  const [peminjaman, setPeminjaman] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("pending");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchPeminjaman();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPeminjaman = async () => {
    setLoading(true);
    try {
      // Get token from sessionStorage (consistent with api.js)
      let token = null;
      try {
        const user = JSON.parse(sessionStorage.getItem("user") || "{}");
        token = user?.token;
      } catch (e) {
        console.warn("Could not parse user from sessionStorage:", e);
      }
      
      if (!token) {
        console.error("No token found - User might not be logged in");
        setPeminjaman([]);
        setLoading(false);
        return;
      }

      console.log("📤 Fetching peminjaman...");
      
      const response = await fetch(`${API_BASE_URL}/peminjaman`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      
      console.log("📥 Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch peminjaman: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("✅ Received data:", result);
      
      const data = result.data || result || [];
      setPeminjaman(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("❌ Error fetching peminjaman:", error);
      setPeminjaman([]);
    } finally {
      setLoading(false);
    }
  };

  // Use useMemo to filter data automatically when dependencies change
  const filteredData = useMemo(() => {
    let filtered = peminjaman;

    // Filter by status (support both Indonesian and English)
    if (filterStatus === "pending") {
      filtered = filtered.filter((item) => 
        item.status?.toLowerCase()?.trim() === "pending"
      );
    } else if (filterStatus === "approved") {
      filtered = filtered.filter((item) => 
        item.status?.toLowerCase()?.trim() === "disetujui" || 
        item.status?.toLowerCase()?.trim() === "approved"
      );
    } else if (filterStatus === "rejected") {
      filtered = filtered.filter((item) => 
        item.status?.toLowerCase()?.trim() === "ditolak" || 
        item.status?.toLowerCase()?.trim() === "rejected"
      );
    }
    // "all" filterStatus doesn't filter anything

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.nis?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.nama_alat?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.kelas?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [peminjaman, searchTerm, filterStatus]);

  const handleApprove = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menyetujui peminjaman ini?")) return;

    setProcessingId(id);
    try {
      // Get token from sessionStorage
      let token = null;
      let userEmail = "";
      try {
        const user = JSON.parse(sessionStorage.getItem("user") || "{}");
        token = user?.token;
        userEmail = user?.email || "";
      } catch (e) {
        console.warn("Could not parse user from sessionStorage:", e);
      }

      const peminjamanItem = peminjaman.find((p) => p.id === id);
      if (!peminjamanItem) {
        alert("Data peminjaman tidak ditemukan");
        return;
      }
      
      // Create approval request (sesuai backend ApprovalRequest)
      const approvalData = {
        peminjaman_id: id,
        tanggal_persetujuan: new Date().toISOString().split("T")[0],
        nama_peminjam: peminjamanItem.nama || "",
        pembuat_persetujuan: userEmail || "Admin",
        status_persetujuan: "disetujui",
      };

      console.log("📤 Sending approval:", approvalData);

      const response = await fetch(`${API_BASE_URL}/approval`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(approvalData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Approval success:", result);
        
        // Refresh data to get updated status from server
        
        // Refresh data to get updated status from server
        await fetchPeminjaman();
        alert("✅ Peminjaman berhasil disetujui!\n\nNotifikasi WhatsApp dan surat telah dikirim.");
        setShowDetailModal(false);
      } else {
        const errorData = await response.json();
        alert(`Gagal menyetujui: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error approving:", error);
      alert("Terjadi kesalahan saat menyetujui peminjaman");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id) => {
    const reason = prompt("Masukkan alasan penolakan:");
    if (!reason) return;

    setProcessingId(id);
    try {
      // Get token from sessionStorage
      let token = null;
      let userEmail = "";
      try {
        const user = JSON.parse(sessionStorage.getItem("user") || "{}");
        token = user?.token;
        userEmail = user?.email || "";
      } catch (e) {
        console.warn("Could not parse user from sessionStorage:", e);
      }

      const peminjamanItem = peminjaman.find((p) => p.id === id);
      if (!peminjamanItem) {
        alert("Data peminjaman tidak ditemukan");
        return;
      }

      // Create approval request with rejected status (sesuai backend)
      const approvalData = {
        peminjaman_id: id,
        tanggal_persetujuan: new Date().toISOString().split("T")[0],
        nama_peminjam: peminjamanItem.nama || "",
        pembuat_persetujuan: userEmail || "Admin",
        status_persetujuan: "ditolak",
        alasan: reason, // Include reason
      };

      console.log("📤 Sending rejection:", approvalData);

      const response = await fetch(`${API_BASE_URL}/approval`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(approvalData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Rejection success:", result);

        // Refresh data to get updated status from server
        await fetchPeminjaman();
        alert(`❌ Peminjaman berhasil ditolak!\n\nAlasan: ${reason}\n\nNotifikasi WhatsApp telah dikirim.`);
        setShowDetailModal(false);
      } else {
        const errorData = await response.json();
        alert(`Gagal menolak: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error rejecting:", error);
      alert("Terjadi kesalahan saat menolak peminjaman");
    } finally {
      setProcessingId(null);
    }
  };

  const viewDetail = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        bg: "bg-orange-500/20",
        text: "text-orange-400",
        border: "border-orange-500/40",
        label: "Menunggu",
      },
      disetujui: {
        bg: "bg-green-500/20",
        text: "text-green-400",
        border: "border-green-500/40",
        label: "Disetujui",
      },
      approved: {
        bg: "bg-green-500/20",
        text: "text-green-400",
        border: "border-green-500/40",
        label: "Disetujui",
      },
      ditolak: {
        bg: "bg-red-500/20",
        text: "text-red-400",
        border: "border-red-500/40",
        label: "Ditolak",
      },
      rejected: {
        bg: "bg-red-500/20",
        text: "text-red-400",
        border: "border-red-500/40",
        label: "Ditolak",
      },
    };

    const config = statusConfig[status?.toLowerCase()?.trim()] || statusConfig.pending;
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#0f2855]/80 to-[#051530]/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
              <Bell size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Laporan Peminjaman
              </h1>
              <p className="text-gray-400 text-sm">
                Kelola dan setujui permintaan peminjaman
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Stats Summary */}
            <div className="flex items-center gap-2">
              <div className="px-3 py-2 bg-blue-500/20 border border-blue-500/40 rounded-lg">
                <p className="text-blue-400 text-xs font-semibold">
                  Total: {peminjaman.length}
                </p>
              </div>
              <div className="px-3 py-2 bg-green-500/20 border border-green-500/40 rounded-lg">
                <p className="text-green-400 text-xs font-semibold">
                  Disetujui: {peminjaman.filter((item) => 
                    item.status?.toLowerCase()?.trim() === "disetujui" || 
                    item.status?.toLowerCase()?.trim() === "approved"
                  ).length}
                </p>
              </div>
              <div className="px-3 py-2 bg-red-500/20 border border-red-500/40 rounded-lg">
                <p className="text-red-400 text-xs font-semibold">
                  Ditolak: {peminjaman.filter((item) => 
                    item.status?.toLowerCase()?.trim() === "ditolak" || 
                    item.status?.toLowerCase()?.trim() === "rejected"
                  ).length}
                </p>
              </div>
            </div>

            {/* Refresh Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchPeminjaman}
              disabled={loading}
              className="p-3 bg-blue-600/20 border border-blue-500/40 rounded-lg hover:bg-blue-600/30 transition disabled:opacity-50"
            >
              <RefreshCw size={20} className={`text-blue-400 ${loading ? 'animate-spin' : ''}`} />
            </motion.button>

            {/* Pending Badge */}
            {peminjaman.filter((item) => 
              item.status?.toLowerCase()?.trim() === "pending"
            ).length > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-4 py-2 bg-orange-500/20 border border-orange-500/40 rounded-xl"
              >
                <p className="text-orange-400 font-semibold">
                  {peminjaman.filter((item) => 
                    item.status?.toLowerCase()?.trim() === "pending"
                  ).length}{" "}
                  Pending
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Cari nama, NIS, alat, atau kelas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#0a1628]/80 border border-blue-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus("pending")}
              className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                filterStatus === "pending"
                  ? "bg-gradient-to-r from-orange-600 to-red-600 text-white"
                  : "bg-[#0a1628]/80 border border-blue-500/30 text-gray-400 hover:border-blue-500/60"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus("approved")}
              className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                filterStatus === "approved"
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                  : "bg-[#0a1628]/80 border border-blue-500/30 text-gray-400 hover:border-blue-500/60"
              }`}
            >
              Disetujui
            </button>
            <button
              onClick={() => setFilterStatus("rejected")}
              className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                filterStatus === "rejected"
                  ? "bg-gradient-to-r from-red-600 to-pink-600 text-white"
                  : "bg-[#0a1628]/80 border border-blue-500/30 text-gray-400 hover:border-blue-500/60"
              }`}
            >
              Ditolak
            </button>
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                filterStatus === "all"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                  : "bg-[#0a1628]/80 border border-blue-500/30 text-gray-400 hover:border-blue-500/60"
              }`}
            >
              Semua
            </button>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500/30 border-t-blue-500"></div>
        </div>
      ) : filteredData.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-[#0f2855]/80 to-[#051530]/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-12 text-center shadow-lg"
        >
          <CheckCircle size={64} className="text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">
            Tidak Ada Data
          </h3>
          <p className="text-gray-400">
            {filterStatus === "pending"
              ? "Semua peminjaman sudah diproses"
              : `Tidak ada peminjaman dengan status ${filterStatus}`}
          </p>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          {filteredData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-gradient-to-br from-[#0f2855]/80 to-[#051530]/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all shadow-lg overflow-hidden group"
            >
              <div className="p-6">
                {/* Header Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {item.nama?.charAt(0) || "?"}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        {item.nama}
                        {getStatusBadge(item.status)}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          NIS: {item.nis}
                        </span>
                        <span>•</span>
                        <span>Kelas: {item.kelas}</span>
                      </div>
                    </div>
                  </div>

                  {item.status === "pending" && (
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleApprove(item.id)}
                        disabled={processingId === item.id}
                        className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <Check size={18} />
                        Setujui
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleReject(item.id)}
                        disabled={processingId === item.id}
                        className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <X size={18} />
                        Tolak
                      </motion.button>
                    </div>
                  )}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-blue-600/10 rounded-lg p-3 border border-blue-500/20">
                    <div className="flex items-center gap-2 text-blue-400 mb-1">
                      <Package size={16} />
                      <p className="text-xs font-semibold uppercase">Alat</p>
                    </div>
                    <p className="text-white font-semibold">{item.nama_alat}</p>
                  </div>

                  <div className="bg-purple-600/10 rounded-lg p-3 border border-purple-500/20">
                    <div className="flex items-center gap-2 text-purple-400 mb-1">
                      <FileText size={16} />
                      <p className="text-xs font-semibold uppercase">Jumlah</p>
                    </div>
                    <p className="text-white font-semibold">
                      {item.jumlah_alat} unit
                    </p>
                  </div>

                  <div className="bg-cyan-600/10 rounded-lg p-3 border border-cyan-500/20">
                    <div className="flex items-center gap-2 text-cyan-400 mb-1">
                      <Calendar size={16} />
                      <p className="text-xs font-semibold uppercase">
                        Peminjaman
                      </p>
                    </div>
                    <p className="text-white font-semibold text-sm">
                      {item.tanggal_peminjaman}
                    </p>
                  </div>

                  <div className="bg-orange-600/10 rounded-lg p-3 border border-orange-500/20">
                    <div className="flex items-center gap-2 text-orange-400 mb-1">
                      <Clock size={16} />
                      <p className="text-xs font-semibold uppercase">
                        Pengembalian
                      </p>
                    </div>
                    <p className="text-white font-semibold text-sm">
                      {item.tanggal_pengembalian}
                    </p>
                  </div>
                </div>

                {/* Keperluan */}
                {item.keperluan && (
                  <div className="bg-[#0a1628]/50 rounded-lg p-4 border border-blue-500/20">
                    <p className="text-xs text-gray-400 uppercase mb-1 font-semibold">
                      Keperluan
                    </p>
                    <p className="text-gray-300 text-sm">{item.keperluan}</p>
                  </div>
                )}

                {/* View Detail Button */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => viewDetail(item)}
                    className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-400 rounded-lg font-semibold transition-all flex items-center gap-2"
                  >
                    <Eye size={16} />
                    Lihat Detail
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowDetailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-[#0f2855] to-[#051530] rounded-2xl border border-blue-500/30 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl scrollbar-hide"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Detail Peminjaman
                  </h2>
                  <p className="text-gray-400">ID: {selectedItem.id}</p>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-red-600/20 rounded-lg transition"
                >
                  <X size={24} className="text-gray-400 hover:text-red-400" />
                </button>
              </div>

              {/* Status Badge */}
              <div className="mb-6">{getStatusBadge(selectedItem.status)}</div>

              {/* Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">
                      Nama Peminjam
                    </p>
                    <p className="text-white font-semibold">
                      {selectedItem.nama}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">NIS</p>
                    <p className="text-white font-semibold">
                      {selectedItem.nis}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">
                      Kelas
                    </p>
                    <p className="text-white font-semibold">
                      {selectedItem.kelas}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">
                      Nomor Telepon
                    </p>
                    <p className="text-white font-semibold">
                      {selectedItem.no_wa || selectedItem.nomor_telepon || "-"}
                    </p>
                  </div>
                </div>

                <hr className="border-blue-500/20" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">
                      Nama Alat
                    </p>
                    <p className="text-white font-semibold">
                      {selectedItem.nama_alat}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">
                      Jumlah Alat
                    </p>
                    <p className="text-white font-semibold">
                      {selectedItem.jumlah_alat} unit
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">
                      Tanggal Peminjaman
                    </p>
                    <p className="text-white font-semibold">
                      {selectedItem.tanggal_peminjaman}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">
                      Tanggal Pengembalian
                    </p>
                    <p className="text-white font-semibold">
                      {selectedItem.tanggal_pengembalian}
                    </p>
                  </div>
                </div>

                {selectedItem.keperluan && (
                  <>
                    <hr className="border-blue-500/20" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">
                        Keperluan
                      </p>
                      <p className="text-gray-300">{selectedItem.keperluan}</p>
                    </div>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              {selectedItem.status === "pending" && (
                <div className="flex gap-3 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleApprove(selectedItem.id)}
                    disabled={processingId === selectedItem.id}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Check size={20} />
                    {processingId === selectedItem.id
                      ? "Memproses..."
                      : "Setujui Peminjaman"}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleReject(selectedItem.id)}
                    disabled={processingId === selectedItem.id}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <X size={20} />
                    {processingId === selectedItem.id
                      ? "Memproses..."
                      : "Tolak Peminjaman"}
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Reports;
