import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  User,
  Phone,
  GraduationCap,
  IdCard,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    nis: "",
    name: "",
    kelas: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validasi
    if (!formData.nis || !formData.name || !formData.kelas || !formData.phone) {
      setError("Semua field harus diisi");
      setLoading(false);
      return;
    }

    try {
      const token = user?.token || sessionStorage.getItem("token");
      
      const response = await fetch("http://localhost:8080/users/complete-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal melengkapi profile");
      }

      console.log("Complete profile response:", result);

      // Update user context dengan data lengkap
      const updatedUser = {
        ...user,
        ...result.data,
        profile_completed: true,
        token: user?.token, // Preserve token
      };
      
      console.log("Updated user after complete profile:", updatedUser);
      updateUser(updatedUser);

      // Redirect ke dashboard
      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Complete profile error:", err);
      setError(err.message || "Terjadi kesalahan saat melengkapi profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a183d] via-[#0f1b35] to-[#1a2a4a] flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-10"
          animate={{ y: [0, 100, 0], x: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-3xl opacity-10"
          animate={{ y: [0, -100, 0], x: [0, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-[#0f2855]/90 to-[#051530]/90 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-8 max-w-md w-full shadow-2xl relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <User size={40} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent mb-2">
            Lengkapi Profile Anda
          </h1>
          <p className="text-gray-400 text-sm">
            Silakan isi data diri untuk melanjutkan
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-600/20 border border-red-500/30 rounded-lg flex items-start gap-3"
          >
            <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-300 text-sm">{error}</p>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* NIS */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              NIS (Nomor Induk Siswa)
            </label>
            <div className="relative">
              <IdCard
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="nis"
                value={formData.nis}
                onChange={handleChange}
                placeholder="Contoh: 1234567890"
                className="w-full pl-10 pr-4 py-3 bg-[#0a183d]/60 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                required
              />
            </div>
          </div>

          {/* Nama Lengkap */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Nama Lengkap
            </label>
            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama lengkap Anda"
                className="w-full pl-10 pr-4 py-3 bg-[#0a183d]/60 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                required
              />
            </div>
          </div>

          {/* Kelas */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Kelas
            </label>
            <div className="relative">
              <GraduationCap
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="kelas"
                value={formData.kelas}
                onChange={handleChange}
                placeholder="Contoh: XII RPL 1"
                className="w-full pl-10 pr-4 py-3 bg-[#0a183d]/60 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                required
              />
            </div>
          </div>

          {/* Nomor WhatsApp */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Nomor WhatsApp
            </label>
            <div className="relative">
              <Phone
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Contoh: 08123456789"
                className="w-full pl-10 pr-4 py-3 bg-[#0a183d]/60 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                <span>Simpan & Lanjutkan</span>
              </>
            )}
          </motion.button>
        </form>

        {/* Info Footer */}
        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg">
          <p className="text-xs text-gray-400 text-center">
            Data ini akan digunakan untuk identifikasi peminjaman alat
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CompleteProfile;
