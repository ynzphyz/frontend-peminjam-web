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

  const handlePengembalianChange = (e) => {
    const { name, value } = e.target;
    setPengembalianForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPengembalianForm((prev) => ({
      ...prev,
      foto: file,
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
      const response = await fetch(
        `http://localhost:8080/get-peminjam-data?id=${pengembalianForm.idPeminjaman}`
      );
      if (!response.ok) {
        throw new Error("ID Peminjaman tidak ditemukan!");
      }

      const data = await response.json();

      setFormData({
        idPeminjaman: pengembalianForm.idPeminjaman,
        kondisiAlat: pengembalianForm.kondisiAlat,
        keteranganPengembalian: pengembalianForm.keteranganPengembalian,
        peminjamData: data,
        foto: pengembalianForm.foto,
      });

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
      const response = await fetch(
        `http://localhost:8080/get-peminjam-data?id=${pengembalianForm.idPeminjaman}`
      );
      const data = await response.json();

      if (!data.approvalStatus) {
        throw new Error("Peminjaman ini belum diproses oleh approver!");
      }

      if (data.approvalStatus.toLowerCase() !== "disetujui") {
        throw new Error(
          `Peminjaman ini ${data.approvalStatus}. Tidak bisa melakukan pengembalian!`
        );
      }

      const formDataToSend = new FormData();
      formDataToSend.append("idPeminjam", pengembalianForm.idPeminjaman);
      formDataToSend.append("kondisiAlat", pengembalianForm.kondisiAlat);
      formDataToSend.append(
        "keteranganPengembalian",
        pengembalianForm.keteranganPengembalian
      );
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
                Memproses data...
              </span>
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-left text-blue-400">
            Formulir Pengembalian Alat SMKN 7 SEMARANG
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-2 text-blue-400">
                ID Peminjaman
              </label>
              <input
                type="text"
                name="idPeminjaman"
                value={pengembalianForm.idPeminjaman}
                onChange={handlePengembalianChange}
                className="w-full border border-blue-700 bg-[#101a2b] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder:text-slate-400"
                required
              />
              <p className="text-sm text-slate-400 mt-1">
                Masukkan ID peminjaman.
              </p>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-blue-400">
                Kondisi Alat
              </label>
              <input
                type="text"
                name="kondisiAlat"
                value={pengembalianForm.kondisiAlat}
                onChange={handlePengembalianChange}
                className="w-full border border-blue-700 bg-[#101a2b] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder:text-slate-400"
                required
              />
              <p className="text-sm text-slate-400 mt-1">
                Masukkan kondisi alat saat dikembalikan.
              </p>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-blue-400">
                Keterangan Pengembalian
              </label>
              <input
                type="text"
                name="keteranganPengembalian"
                value={pengembalianForm.keteranganPengembalian}
                onChange={handlePengembalianChange}
                className="w-full border border-blue-700 bg-[#101a2b] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder:text-slate-400"
              />
              <p className="text-sm text-slate-400 mt-1">
                Berikan keterangan tambahan jika perlu.
              </p>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-blue-400">
                Foto Alat (upload file)
              </label>
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="foto-upload-pengembalian"
                  className="cursor-pointer bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                >
                  {pengembalianForm.foto ? "Ganti File" : "Pilih File"}
                </label>
                <span className="text-blue-400">
                  {pengembalianForm.foto
                    ? pengembalianForm.foto.name
                    : "Belum ada file"}
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
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:bg-blue-700 transition"
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
        onConfirm={handleConfirm}
        formData={formData}
        title="Pengembalian Alat"
        type="pengembalian"
      />
    </Motion.div>
  );
}
