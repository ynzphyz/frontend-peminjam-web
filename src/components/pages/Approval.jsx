import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ConfirmationModal from "../ui/ConfirmationModal";

export default function Approval() {
  const [approvalForm, setApprovalForm] = useState({
    peminjaman_id: "",
    disetujui_oleh: "",
    status_persetujuan: "",
  });

  const [peminjamData, setPeminjamData] = useState(null);
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
    if (!id) {
      toast.error("ID peminjaman tidak boleh kosong!");
      return null;
    }
    
    try {
      console.log(`Fetching peminjaman data for ID: ${id}`);
      const response = await fetch(
        `http://localhost:8080/peminjaman/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          toast.error(`❌ Data peminjaman dengan ID ${id} tidak ditemukan!`);
        } else if (response.status === 401) {
          toast.error("❌ Tidak memiliki akses!");
        } else {
          toast.error(`❌ Gagal mengambil data peminjaman! (Status: ${response.status})`);
        }
        return null;
      }
      
      const result = await response.json();
      console.log("Peminjaman data received:", result);
      const data = result.data || result;
      
      if (data && data.nama) {
        toast.success(`✅ Data peminjaman ditemukan: ${data.nama}`);
        return data;
      }
      
      toast.error("❌ Data peminjaman tidak valid!");
      return null;
    } catch (error) {
      console.error("Error fetching peminjam data:", error);
      toast.error("❌ Terjadi kesalahan saat mengambil data!");
      return null;
    }
  };

  const resetForm = () => {
    setApprovalForm({
      peminjaman_id: "",
      disetujui_oleh: "",
      status_persetujuan: "",
    });
    setPeminjamData(null);
  };

  const handleApprovalChange = (e) => {
    const { name, value } = e.target;
    setApprovalForm({
      ...approvalForm,
      [name]: value,
    });
  };

  const handleIdPinjamChange = async (e) => {
    const idValue = e.target.value.trim();
    setApprovalForm({
      ...approvalForm,
      peminjaman_id: idValue,
    });
    
    // Reset peminjam data jika ID dikosongkan
    if (!idValue) {
      setPeminjamData(null);
      return;
    }
    
    // Auto-fetch peminjaman data when ID is entered and user stops typing
    // We'll fetch on blur or submit instead to avoid too many API calls
  };

  const handleApprovalSubmit = async (e) => {
    e.preventDefault();
    
    // Fetch data peminjaman
    const data = await fetchPeminjamData(approvalForm.peminjaman_id);
    if (!data) {
      return; // Error sudah ditampilkan di fetchPeminjamData
    }
    
    // Set peminjam data dan show confirmation
    setPeminjamData(data);
    setFormData({
      peminjaman_id: approvalForm.peminjaman_id,
      disetujui_oleh: approvalForm.disetujui_oleh,
      status_persetujuan: approvalForm.status_persetujuan,
      peminjamData: data,
    });
    setShowConfirmation(true);
  };

  const handleConfirmApproval = async () => {
    setLoading(true);
    setShowConfirmation(false);
    setSuccess(false);

    // Generate nomor approval otomatis: APR/YYYY/MM/ID
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const generatedNomor = `APR/${year}/${month}/${approvalForm.peminjaman_id}`;
    const tanggalPersetujuan = now.toISOString().split('T')[0];

    // Prepare request data matching backend ApprovalRequest
    const requestData = {
      nomor: generatedNomor,
      tanggal_persetujuan: tanggalPersetujuan,
      nama_peminjam: peminjamData?.nama || "",
      pembuat_persetujuan: approvalForm.disetujui_oleh,
      peminjaman_id: parseInt(approvalForm.peminjaman_id),
      status_persetujuan: approvalForm.status_persetujuan,
    };

    // Get JWT token from sessionStorage user object
    const userStr = sessionStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    const token = user?.token;

    if (!token) {
      toast.error("❌ Anda harus login terlebih dahulu");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/approval", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        toast.success("✅ Permohonan persetujuan dikirim.");
        setSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        resetForm();
      } else {
        toast.error(`❌ ${result.message || 'Gagal mengirim approval'}`);
      }
      setLoading(false);
    } catch (err) {
      toast.error("❌ Gagal mengirim data approval.");
      console.error("Approval request error:", err);
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
              {/* ID Peminjaman */}
              <motion.div variants={itemVariants}>
                <label className="block font-semibold mb-3 text-blue-300">
                  ID Peminjaman
                </label>
                <input
                  type="number"
                  name="peminjaman_id"
                  value={approvalForm.peminjaman_id}
                  onChange={handleIdPinjamChange}
                  className="w-full bg-[#0f3460]/50 border border-blue-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition placeholder:text-slate-500"
                  placeholder="Masukkan ID peminjaman"
                  required
                />
                <p className="text-xs text-gray-400 mt-2">
                  Data peminjaman akan ditampilkan di preview sebelum mengirim
                </p>
              </motion.div>

              {/* Disetujui Oleh */}
              <motion.div variants={itemVariants}>
                <label className="block font-semibold mb-3 text-blue-300">
                  Disetujui Oleh
                </label>
                <input
                  type="text"
                  name="disetujui_oleh"
                  value={approvalForm.disetujui_oleh}
                  onChange={handleApprovalChange}
                  className="w-full bg-[#0f3460]/50 border border-blue-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition placeholder:text-slate-500"
                  placeholder="Nama pemberi persetujuan"
                  required
                />
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
                        name="status_persetujuan"
                        value={status.value}
                        checked={approvalForm.status_persetujuan === status.value}
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
