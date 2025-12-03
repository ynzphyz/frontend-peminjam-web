import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ConfirmationModal from "../ui/ConfirmationModal";

export default function Peminjaman() {
  const [peminjamanForm, setPeminjamanForm] = useState({
    nama: "",
    kelas: "",
    nis: "",
    noWa: "",
    namaAlat: "",
    jumlahAlat: 1,
    tanggalPinjam: "",
    tanggalKembali: "",
    keterangan: "",
    foto: null,
  });

  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let timer;
    if (success) {
      timer = setTimeout(() => setSuccess(false), 4000);
    }
    return () => clearTimeout(timer);
  }, [success]);

  const resetForm = () => {
    setPeminjamanForm({
      nama: "",
      kelas: "",
      nis: "",
      noWa: "",
      namaAlat: "",
      jumlahAlat: 1,
      tanggalPinjam: "",
      tanggalKembali: "",
      keterangan: "",
      foto: null,
    });
  };

  const handlePeminjamanChange = (e) => {
    const { name, value } = e.target;
    setPeminjamanForm({
      ...peminjamanForm,
      [name]: value,
    });
  };

  const handlePeminjamanFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPeminjamanForm({
        ...peminjamanForm,
        foto: file,
      });
    }
  };

  const handlePeminjamanSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = async () => {
    setLoading(true);
    setShowConfirmation(false);

    const formData = new FormData();
    formData.append("nama", peminjamanForm.nama);
    formData.append("kelas", peminjamanForm.kelas);
    formData.append("nis", peminjamanForm.nis);
    formData.append("noWa", peminjamanForm.noWa);
    formData.append("namaAlat", peminjamanForm.namaAlat);
    formData.append("jumlahAlat", peminjamanForm.jumlahAlat);
    formData.append("tanggalPinjam", peminjamanForm.tanggalPinjam);
    formData.append("tanggalKembali", peminjamanForm.tanggalKembali);
    formData.append("keterangan", peminjamanForm.keterangan);
    if (peminjamanForm.foto) {
      formData.append("foto", peminjamanForm.foto);
    }

    try {
      fetch("http://localhost:8080/pinjam", {
        method: "POST",
        body: formData,
      });

      setTimeout(() => {
        toast.success("✅ Peminjaman berhasil dikirim!");
        setSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        resetForm();
        setLoading(false);
      }, 1500);
    } catch (err) {
      toast.error("❌ Gagal mengirim peminjaman.");
      console.error("Peminjaman request error:", err);
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
          className="relative bg-gradient-to-br from-[#16213a]/80 to-[#0f3460]/50 backdrop-blur-xl border border-blue-900/30 rounded-2xl shadow-2xl p-8 md:p-12 max-w-3xl w-full"
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
                  Formulir Peminjaman
                </span>
              </h1>
              <h2 className="text-xl text-gray-300">Alat SMKN 7 SEMARANG</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-4" />
            </motion.div>

            <motion.form
              onSubmit={handlePeminjamanSubmit}
              className="space-y-6"
              variants={containerVariants}
            >
              {/* Nama */}
              <motion.div variants={itemVariants}>
                <label className="block font-semibold mb-2 text-blue-300">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="nama"
                  value={peminjamanForm.nama}
                  onChange={handlePeminjamanChange}
                  className="w-full bg-[#0f3460]/50 border border-blue-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition placeholder:text-slate-500"
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </motion.div>

              {/* Grid Kelas dan NIS */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <label className="block font-semibold mb-2 text-blue-300">
                    Kelas
                  </label>
                  <input
                    type="text"
                    name="kelas"
                    value={peminjamanForm.kelas}
                    onChange={handlePeminjamanChange}
                    className="w-full bg-[#0f3460]/50 border border-blue-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition placeholder:text-slate-500"
                    placeholder="contoh: XI TKJ A"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block font-semibold mb-2 text-blue-300">
                    NIS
                  </label>
                  <input
                    type="text"
                    name="nis"
                    value={peminjamanForm.nis}
                    onChange={handlePeminjamanChange}
                    className="w-full bg-[#0f3460]/50 border border-blue-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition placeholder:text-slate-500"
                    placeholder="Nomor Induk Siswa"
                    required
                  />
                </motion.div>
              </motion.div>

              {/* No. WhatsApp */}
              <motion.div variants={itemVariants}>
                <label className="block font-semibold mb-2 text-blue-300">
                  No. WhatsApp
                </label>
                <input
                  type="tel"
                  name="noWa"
                  value={peminjamanForm.noWa}
                  onChange={handlePeminjamanChange}
                  className="w-full bg-[#0f3460]/50 border border-blue-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition placeholder:text-slate-500"
                  placeholder="08xxxxxxxxxx"
                  required
                />
              </motion.div>

              {/* Nama Alat */}
              <motion.div variants={itemVariants}>
                <label className="block font-semibold mb-2 text-blue-300">
                  Nama Alat
                </label>
                <input
                  type="text"
                  name="namaAlat"
                  value={peminjamanForm.namaAlat}
                  onChange={handlePeminjamanChange}
                  className="w-full bg-[#0f3460]/50 border border-blue-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition placeholder:text-slate-500"
                  placeholder="Masukkan nama alat yang akan dipinjam"
                  required
                />
              </motion.div>

              {/* Grid Jumlah dan Tanggal */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <label className="block font-semibold mb-2 text-blue-300">
                    Jumlah Alat
                  </label>
                  <input
                    type="number"
                    name="jumlahAlat"
                    min="1"
                    value={peminjamanForm.jumlahAlat}
                    onChange={handlePeminjamanChange}
                    className="w-full bg-[#0f3460]/50 border border-blue-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block font-semibold mb-2 text-blue-300">
                    Tanggal Pinjam
                  </label>
                  <input
                    type="date"
                    name="tanggalPinjam"
                    value={peminjamanForm.tanggalPinjam}
                    onChange={handlePeminjamanChange}
                    className="w-full bg-[#0f3460]/50 border border-blue-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block font-semibold mb-2 text-blue-300">
                    Tanggal Kembali
                  </label>
                  <input
                    type="date"
                    name="tanggalKembali"
                    value={peminjamanForm.tanggalKembali}
                    onChange={handlePeminjamanChange}
                    className="w-full bg-[#0f3460]/50 border border-blue-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    required
                  />
                </motion.div>
              </motion.div>

              {/* Keterangan */}
              <motion.div variants={itemVariants}>
                <label className="block font-semibold mb-2 text-blue-300">
                  Keterangan (Opsional)
                </label>
                <textarea
                  name="keterangan"
                  value={peminjamanForm.keterangan}
                  onChange={handlePeminjamanChange}
                  className="w-full bg-[#0f3460]/50 border border-blue-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition placeholder:text-slate-500 resize-none"
                  placeholder="Tambahkan catatan atau keterangan khusus..."
                  rows="4"
                />
              </motion.div>

              {/* File Upload */}
              <motion.div variants={itemVariants}>
                <label className="block font-semibold mb-3 text-blue-300">
                  Foto Alat (Opsional)
                </label>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="foto-upload-peminjaman"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold cursor-pointer hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                  >
                    {peminjamanForm.foto ? "Ganti File" : "Pilih File"}
                  </label>
                  <span className="text-blue-300 font-medium">
                    {peminjamanForm.foto
                      ? peminjamanForm.foto.name
                      : "Belum ada file"}
                  </span>
                </div>
                <input
                  id="foto-upload-peminjaman"
                  type="file"
                  name="foto"
                  accept="image/*"
                  onChange={handlePeminjamanFileChange}
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
                Kirim Peminjaman
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmSubmit}
        formData={peminjamanForm}
        type="peminjaman"
      />
    </motion.div>
  );
}
