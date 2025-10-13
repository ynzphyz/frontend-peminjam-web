import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion as Motion } from "framer-motion";
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
    if (name === "noWa") {
      const isNumeric = /^[0-9]*$/.test(value);
      if (!isNumeric && value !== "") {
        toast.error("Nomor telepon harus berupa angka.");
        return;
      }
    }
    setPeminjamanForm({
      ...peminjamanForm,
      [name]: name === "jumlahAlat" ? Number(value) : value,
    });
  };

  const handlePeminjamanFileChange = (e) => {
    const file = e.target.files[0];
    setPeminjamanForm({ ...peminjamanForm, foto: file });
  };

  const handlePeminjamanSubmit = async (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmation(false);
    setLoading(true);

    try {
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

      const res = await fetch("http://localhost:8080/pinjam", {
        method: "POST",
        body: formData,
      });

      const result = await res.text();
      toast.success(result);
      window.scrollTo({ top: 0, behavior: "smooth" });
      resetForm();
    } catch (err) {
      toast.error("Gagal mengirim data peminjaman.");
      console.error(err);
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

      {/* FORM CARD */}
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
          <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-left text-blue-400">
            Formulir Peminjaman Alat SMKN 7 SEMARANG
          </h1>
          <form onSubmit={handlePeminjamanSubmit} className="space-y-6">
            {
              /*
               * Form fields configuration
               */ [
                {
                  label: "Nama",
                  name: "nama",
                  description: "Masukkan nama lengkap Anda.",
                },
                {
                  label: "Kelas",
                  name: "kelas",
                  description: "Masukkan kelas Anda, misalnya: X-PPLG-1",
                },
                {
                  label: "NIS",
                  name: "nis",
                  description: "Nomor Induk Siswa Anda.",
                },
                {
                  label: "No. WhatsApp",
                  name: "noWa",
                  description: "Masukkan nomor WhatsApp yang aktif.",
                },
                {
                  label: "Nama Alat",
                  name: "namaAlat",
                  description: "Sebutkan nama alat yang ingin dipinjam.",
                },
                {
                  label: "Jumlah Alat",
                  name: "jumlahAlat",
                  type: "number",
                  description: "Masukkan jumlah alat yang ingin dipinjam.",
                },
                {
                  label: "Tanggal Pinjam",
                  name: "tanggalPinjam",
                  type: "date",
                  description: "Pilih tanggal peminjaman.",
                },
                {
                  label: "Tanggal Kembali",
                  name: "tanggalKembali",
                  type: "date",
                  description: "Pilih tanggal pengembalian.",
                },
                {
                  label: "Keterangan",
                  name: "keterangan",
                  description: "Berikan keterangan tambahan jika perlu.",
                },
              ].map(({ label, name, type = "text", description }) => (
                <div key={name}>
                  <label className="block font-semibold mb-2 text-blue-400">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={peminjamanForm[name]}
                    onChange={handlePeminjamanChange}
                    className="w-full border border-blue-700 bg-[#101a2b] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder:text-slate-400"
                    required={name !== "keterangan"}
                    autoComplete="off"
                  />
                  <p className="text-sm text-slate-400 mt-1">{description}</p>
                </div>
              ))
            }

            <div>
              <label className="block font-semibold mb-2 text-blue-400">
                Foto Alat (upload file)
              </label>
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="foto-upload-peminjaman"
                  className="cursor-pointer bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                >
                  {peminjamanForm.foto ? "Ganti File" : "Pilih File"}
                </label>
                <span className="text-blue-400">
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
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:bg-blue-700 transition"
            >
              Kirim
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
        onConfirm={handleConfirmSubmit}
        formData={peminjamanForm}
        type="peminjaman"
      />
    </Motion.div>
  );
}
