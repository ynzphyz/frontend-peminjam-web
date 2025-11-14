import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion as Motion } from "framer-motion";
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
    <Motion.div
      className="min-h-screen relative overflow-x-hidden text-white bg-gradient-to-br from-[#0a183d] via-[#101a2b] to-[#1e293b]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated Blobs */}
      <Motion.div
        className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-900 opacity-30 rounded-full blur-3xl z-0"
        animate={{ scale: [1, 1.2, 1], x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <Motion.div
        className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-900 opacity-30 rounded-full blur-3xl z-0"
        animate={{ scale: [1, 1.1, 1], x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />

      <div className="flex items-center justify-center min-h-[80vh] relative z-10 px-2 sm:px-4 md:px-6 py-12">
        <Motion.div
          className="relative bg-[#16213a]/80 backdrop-blur-xl border border-blue-900 rounded-2xl shadow-2xl p-10 max-w-3xl w-full mx-auto"
          variants={cardVariants}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#16213a]/80 z-20 rounded-2xl">
              <div className="loader"></div>
              <span className="ml-4 text-blue-400 font-semibold">
                Mohon tunggu, data sedang diproses...
              </span>
            </div>
          )}

          <Motion.h1
            className="text-3xl md:text-4xl font-extrabold mb-8 text-left text-blue-400"
            variants={itemVariants}
          >
            Formulir Approval Peminjaman Alat SMKN 7 SEMARANG
          </Motion.h1>

          <Motion.form onSubmit={handleApprovalSubmit} className="space-y-6" variants={itemVariants}>
            <div>
              <label className="block font-semibold mb-2 text-blue-400">
                ID Pinjam
              </label>
              <input
                type="text"
                name="idPinjam"
                value={approvalForm.idPinjam}
                onChange={handleIdPinjamChange}
                className="w-full border border-blue-700 bg-[#101a2b] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder:text-slate-400"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2 text-blue-400">
                Pilih Approver
              </label>
              <div className="flex flex-wrap gap-4">
                {["Kepala Bengkel", "Penanggung Jawab"].map((role) => (
                  <label key={role} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="approver"
                      value={role}
                      checked={approvalForm.approver === role}
                      onChange={handleApprovalChange}
                      className="form-radio accent-blue-600"
                      required
                    />
                    <span className="ml-2">{role}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-2 text-blue-400">
                Status Persetujuan
              </label>
              <div className="flex flex-wrap gap-4">
                {["disetujui", "dipertimbangkan", "ditolak"].map((status) => (
                  <label key={status} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="statusPersetujuan"
                      value={status}
                      checked={approvalForm.statusPersetujuan === status}
                      onChange={handleApprovalChange}
                      className="form-radio accent-blue-600"
                      required
                    />
                    <span className="ml-2 capitalize">{status}</span>
                  </label>
                ))}
              </div>
            </div>
            <Motion.button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:bg-blue-700 transition"
              disabled={loading}
              variants={itemVariants}
            >
              Kirim Approval
            </Motion.button>
          </Motion.form>

          <style jsx>{`
            .loader {
              border: 8px solid #f3f3f3;
              border-top: 8px solid #3498db;
              border-radius: 50%;
              width: 50px;
              height: 50px;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </Motion.div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmApproval}
        formData={formData}
        title="Approval Peminjaman"
        type="approval"
      />
    </Motion.div>
  );
}
