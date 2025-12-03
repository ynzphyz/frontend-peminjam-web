import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
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
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let timer;
    if (success) {
      timer = setTimeout(() => setSuccess(false), 4000);
    }
    return () => clearTimeout(timer);
  }, [success]);

  const fetchPeminjamanData = async (id) => {
    if (!id) return null;
    try {
      console.log(
        "🔍 Fetching data dari: http://localhost:8080/get-peminjam-data?id=" +
          id
      );

      const response = await fetch(
        `http://localhost:8080/get-peminjam-data?id=${id}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Data ditemukan:", data);
        return data;
      } else {
        console.error("❌ Response status:", response.status);
        toast.error("Data peminjaman tidak ditemukan!");
      }
      return null;
    } catch (error) {
      console.error("❌ Error fetching peminjaman data:", error);
      toast.error("Gagal mengambil data peminjaman");
      return null;
    }
  };

  const resetForm = () => {
    setPengembalianForm({
      idPeminjaman: "",
      kondisiAlat: "",
      foto: null,
      keteranganPengembalian: "",
    });
  };

  const handlePengembalianChange = (e) => {
    const { name, value } = e.target;
    setPengembalianForm({
      ...pengembalianForm,
      [name]: value,
    });
  };

  const handlePengembalianFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPengembalianForm({
        ...pengembalianForm,
        foto: file,
      });
    }
  };

  const handlePengembalianSubmit = async (e) => {
    e.preventDefault();

    if (!pengembalianForm.idPeminjaman.trim()) {
      toast.error("⚠️ ID Peminjaman tidak boleh kosong!");
      return;
    }

    setLoading(true);
    const peminjamanData = await fetchPeminjamanData(
      pengembalianForm.idPeminjaman
    );
    setLoading(false);

    if (!peminjamanData) {
      toast.error("❌ Data peminjaman tidak ditemukan!");
      return;
    }

    setFormData({
      ...pengembalianForm,
      idPeminjaman: pengembalianForm.idPeminjaman,
      peminjamanData: peminjamanData,
    });
    setShowConfirmation(true);
  };

  const handleConfirmPengembalian = async () => {
    setLoading(true);
    setShowConfirmation(false);

    const formDataToSend = new FormData();
    formDataToSend.append("idPeminjaman", pengembalianForm.idPeminjaman);
    formDataToSend.append("kondisiAlat", pengembalianForm.kondisiAlat);
    formDataToSend.append(
      "keteranganPengembalian",
      pengembalianForm.keteranganPengembalian
    );
    if (pengembalianForm.foto) {
      formDataToSend.append("foto", pengembalianForm.foto);
    }

    try {
      console.log("📤 Mengirim ke backend...");
      const response = await fetch("http://localhost:8080/pengembalian", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        console.log("✅ Pengembalian berhasil!");
        toast.success("✅ Pengembalian berhasil dikirim!");
        setSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        resetForm();
        setLoading(false);
      } else {
        const errorText = await response.text();
        console.error("❌ Error response:", response.status, errorText);
        toast.error("❌ Gagal mengirim pengembalian.");
        setLoading(false);
      }
    } catch (err) {
      console.error("❌ Pengembalian request error:", err);
      toast.error("❌ Gagal mengirim pengembalian.");
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
                  Formulir Pengembalian
                </span>
              </h1>
              <h2 className="text-xl text-gray-300">Alat SMKN 7 SEMARANG</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-4" />
            </motion.div>

            <motion.form
              onSubmit={handlePengembalianSubmit}
              className="space-y-6"
              variants={containerVariants}
            >
              {/* ID Peminjaman */}
              <motion.div variants={itemVariants}>
                <label className="block font-semibold mb-2 text-blue-300">
                  ID Peminjaman
                </label>
                <input
                  type="text"
                  name="idPeminjaman"
                  value={pengembalianForm.idPeminjaman}
                  onChange={handlePengembalianChange}
                  className="w-full bg-[#0f3460]/50 border border-blue-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition placeholder:text-slate-500"
                  placeholder="Masukkan ID peminjaman"
                  required
                />
              </motion.div>

              {/* Kondisi Alat */}
              <motion.div variants={itemVariants}>
                <label className="block font-semibold mb-3 text-blue-300">
                  Kondisi Alat
                </label>
                <div className="space-y-2">
                  {[
                    {
                      value: "baik",
                      label: "✓ Baik",
                      color:
                        "border-green-500/30 hover:border-green-500/50 hover:bg-green-900/20",
                    },
                    {
                      value: "rusak_ringan",
                      label: "⚠️ Rusak Ringan",
                      color:
                        "border-yellow-500/30 hover:border-yellow-500/50 hover:bg-yellow-900/20",
                    },
                    {
                      value: "rusak_berat",
                      label: "✗ Rusak Berat",
                      color:
                        "border-red-500/30 hover:border-red-500/50 hover:bg-red-900/20",
                    },
                    {
                      value: "hilang",
                      label: "❌ Hilang",
                      color:
                        "border-red-600/30 hover:border-red-600/50 hover:bg-red-900/30",
                    },
                  ].map((kondisi) => (
                    <label
                      key={kondisi.value}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${kondisi.color} cursor-pointer transition`}
                    >
                      <input
                        type="radio"
                        name="kondisiAlat"
                        value={kondisi.value}
                        checked={pengembalianForm.kondisiAlat === kondisi.value}
                        onChange={handlePengembalianChange}
                        className="w-4 h-4 accent-blue-500"
                        required
                      />
                      <span className="font-medium">{kondisi.label}</span>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Keterangan */}
              <motion.div variants={itemVariants}>
                <label className="block font-semibold mb-2 text-blue-300">
                  Keterangan Pengembalian
                </label>
                <textarea
                  name="keteranganPengembalian"
                  value={pengembalianForm.keteranganPengembalian}
                  onChange={handlePengembalianChange}
                  className="w-full bg-[#0f3460]/50 border border-blue-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition placeholder:text-slate-500 resize-none"
                  placeholder="Deskripsikan kondisi alat secara detail..."
                  rows="4"
                  required
                />
              </motion.div>

              {/* File Upload */}
              <motion.div variants={itemVariants}>
                <label className="block font-semibold mb-3 text-blue-300">
                  Foto Alat (Opsional)
                </label>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="foto-upload-pengembalian"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold cursor-pointer hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                  >
                    {pengembalianForm.foto ? "Ganti File" : "Pilih File"}
                  </label>
                  <span className="text-blue-300 font-medium">
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
                  onChange={handlePengembalianFileChange}
                  className="hidden"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                variants={itemVariants}
              >
                Kirim Pengembalian
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmPengembalian}
        formData={formData}
        title="Pengembalian Alat"
        type="pengembalian"
      />
    </motion.div>
  );
}
