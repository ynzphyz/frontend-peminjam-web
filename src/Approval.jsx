import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Approval() {
  const [approvalForm, setApprovalForm] = useState({
    idPinjam: "",
    approver: "",
    statusPersetujuan: "",
  });

  // State untuk data peminjam
  const [peminjamData, setPeminjamData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [dataNotFound, setDataNotFound] = useState(false);

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

  // Fungsi untuk mencari data peminjam berdasarkan ID
  const fetchPeminjamData = async (id) => {
    if (!id) return;

    const trimmedId = id.trim();
    console.log("Fetching peminjam data for ID:", trimmedId);

    setLoadingData(true);
    setDataNotFound(false);
    setPeminjamData(null);

    try {
      const response = await fetch(`http://localhost:8080/get-peminjam-data?id=${encodeURIComponent(trimmedId)}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Received peminjam data:", data);
        setPeminjamData(data);
        setDataNotFound(false);
      } else {
        console.log("Peminjam data not found for ID:", trimmedId);
        setPeminjamData(null);
        setDataNotFound(true);
      }
    } catch (error) {
      console.error("Error fetching peminjam data:", error);
      setPeminjamData(null);
      setDataNotFound(true);
    } finally {
      setLoadingData(false);
    }
  };

  // Reset isian form
  const resetForm = () => {
    setApprovalForm({
      idPinjam: "",
      approver: "",
      statusPersetujuan: "",
    });
    setPeminjamData(null);
    setDataNotFound(false);
  };

  const handleApprovalChange = (e) => {
    const { name, value } = e.target;
    setApprovalForm({
      ...approvalForm,
      [name]: value,
    });
  };

  // Handler khusus untuk perubahan ID Pinjam
  const handleIdPinjamChange = (e) => {
    const id = e.target.value.trim();
    setApprovalForm({
      ...approvalForm,
      idPinjam: id,
    });

    // Cari data jika ID memiliki nilai
    if (id) {
      fetchPeminjamData(id);
    } else {
      setPeminjamData(null);
      setDataNotFound(false);
    }
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
          Formulir Approval Peminjaman Alat SMKN 7 SEMARANG
        </h1>
        
        {/* Data Peminjam Section */}
        <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200 transition-all duration-500 ease-in-out transform hover:scale-[1.02]">
          <h2 className="text-xl font-bold mb-4 text-blue-800">Data Peminjam</h2>
          
          {loadingData && (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-blue-700">Mencari data...</span>
            </div>
          )}
          
          {dataNotFound && approvalForm.idPinjam && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Data tidak ditemukan! </strong>
              <span className="block sm:inline">ID Pinjam "{approvalForm.idPinjam}" tidak ditemukan.</span>
            </div>
          )}
          
          {peminjamData && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
              <div>
                <p className="text-sm text-gray-600">Nama</p>
                <p className="font-semibold">{peminjamData.nama}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Kelas</p>
                <p className="font-semibold">{peminjamData.kelas}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">NIS</p>
                <p className="font-semibold">{peminjamData.nis}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Nama Alat</p>
                <p className="font-semibold">{peminjamData.namaAlat}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Jumlah Alat</p>
                <p className="font-semibold">{peminjamData.jumlahAlat}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tanggal Pinjam</p>
                <p className="font-semibold">{peminjamData.tanggalPinjam}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tanggal Kembali</p>
                <p className="font-semibold">{peminjamData.tanggalKembali}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Lama Pinjam</p>
                <p className="font-semibold">{peminjamData.lamaPinjam}</p>
              </div>
              {peminjamData.approvalStatus && (
                <div>
                  <p className="text-sm text-gray-600">Status Approval</p>
                  <p className={`font-semibold ${
                    peminjamData.approvalStatus === "disetujui" ? "text-green-600" : 
                    peminjamData.approvalStatus === "ditolak" ? "text-red-600" : "text-yellow-600"
                  }`}>
                    {peminjamData.approvalStatus}
                  </p>
                </div>
              )}
            </div>
          )}
          
          {!peminjamData && !loadingData && !dataNotFound && (
            <p className="text-gray-500 italic">Masukkan ID Pinjam untuk melihat data peminjam</p>
          )}
        </div>

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
            disabled={!peminjamData}
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
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
          }
        `}</style>
      </div>
    </>
  );
}
