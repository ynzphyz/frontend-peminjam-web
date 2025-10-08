import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion as Motion } from "framer-motion";
import ConfirmationModal from "../ui/ConfirmationModal";

export default function Pengembalian() {
  const [pengembalianForm, setPengembalianForm] = useState({
    idPeminjaman: "",
    kondisiAlat: "",
    foto: null,
    keteranganPengembalian: "",
  });

  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState(null);

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

  const handlePengembalianChange = (e) => {
    const { name, value } = e.target;
    setPengembalianForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPengembalianForm(prev => ({
      ...prev,
      foto: file
    }));
  };

  const resetForm = () => {
    setPengembalianForm({
      idPeminjaman: "",
      kondisiAlat: "",
      foto: null,
      keteranganPengembalian: "",
    });
    setFormData(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First, fetch the data
      const response = await fetch(`http://localhost:8080/get-peminjam-data?id=${pengembalianForm.idPeminjaman}`);
      if (!response.ok) {
        throw new Error("ID Peminjaman tidak ditemukan!");
      }

      const data = await response.json();

      // Set data untuk konfirmasi terlebih dahulu
      setFormData({
        idPeminjaman: pengembalianForm.idPeminjaman,
        kondisiAlat: pengembalianForm.kondisiAlat,
        keteranganPengembalian: pengembalianForm.keteranganPengembalian,
        peminjamData: data,
        foto: pengembalianForm.foto
      });

      // Show confirmation first
      setShowConfirmation(true);
    } catch (err) {
      toast.error(err.message || "Terjadi kesalahan saat memvalidasi data");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    setShowConfirmation(false);

    try {
      // Validate approval status after confirmation
      const response = await fetch(`http://localhost:8080/get-peminjam-data?id=${pengembalianForm.idPeminjaman}`);
      const data = await response.json();

      // Check approval status
      if (!data.approvalStatus) {
        throw new Error("Peminjaman ini belum diproses oleh approver!");
      }

      if (data.approvalStatus.toLowerCase() !== "disetujui") {
        throw new Error(`Peminjaman ini ${data.approvalStatus}. Tidak bisa melakukan pengembalian!`);
      }

      const formDataToSend = new FormData();
      formDataToSend.append("idPeminjam", pengembalianForm.idPeminjaman);
      formDataToSend.append("kondisiAlat", pengembalianForm.kondisiAlat);
      formDataToSend.append("keteranganPengembalian", pengembalianForm.keteranganPengembalian);
      if (pengembalianForm.foto) {
        formDataToSend.append("foto", pengembalianForm.foto);
      }

      const submitResponse = await fetch("http://localhost:8080/pengembalian", {
        method: "POST",
        body: formDataToSend,
      });

      if (!submitResponse.ok) {
        throw new Error("Gagal mengirim data pengembalian");
      }

      toast.success("✅ Pengembalian berhasil diproses");
      resetForm();
    } catch (err) {
      toast.error(err.message || "Gagal memproses pengembalian");
    } finally {
      setLoading(false);
    }
  };

  // Rest of the JSX remains the same
  return (
    <Motion.div
      className="min-h-screen flex flex-col items-center justify-start px-2 sm:px-4 md:px-6 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Motion.div
        className="relative bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-xl p-10 max-w-3xl mx-auto"
        variants={cardVariants}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-20 rounded-xl">
            <div className="loader"></div>
            <span className="ml-4 text-indigo-900 font-semibold">
              Memproses data...
            </span>
          </div>
        )}

        <h1 className="text-3xl font-extrabold mb-8 text-left text-indigo-900">
          Formulir Pengembalian Alat SMKN 7 SEMARANG
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-2 text-indigo-800">
              ID Peminjaman
            </label>
            <input
              type="text"
              name="idPeminjaman"
              value={pengembalianForm.idPeminjaman}
              onChange={handlePengembalianChange}
              className="w-full border border-indigo-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Masukkan ID peminjaman.</p>
          </div>

          <div>
            <label className="block font-semibold mb-2 text-indigo-800">
              Kondisi Alat
            </label>
            <input
              type="text"
              name="kondisiAlat"
              value={pengembalianForm.kondisiAlat}
              onChange={handlePengembalianChange}
              className="w-full border border-indigo-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Masukkan kondisi alat saat dikembalikan.</p>
          </div>

          <div>
            <label className="block font-semibold mb-2 text-indigo-800">
              Keterangan Pengembalian
            </label>
            <input
              type="text"
              name="keteranganPengembalian"
              value={pengembalianForm.keteranganPengembalian}
              onChange={handlePengembalianChange}
              className="w-full border border-indigo-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <p className="text-sm text-gray-500 mt-1">Berikan keterangan tambahan jika perlu.</p>
          </div>

          <div>
            <label className="block font-semibold mb-2 text-indigo-800">
              Foto Alat (upload file)
            </label>
            <div className="flex items-center space-x-4">
              <label
                htmlFor="foto-upload-pengembalian"
                className="cursor-pointer bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                {pengembalianForm.foto ? "Change File" : "Choose File"}
              </label>
              <span className="text-indigo-700">
                {pengembalianForm.foto
                  ? pengembalianForm.foto.name
                  : "No file chosen"}
              </span>
            </div>
            <input
              id="foto-upload-pengembalian"
              type="file"
              name="foto"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Kirim"}
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
        onConfirm={handleConfirm}
        formData={formData}
        title="Pengembalian Alat"
        type="pengembalian"
      />
    </Motion.div>
  );
}