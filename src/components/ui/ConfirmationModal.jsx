import React, { useEffect } from 'react';
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, formData, title, type }) => {
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
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const renderFormData = () => {
    switch (type) {
      case 'peminjaman':
        return (
          <div className="space-y-5">
            {/* Header Card with Icon */}
            <div className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider">ID Peminjaman</p>
                <p className="font-bold text-blue-900 text-lg">
                  {formData?.idPinjam || <span className="italic text-blue-400">Belum di-generate</span>}
                </p>
              </div>
            </div>

            {/* Personal Info Section */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm space-y-4">
              <h4 className="font-semibold text-gray-700 border-b pb-2">Informasi Peminjam</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Nama</p>
                  <p className="font-semibold text-gray-800">{formData?.nama || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Kelas</p>
                  <p className="font-semibold text-gray-800">{formData?.kelas || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">NIS</p>
                  <p className="font-semibold text-gray-800">{formData?.nis || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">No. WhatsApp</p>
                  <p className="font-semibold text-gray-800">{formData?.noWa || '-'}</p>
                </div>
              </div>
            </div>

            {/* Equipment Info Section */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm space-y-4">
              <h4 className="font-semibold text-gray-700 border-b pb-2">Detail Peminjaman</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Nama Alat</p>
                  <p className="font-semibold text-gray-800">{formData?.namaAlat || '-'}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Tanggal Pinjam</p>
                    <p className="font-semibold text-gray-800">{formData?.tanggalPinjam || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Tanggal Kembali</p>
                    <p className="font-semibold text-gray-800">{formData?.tanggalKembali || '-'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            {formData?.keterangan && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Keterangan</p>
                <p className="text-gray-700">{formData.keterangan}</p>
              </div>
            )}
          </div>
        );

      // ... existing approval and pengembalian cases ...
      case 'approval':
        return (
          <div className="space-y-5">
            {/* Header with Icon */}
            <div className="flex items-center gap-4 bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border border-blue-200 shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider">ID Peminjaman</p>
                <p className="font-bold text-blue-900 text-lg">{formData?.idPinjam || '-'}</p>
              </div>
            </div>

            {/* Peminjam Info */}
            {formData?.peminjamData && (
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm space-y-4">
                <h4 className="font-semibold text-gray-700 border-b pb-2">Data Peminjam</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Nama</p>
                    <p className="font-semibold text-gray-800">{formData.peminjamData.nama || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Kelas</p>
                    <p className="font-semibold text-gray-800">{formData.peminjamData.kelas || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Alat</p>
                    <p className="font-semibold text-gray-800">{formData.peminjamData.namaAlat || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Jumlah</p>
                    <p className="font-semibold text-gray-800">{formData.peminjamData.jumlahAlat || '-'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Approval Info */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm space-y-4">
              <h4 className="font-semibold text-gray-700 border-b pb-2">Informasi Persetujuan</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Approver</p>
                  <p className="font-semibold text-gray-800">{formData?.approver || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <p className="font-semibold text-blue-600">{formData?.statusPersetujuan || '-'}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'pengembalian':
        return (
          <div className="space-y-5">
            {/* Header with Icon */}
            <div className="flex items-center gap-4 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-green-600 font-semibold uppercase tracking-wider">ID Peminjaman</p>
                <p className="font-bold text-green-900 text-lg">{formData?.idPeminjaman || '-'}</p>
              </div>
            </div>

            {/* Peminjam Info */}
            {formData?.peminjamData && (
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm space-y-4">
                <h4 className="font-semibold text-gray-700 border-b pb-2">Data Peminjaman</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Nama</p>
                    <p className="font-semibold text-gray-800">{formData.peminjamData.nama || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Alat</p>
                    <p className="font-semibold text-gray-800">{formData.peminjamData.namaAlat || '-'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Kondisi Alat */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 mb-1">Kondisi Alat</p>
              <p className="font-semibold text-gray-800">{formData?.kondisiAlat || '-'}</p>
            </div>

            {/* Keterangan if exists */}
            {formData?.keteranganPengembalian && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Keterangan</p>
                <p className="text-gray-700">{formData.keteranganPengembalian}</p>
              </div>
            )}
             <div>
                  <p className="text-xs text-gray-500 mb-1">Status Persetujuan</p>
                  <p className="font-semibold text-blue-600">{!formData.peminjamData?.statusPersetujuan || '-'}</p>
                </div>
          </div>
        );

      default:
        return <div>Data tidak valid</div>;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
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
                  Konfirmasi {title}
                </h3>
                <button
                  onClick={onClose}
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
                  Pastikan data yang Anda masukkan sudah benar sebelum mengirim.
                </p>
                {renderFormData()}
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Batal
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm"
                >
                  Kirim
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;