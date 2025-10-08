import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";

export default function Riwayat() {
  const [historyData, setHistoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Semua");
  const [loading, setLoading] = useState(false);

  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  // Animasi modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } }
  };

  useEffect(() => {
    if (showDeleteModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [showDeleteModal]);

  // Fetch data function
  const fetchHistoryData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/history");
      if (!response.ok) {
        throw new Error("Gagal mengambil data");
      }
      const data = await response.json();
      setHistoryData(data);
    } catch {
      toast.error("Gagal memuat data riwayat");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoryData();
  }, []);

  // Show modal
  const openDeleteModal = (id) => {
    setDeleteId(id);
    const data = historyData.find(item => item.id === id);
    setSelectedData(data || null);
    setShowDeleteModal(true);
  };

  // Hide modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
    setDeleteLoading(false);
    setSelectedData(null);
  };

  // Delete handler with loading animation
  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/delete-history?id=${deleteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus data");
      }

      setTimeout(() => {
        toast.success("Data berhasil dihapus");
        setHistoryData(prevData => prevData.filter(item => item.id !== deleteId));
        closeDeleteModal();
      }, 700); // memberi efek loading sebentar
    } catch {
      toast.error("Terjadi kesalahan saat menghapus data");
      closeDeleteModal();
    }
  };

  // Filter data
  const filteredData = historyData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !selectedDate || item.date === selectedDate;
    let itemStatusForFilter = item.status;
    if (item.status === "Dipinjam") itemStatusForFilter = "Disetujui";
    const matchesStatus = selectedStatus === "Semua" || itemStatusForFilter === selectedStatus;
    return matchesSearch && matchesDate && matchesStatus;
  });

  // Modal content (UI sama seperti ConfirmationModal.jsx)
  const renderDeleteModalContent = () => (
    <div className="space-y-5">
      {/* Header Card with Icon */}
      <div className="flex items-center gap-4 bg-red-50 p-4 rounded-xl border border-red-200 shadow-sm">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div>
          <p className="text-xs text-red-600 font-semibold uppercase tracking-wider">ID</p>
          <p className="font-bold text-red-900 text-lg">{selectedData?.id}</p>
        </div>
      </div>

      {/* Data Info Section */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm space-y-4">
        <h4 className="font-semibold text-gray-700 border-b pb-2">Data Peminjam/Pengembali</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Nama</p>
            <p className="font-semibold text-gray-800">{selectedData?.name || '-'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Tanggal</p>
            <p className="font-semibold text-gray-800">{selectedData?.date || '-'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Status</p>
            <p className="font-semibold text-gray-800">{selectedData?.status === "Dipinjam" ? "Disetujui" : selectedData?.status}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Jenis</p>
            <p className="font-semibold text-gray-800">{selectedData?.type || '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 py-12 w-full max-w-6xl">
      {/* Search and Filter Controls */}
      <div className="w-full mb-6 flex gap-4 items-center">
        <input
          type="text"
          placeholder="Filter berdasarkan nama"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 flex-1"
        />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        />
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="Semua">Semua</option>
          <option value="Disetujui">Disetujui</option>
          <option value="Menunggu Persetujuan">Menunggu Persetujuan</option>
          <option value="Ditolak">Ditolak</option>
          <option value="Dikembalikan">Dikembalikan</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-slate-300 rounded-lg overflow-hidden shadow-lg">
        <thead>
          <tr className="bg-primary-600 text-white">
            <th className="border border-slate-300 px-4 py-3 font-semibold">No</th>
            <th className="border border-slate-300 px-4 py-3 font-semibold">Nama</th>
            <th className="border border-slate-300 px-4 py-3 font-semibold">Tanggal</th>
            <th className="border border-slate-300 px-4 py-3 font-semibold">Status</th>
            <th className="border border-slate-300 px-4 py-3 font-semibold">Jenis</th>
            <th className="border border-slate-300 px-4 py-3 font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : filteredData.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                Tidak ada data
              </td>
            </tr>
          ) : (
            filteredData.map((item, index) => (
              <tr key={`${item.id}-${index}`} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-300 px-4 py-2 text-center">{item.id}</td>
                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{item.date}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    item.status === "Dipinjam" ? "bg-green-200 text-green-900" :
                    item.status === "Dikembalikan" ? "bg-blue-100 text-blue-800" :
                    item.status === "Menunggu Persetujuan" ? "bg-yellow-100 text-yellow-800" :
                    item.status === "Ditolak" ? "bg-red-100 text-red-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {item.status === "Dipinjam" ? "Disetujui" : item.status}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">{item.type}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => openDeleteModal(item.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal Konfirmasi Hapus - UI Matching ConfirmationModal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeDeleteModal}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    Konfirmasi Hapus Data
                  </h3>
                  <button
                    onClick={closeDeleteModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Modal Content */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-4">
                    Pastikan data yang ingin dihapus sudah benar sebelum menghapus.
                  </p>
                  {renderDeleteModalContent()}
                </div>

                {/* Modal Footer */}
                <div className="flex gap-3">
                  <button
                    onClick={closeDeleteModal}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
                    disabled={deleteLoading}
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleDelete}
                    className={`flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium shadow-sm flex items-center justify-center ${deleteLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? (
                      <span className="flex items-center justify-center">
                        <span className="loader mr-2"></span>
                        Menghapus...
                      </span>
                    ) : (
                      "Hapus"
                    )}
                  </button>
                </div>
              </div>
              <style jsx>{`
                .loader {
                  border: 3px solid #f3f3f3;
                  border-top: 3px solid #e53e3e;
                  border-radius: 50%;
                  width: 18px;
                  height: 18px;
                  animation: spin 0.7s linear infinite;
                  display: inline-block;
                }
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}