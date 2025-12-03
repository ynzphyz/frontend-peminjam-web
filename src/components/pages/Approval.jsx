import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ConfirmationModal from "../ui/ConfirmationModal";

export default function Approval() {
  const [approvalForm, setApprovalForm] = useState({
    idPinjam: "",
    approver: "",
    statusPersetujuan: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    let timer;
    if (success) {
      timer = setTimeout(() => setSuccess(false), 4000);
    }
    return () => clearTimeout(timer);
  }, [success]);

  const fetchPeminjamData = async (id) => {
    if (!id) return null;
    try {
      const response = await fetch(
        `http://localhost:8080/get-peminjam-data?id=${id}`
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching peminjam data:", error);
      return null;
    }
  };

  const resetForm = () => {
    setApprovalForm({
      idPinjam: "",
      approver: "",
      statusPersetujuan: "",
    });
  };

  const handleApprovalChange = (e) => {
    const { name, value } = e.target;
    setApprovalForm({
      ...approvalForm,
      [name]: value,
    });
  };

  const handleIdPinjamChange = (e) => {
    setApprovalForm({
      ...approvalForm,
      idPinjam: e.target.value.trim(),
    });
  };

  const handleApprovalSubmit = async (e) => {
    e.preventDefault();
    const peminjamData = await fetchPeminjamData(approvalForm.idPinjam);
    if (!peminjamData) {
      toast.error("Data peminjaman tidak ditemukan!");
      return;
    }
    setFormData({
      idPinjam: approvalForm.idPinjam,
      approver: approvalForm.approver,
      statusPersetujuan: approvalForm.statusPersetujuan,
      peminjamData: peminjamData,
    });
    setShowConfirmation(true);
  };

  const handleConfirmApproval = async () => {
    setLoading(true);
    setShowConfirmation(false);
    setSuccess(false);

    const formData = new FormData();
    formData.append("idPinjam", approvalForm.idPinjam);
    formData.append("approver", approvalForm.approver);
    formData.append("statusPersetujuan", approvalForm.statusPersetujuan);

    try {
      fetch("http://localhost:8080/approval-request-new", {
        method: "POST",
        body: formData,
      });

      setTimeout(() => {
        toast.success("✅ Permohonan persetujuan dikirim.");
        setSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        resetForm();
        setLoading(false);
      }, 1500);
    } catch (err) {
      toast.error("Gagal mengirim data approval.");
      console.error("Background approval request error:", err);
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <motion.div
      className="min-h-screen relative overflow-x-hidden text-white bg-gradient-to-br from-[#0a183d] via-[#101a2b] to-[#1e293b] pt-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-20 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-15"
          animate={{ y: [0, 100, 0], x: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-15"
          animate={{ y: [0, -100, 0], x: [0, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
        <motion.div
          className="relative bg-gradient-to-br from-[#16213a]/80 to-[#0f3460]/50 backdrop-blur-xl border border-blue-900/30 rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full"
          variants={cardVariants}
        >
          {/* Gradient Border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 pointer-events-none" />

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#16213a]/80 z-20 rounded-2xl backdrop-blur-sm">
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span className="text-blue-300 font-semibold">
                  Memproses...
                </span>
              </div>
            </div>
          )}

          <motion.div
            className="relative z-10 space-y-8"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl font-black mb-2">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Formulir Approval
                </span>
              </h1>
              <h2 className="text-xl text-gray-300">
                Peminjaman Alat SMKN 7 SEMARANG
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-4" />
            </motion.div>

            <motion.form
              onSubmit={handleApprovalSubmit}
              className="space-y-6"
              variants={containerVariants}
            >
              {/* ID Pinjam */}
              <motion.div variants={itemVariants}>
                <label className="block font-semibold mb-3 text-blue-300">
                  ID Pinjam
                </label>
                <input
                  type="text"
                  name="idPinjam"
                  value={approvalForm.idPinjam}
                  onChange={handleIdPinjamChange}
                  className="w-full bg-[#0f3460]/50 border border-blue-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition placeholder:text-slate-500"
                  placeholder="Masukkan ID peminjaman"
                  required
                />
              </motion.div>

              {/* Approver Selection */}
              <motion.div variants={itemVariants}>
                <label className="block font-semibold mb-3 text-blue-300">
                  Pilih Approver
                </label>
                <div className="space-y-2">
                  {["Kepala Bengkel", "Penanggung Jawab"].map((role) => (
                    <label
                      key={role}
                      className="flex items-center gap-3 p-3 rounded-lg border border-blue-700/30 hover:border-blue-500/50 cursor-pointer transition hover:bg-blue-900/20"
                    >
                      <input
                        type="radio"
                        name="approver"
                        value={role}
                        checked={approvalForm.approver === role}
                        onChange={handleApprovalChange}
                        className="w-4 h-4 accent-blue-500"
                        required
                      />
                      <span className="font-medium">{role}</span>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Status Persetujuan */}
              <motion.div variants={itemVariants}>
                <label className="block font-semibold mb-3 text-blue-300">
                  Status Persetujuan
                </label>
                <div className="space-y-2">
                  {[
                    {
                      value: "disetujui",
                      label: "✓ Disetujui",
                      color:
                        "border-green-500/30 hover:border-green-500/50 hover:bg-green-900/20",
                    },
                    {
                      value: "dipertimbangkan",
                      label: "⏳ Dipertimbangkan",
                      color:
                        "border-yellow-500/30 hover:border-yellow-500/50 hover:bg-yellow-900/20",
                    },
                    {
                      value: "ditolak",
                      label: "✗ Ditolak",
                      color:
                        "border-red-500/30 hover:border-red-500/50 hover:bg-red-900/20",
                    },
                  ].map((status) => (
                    <label
                      key={status.value}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${status.color} cursor-pointer transition`}
                    >
                      <input
                        type="radio"
                        name="statusPersetujuan"
                        value={status.value}
                        checked={
                          approvalForm.statusPersetujuan === status.value
                        }
                        onChange={handleApprovalChange}
                        className="w-4 h-4 accent-blue-500"
                        required
                      />
                      <span className="font-medium">{status.label}</span>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                variants={itemVariants}
              >
                Kirim Approval
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmApproval}
        formData={formData}
        title="Approval Peminjaman"
        type="approval"
      />
    </motion.div>
  );
}
