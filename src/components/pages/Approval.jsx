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
      const response = await fetch(`http://localhost:8080/get-peminjam-data?id=${id}`);
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
    
    // Fetch data peminjam sebelum menampilkan konfirmasi
    const peminjamData = await fetchPeminjamData(approvalForm.idPinjam);
    
    if (!peminjamData) {
      toast.error("Data peminjaman tidak ditemukan!");
      return;
    }

    setFormData({
      idPinjam: approvalForm.idPinjam,
      approver: approvalForm.approver,
      statusPersetujuan: approvalForm.statusPersetujuan,
      peminjamData: peminjamData
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <Motion.div
      className="min-h-screen flex flex-col items-center justify-start px-6 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Motion.div
        className="relative bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-xl p-10 max-w-3xl mx-auto mt-8"
        variants={cardVariants}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-20 rounded-xl">
            <div className="loader"></div>
            <span className="ml-4 text-indigo-900 font-semibold">
              Please wait, your data is being processed...
            </span>
          </div>
        )}

        <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-900">
          Formulir Approval Peminjaman Alat SMKN 7 SEMARANG
        </h1>

        <form onSubmit={handleApprovalSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-2 text-indigo-800">
              ID Pinjam
            </label>
            <input
              type="text"
              name="idPinjam"
              value={approvalForm.idPinjam}
              onChange={handleIdPinjamChange}
              className="w-full border border-indigo-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-indigo-800">
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
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">{role}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-2 text-indigo-800">
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
                    className="form-radio"
                    required
                  />
                  <span className="ml-2 capitalize">{status}</span>
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
            disabled={loading}
          >
            Kirim Approval
          </button>
        </form>

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
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </Motion.div>

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
