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
    setLoading(true);
    fetch("http://localhost:8080/history")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data");
        return res.json();
      })
      .then((data) => setHistoryData(data))
      .catch(() => toast.error("Gagal memuat data riwayat"))
      .finally(() => setLoading(false));
  }, []);

  // Pencarian nama: substring, case insensitive
  function matchName(name, term) {
    if (!term) return true;
    return name.toLowerCase().includes(term.toLowerCase());
  }

  const filteredData = historyData.filter((item) => {
    // Nama: persis
    const nameMatch = matchName(item.name, searchTerm);

    // Tanggal
    const dateMatch = !selectedDate || item.date === selectedDate;

    // Status
    const itemStatus = item.status === "Dipinjam" ? "Disetujui" : item.status;
    const statusMatch =
      selectedStatus === "Semua" || itemStatus === selectedStatus;

    return nameMatch && dateMatch && statusMatch;
  });

  // Hapus data
  const handleDelete = async () => {
    if (!selectedItem) return;
    setIsDeleting(true);
    try {
      const res = await fetch(
        `http://localhost:8080/delete-history?id=${selectedItem.id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error();
      setHistoryData((prev) =>
        prev.filter((item) => item.id !== selectedItem.id)
      );
      toast.success("Data berhasil dihapus");
      setShowDeleteModal(false);
    } catch {
      toast.error("Gagal menghapus data");
    } finally {
      setIsDeleting(false);
      setSelectedItem(null);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#0a183d] via-[#101a2b] to-[#1e293b] p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#16213a]/80 backdrop-blur-xl border border-blue-900 rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-blue-400 mb-8">
            Riwayat Peminjaman & Pengembalian Alat
          </h1>
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
                      Tidak ada data
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-blue-900/20">
                      <td className="px-4 py-3 text-white">{item.id}</td>
                      <td className="px-4 py-3 text-white">{item.name}</td>
                      <td className="px-4 py-3 text-white">{item.date}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${
                            item.status === "Dipinjam"
                              ? "bg-green-100 text-green-800"
                              : item.status === "Menunggu Persetujuan"
                              ? "bg-yellow-100 text-yellow-800"
                              : item.status === "Ditolak"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {item.status === "Dipinjam"
                            ? "Disetujui"
                            : item.status}
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
              className="bg-[#16213a]/90 border border-blue-900 rounded-xl shadow-2xl max-w-md w-full mx-4 flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-blue-400">
                    Konfirmasi Hapus
                  </h3>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="text-blue-300 hover:text-blue-400 transition-colors duration-200"
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
                <div className="space-y-5">
                  <div className="flex items-center gap-4 bg-red-900/10 p-4 rounded-xl border border-red-300 shadow-sm">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                      <svg
                        className="w-6 h-6 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-red-200">
                      Apakah Anda yakin ingin menghapus data ini? Tindakan ini
                      tidak dapat dibatalkan.
                    </p>
                  </div>
                  {selectedItem && (
                    <div className="bg-[#16213a]/70 rounded-xl p-4 border border-blue-900 shadow space-y-4">
                      <h4 className="font-semibold text-blue-400 border-b border-blue-900/50 pb-2">
                        Data yang akan dihapus
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-blue-300 mb-1">Nama</p>
                          <p className="font-semibold text-white">
                            {selectedItem.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-blue-300 mb-1">Tanggal</p>
                          <p className="font-semibold text-white">
                            {selectedItem.date}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-blue-300 mb-1">Status</p>
                          <p className="font-semibold text-white">
                            {selectedItem.status === "Dipinjam"
                              ? "Disetujui"
                              : selectedItem.status}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-blue-300 mb-1">Jenis</p>
                          <p className="font-semibold text-white">
                            {selectedItem.type}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2.5 border border-blue-900 rounded-lg text-blue-400 hover:bg-blue-900/30 transition-colors duration-200 font-medium"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium shadow-sm flex items-center justify-center"
                  >
                    {isDeleting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      </span>
                    ) : (
                      "Hapus"
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
