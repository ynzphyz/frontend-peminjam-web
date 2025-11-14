import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function Riwayat() {
  const [historyData, setHistoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Semua");
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/history");
      if (!response.ok) throw new Error("Gagal mengambil data");

      const data = await response.json();
      console.log("Data dari backend:", data); // Debug

      setHistoryData(data || []);
    } catch (error) {
      console.error("Error fetching history:", error);
      toast.error("Gagal memuat data riwayat");
      setHistoryData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk konversi status backend ke label UI
  function getUiStatus(status) {
    if (!status) return "Unknown";
    const statusStr = String(status).toLowerCase();
    if (statusStr.includes("dipinjam")) return "Disetujui";
    if (statusStr.includes("menunggu")) return "Menunggu Persetujuan";
    if (statusStr.includes("tolak")) return "Ditolak";
    if (statusStr.includes("kembali")) return "Dikembalikan";
    return status;
  }

  // Filter data - debug lebih detail
  const filteredData = historyData.filter((item) => {
    const nameMatch =
      !searchTerm ||
      (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const dateMatch = !selectedDate || item.date === selectedDate;

    const uiStatus = getUiStatus(item.status);
    const statusMatch =
      selectedStatus === "Semua" || uiStatus === selectedStatus;

    // Debug log
    if (!nameMatch || !dateMatch || !statusMatch) {
      console.log("Filter result:", {
        name: item.name,
        searchTerm,
        nameMatch,
        date: item.date,
        selectedDate,
        dateMatch,
        status: item.status,
        uiStatus,
        selectedStatus,
        statusMatch,
      });
    }

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
      toast.success("Data berhasil dihapus");
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("Gagal menghapus data");
    } finally {
      setIsDeleting(false);
      setSelectedItem(null);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#0a183d] via-[#101a2b] to-[#1e293b] p-6"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#16213a]/80 backdrop-blur-xl border border-blue-900 rounded-2xl shadow-2xl p-8">
          <motion.h1 className="text-3xl font-bold text-blue-400 mb-8">
            Riwayat Peminjaman & Pengembalian Alat
          </motion.h1>

          {/* Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              placeholder="Cari berdasarkan nama..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#101a2b] border border-blue-800 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-[#101a2b] border border-blue-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-[#101a2b] border border-blue-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Semua">Semua Status</option>
              <option value="Disetujui">Disetujui</option>
              <option value="Menunggu Persetujuan">Menunggu Persetujuan</option>
              <option value="Ditolak">Ditolak</option>
              <option value="Dikembalikan">Dikembalikan</option>
            </select>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto rounded-xl border border-blue-900">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-900/50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blue-300">
                    No
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blue-300">
                    Nama
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blue-300">
                    Tanggal
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blue-300">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blue-300">
                    Jenis
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blue-300">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-900/30">
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-gray-400"
                    >
                      Memuat data...
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-gray-400"
                    >
                      Tidak ada data (Total data: {historyData.length})
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, idx) => (
                    <tr
                      key={`${item.id}-${idx}`}
                      className="hover:bg-blue-900/20"
                    >
                      <td className="px-4 py-3 text-white">{item.id}</td>
                      <td className="px-4 py-3 text-white">{item.name}</td>
                      <td className="px-4 py-3 text-white">{item.date}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${
                              getUiStatus(item.status) === "Disetujui"
                                ? "bg-green-100 text-green-800"
                                : getUiStatus(item.status) ===
                                  "Menunggu Persetujuan"
                                ? "bg-yellow-100 text-yellow-800"
                                : getUiStatus(item.status) === "Ditolak"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                        >
                          {getUiStatus(item.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white">{item.type}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setShowDeleteModal(true);
                          }}
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isDeleting && setShowDeleteModal(false)}
          >
            <motion.div
              className="bg-[#16213a]/90 border border-blue-900 rounded-xl shadow-2xl max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Header Modal */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-blue-400">
                    Konfirmasi Hapus
                  </h3>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    disabled={isDeleting}
                    className="text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
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
                  </button>
                </div>

                {/* Warning Message */}
                <div className="flex items-start gap-3 bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6">
                  <svg
                    className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-red-200">
                    Apakah Anda yakin ingin menghapus data ini? Tindakan ini
                    tidak dapat dibatalkan.
                  </p>
                </div>

                {/* Data Preview */}
                {selectedItem && (
                  <div className="bg-[#101a2b]/50 rounded-lg border border-blue-800 p-4 mb-6">
                    <h4 className="text-sm font-semibold text-blue-300 mb-4 pb-2 border-b border-blue-800">
                      Data yang akan dihapus:
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <span className="text-sm text-gray-400">No</span>
                        <span className="text-sm font-medium text-white">
                          {selectedItem.id}
                        </span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-sm text-gray-400">Nama</span>
                        <span className="text-sm font-medium text-white">
                          {selectedItem.name}
                        </span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-sm text-gray-400">Tanggal</span>
                        <span className="text-sm font-medium text-white">
                          {selectedItem.date}
                        </span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-sm text-gray-400">Status</span>
                        <span
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full
                            ${
                              getUiStatus(selectedItem.status) === "Disetujui"
                                ? "bg-green-100 text-green-800"
                                : getUiStatus(selectedItem.status) ===
                                  "Menunggu Persetujuan"
                                ? "bg-yellow-100 text-yellow-800"
                                : getUiStatus(selectedItem.status) === "Ditolak"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                        >
                          {getUiStatus(selectedItem.status)}
                        </span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-sm text-gray-400">Jenis</span>
                        <span className="text-sm font-medium text-white">
                          {selectedItem.type}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2.5 border border-blue-900 rounded-lg text-blue-400 hover:bg-blue-900/30 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isDeleting ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Menghapus...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Hapus
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
