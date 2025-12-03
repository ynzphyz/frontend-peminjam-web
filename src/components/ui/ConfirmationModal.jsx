import React, { useEffect } from "react";
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  formData,
  title,
  type,
}) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, y: 20, transition: { duration: 0.2 } },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const renderFormData = () => {
    switch (type) {
      case "approval":
        return (
          <div className="space-y-4">
            {/* Header with Icon */}
            <motion.div
              className="flex items-center gap-4 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 p-4 rounded-xl border border-blue-600/50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600/30 border border-blue-500">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-blue-300 font-semibold uppercase tracking-wider">
                  ID Peminjaman
                </p>
                <p className="font-bold text-blue-200 text-lg">
                  {formData?.idPinjam || "-"}
                </p>
              </div>
            </motion.div>

            {/* Peminjam Info */}
            {formData?.peminjamData && (
              <motion.div
                className="bg-[#0f3460]/50 rounded-xl p-4 border border-blue-700/50 space-y-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <h4 className="font-semibold text-blue-300 border-b border-blue-700/50 pb-2">
                  📋 Data Peminjam
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Nama</p>
                    <p className="font-semibold text-white">
                      {formData.peminjamData.nama || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Kelas</p>
                    <p className="font-semibold text-white">
                      {formData.peminjamData.kelas || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Alat</p>
                    <p className="font-semibold text-white">
                      {formData.peminjamData.namaAlat || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Jumlah</p>
                    <p className="font-semibold text-white">
                      {formData.peminjamData.jumlahAlat || "-"}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Approval Info */}
            <motion.div
              className="bg-[#0f3460]/50 rounded-xl p-4 border border-blue-700/50 space-y-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-semibold text-blue-300 border-b border-blue-700/50 pb-2">
                ✅ Informasi Persetujuan
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Approver</p>
                  <p className="font-semibold text-white">
                    {formData?.approver || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Status</p>
                  <p className="font-semibold text-cyan-300">
                    {formData?.statusPersetujuan || "-"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        );

      case "pengembalian":
        return (
          <div className="space-y-4">
            {/* Header with Icon */}
            <motion.div
              className="flex items-center gap-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 p-4 rounded-xl border border-green-600/50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-600/30 border border-green-500">
                <svg
                  className="w-6 h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-green-300 font-semibold uppercase tracking-wider">
                  ID Peminjaman
                </p>
                <p className="font-bold text-green-200 text-lg">
                  {formData?.idPeminjaman || "-"}
                </p>
              </div>
            </motion.div>

            {/* Peminjam Info */}
            {formData?.peminjamData && (
              <motion.div
                className="bg-[#0f3460]/50 rounded-xl p-4 border border-blue-700/50 space-y-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <h4 className="font-semibold text-blue-300 border-b border-blue-700/50 pb-2">
                  📋 Data Peminjaman
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Nama</p>
                    <p className="font-semibold text-white">
                      {formData.peminjamData.nama || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Alat</p>
                    <p className="font-semibold text-white">
                      {formData.peminjamData.namaAlat || "-"}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Kondisi Alat */}
            <motion.div
              className="bg-[#0f3460]/50 rounded-xl p-4 border border-blue-700/50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-xs text-gray-400 mb-2">🔧 Kondisi Alat</p>
              <p className="font-semibold text-white">
                {formData?.kondisiAlat || "-"}
              </p>
            </motion.div>

            {/* Keterangan if exists */}
            {formData?.keteranganPengembalian && (
              <motion.div
                className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-xl p-4 border border-blue-700/50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <p className="text-xs text-gray-400 mb-2">📝 Keterangan</p>
                <p className="text-white">{formData.keteranganPengembalian}</p>
              </motion.div>
            )}
          </div>
        );

      case "peminjaman":
        return (
          <div className="space-y-4">
            {/* Header Card with Icon */}
            <motion.div
              className="flex items-center gap-4 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 p-4 rounded-xl border border-blue-600/50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600/30 border border-blue-500">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-blue-300 font-semibold uppercase tracking-wider">
                  ID Peminjaman
                </p>
                <p className="font-bold text-blue-200 text-lg">
                  {formData?.idPinjam || (
                    <span className="italic text-blue-400 text-sm">
                      Belum di-generate
                    </span>
                  )}
                </p>
              </div>
            </motion.div>

            {/* Personal Info Section */}
            <motion.div
              className="bg-[#0f3460]/50 rounded-xl p-4 border border-blue-700/50 space-y-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <h4 className="font-semibold text-blue-300 border-b border-blue-700/50 pb-2">
                👤 Informasi Peminjam
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Nama</p>
                  <p className="font-semibold text-white">
                    {formData?.nama || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Kelas</p>
                  <p className="font-semibold text-white">
                    {formData?.kelas || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">NIS</p>
                  <p className="font-semibold text-white">
                    {formData?.nis || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">No. WhatsApp</p>
                  <p className="font-semibold text-white">
                    {formData?.noWa || "-"}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Equipment Info Section */}
            <motion.div
              className="bg-[#0f3460]/50 rounded-xl p-4 border border-blue-700/50 space-y-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-semibold text-blue-300 border-b border-blue-700/50 pb-2">
                🔧 Detail Peminjaman
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Nama Alat</p>
                  <p className="font-semibold text-white">
                    {formData?.namaAlat || "-"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Tanggal Pinjam</p>
                    <p className="font-semibold text-white">
                      {formData?.tanggalPinjam || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Tanggal Kembali
                    </p>
                    <p className="font-semibold text-white">
                      {formData?.tanggalKembali || "-"}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Jumlah Alat</p>
                  <p className="font-semibold text-white">
                    {formData?.jumlahAlat || "-"} unit
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Additional Info */}
            {formData?.keterangan && (
              <motion.div
                className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-xl p-4 border border-blue-700/50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <p className="text-xs text-gray-400 mb-2">📝 Keterangan</p>
                <p className="text-white">{formData.keterangan}</p>
              </motion.div>
            )}
          </div>
        );

      default:
        return <div className="text-gray-400">Data tidak valid</div>;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="bg-gradient-to-br from-[#16213a]/95 to-[#0f3460]/95 border border-blue-900 rounded-2xl shadow-2xl w-full max-w-md flex flex-col"
            style={{ maxHeight: "calc(100vh - 2rem)", minHeight: "200px" }}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-blue-900/50">
              <motion.h3
                className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                Konfirmasi
              </motion.h3>
              <motion.button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-300 transition-colors flex-shrink-0"
                whileHover={{ rotate: 90 }}
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Content */}
            <motion.div
              className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm text-gray-300 mb-4">
                ✓ Pastikan data sudah benar.
              </p>
              {renderFormData()}
            </motion.div>

            {/* Footer */}
            <div className="flex-shrink-0 flex gap-3 p-6 border-t border-blue-900/50">
              <motion.button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-transparent border border-blue-600 text-blue-300 rounded-lg font-semibold hover:bg-blue-600/20 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Batal
              </motion.button>
              <motion.button
                onClick={onConfirm}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Kirim
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;

<style jsx>{`
  div::-webkit-scrollbar {
    width: 6px;
  }
  div::-webkit-scrollbar-track {
    background: transparent;
  }
  div::-webkit-scrollbar-thumb {
    background: rgba(59, 130, 246, 0.3);
    border-radius: 3px;
  }
  div::-webkit-scrollbar-thumb:hover {
    background: rgba(59, 130, 246, 0.5);
  }
`}</style>;
