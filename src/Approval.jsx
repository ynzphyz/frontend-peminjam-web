import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Approval() {
  const [approvalForm, setApprovalForm] = useState({
    idPinjam: "",
    approver: "",
    statusPersetujuan: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auto hide notifikasi
  useEffect(() => {
    let timer;
    if (success) {
      timer = setTimeout(() => setSuccess(false), 4000);
    }
    return () => clearTimeout(timer);
  }, [success]);

  // Reset isian form
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

  const handleApprovalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = new FormData();
    formData.append("idPinjam", approvalForm.idPinjam);
    formData.append("approver", approvalForm.approver);
    formData.append("statusPersetujuan", approvalForm.statusPersetujuan);

    try {
      // Kirim request tanpa menunggu selesai
      fetch("http://localhost:8080/approval-request-new", {
        method: "POST",
        body: formData,
      });

      // Show loading circle briefly before showing success toast
      setTimeout(() => {
        toast.success("✅ Permohonan persetujuan dikirim.");
        setSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        resetForm();
        setLoading(false);
      }, 1500); // 1.5 seconds loading animation
    } catch (err) {
      toast.error("Gagal mengirim data approval.");
      console.error("Background approval request error:", err);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Notifikasi sukses */}
      {/* Removed fixed-position success notification to avoid duplicate with toast */}
      {/* {success && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out flex items-center space-x-2 w-[90%] max-w-md">
          <svg
            className="w-6 h-6 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <span>✅ Permohonan berhasil dikirim</span>
        </div>
      )} */}

      {/* Form Approval */}
      <div className="relative bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-xl p-10 max-w-3xl mx-auto mt-8">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-20 rounded-xl">
            <div className="loader"></div>
            <span className="ml-4 text-indigo-900 font-semibold">
               Please wait, your data is being processed...
            </span>
          </div>
        )}

        <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-900">
          Formulir Approval Peminjaman Alat
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
              onChange={handleApprovalChange}
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
          >
            Kirim Approval
          </button>
        </form>

        {/* Animasi dan loader */}
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

          .animate-fade-in-out {
            animation: fadeIn 0.3s ease-out, fadeOut 0.5s ease-in 3.5s forwards;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translate(-50%, -20px);
            }
            to {
              opacity: 1;
              transform: translate(-50%, 0);
            }
          }

          @keyframes fadeOut {
            to {
              opacity: 0;
              transform: translate(-50%, -20px);
            }
          }
        `}</style>
      </div>
    </>
  );
}
