import React from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Zap, Shield, Clock } from "lucide-react";
import logoStemba from "../../assets/Logo_STEMBA.png";

export default function HomePage() {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const features = [
    {
      icon: Zap,
      title: "Proses Cepat",
      description:
        "Proses peminjaman yang efisien dan mudah hanya dalam beberapa klik",
    },
    {
      icon: Shield,
      title: "Aman & Terpercaya",
      description:
        "Sistem keamanan tingkat tinggi untuk melindungi data sekolah Anda",
    },
    {
      icon: Clock,
      title: "Manajemen Waktu",
      description:
        "Tracking real-time untuk setiap peminjaman dan pengembalian alat",
    },
    {
      icon: CheckCircle,
      title: "Approval Otomatis",
      description:
        "Sistem approval yang terstruktur dan transparan untuk setiap request",
    },
  ];

  const stats = [
    { number: "500+", label: "Alat Tersedia" },
    { number: "1000+", label: "Peminjaman/Bulan" },
    { number: "99%", label: "Tingkat Kepuasan" },
    { number: "24/7", label: "Dukungan Sistem" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a183d] via-[#101a2b] to-[#1e293b] overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, 100, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, -100, 0] }}
          transition={{ duration: 9, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section - JANGAN DIHAPUS */}
        <section className="min-h-[70vh] px-6 lg:px-12 py-20 flex items-center justify-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-4 items-center">
              {/* Left - Logo */}
              <motion.div
                className="flex justify-center lg:justify-start"
                variants={itemVariants}
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-30"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <img
                    src={logoStemba}
                    alt="SMKN 7 Semarang"
                    className="w-80 h-80 object-contain relative z-10 drop-shadow-2xl"
                  />
                </div>
              </motion.div>

              {/* Right - Content - JANGAN DIHAPUS */}
              <motion.div variants={itemVariants} className="space-y-6">
                <div>
                  <motion.p
                    className="text-blue-400 font-semibold text-lg mb-2"
                    variants={itemVariants}
                  >
                    SMKN 7 SEMARANG
                  </motion.p>
                  <motion.h1
                    className="text-4xl lg:text-5xl font-bold text-white mb-3"
                    variants={itemVariants}
                  >
                    Sistem Peminjaman
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent block">
                      Alat Praktik
                    </span>
                  </motion.h1>
                </div>

                <motion.p
                  className="text-gray-300 text-lg leading-relaxed"
                  variants={itemVariants}
                >
                  Platform digital modern untuk memudahkan proses peminjaman
                  alat praktik. Terintegrasi langsung dengan database sekolah,
                  cepat dan aman.
                </motion.p>

                {/* Buttons - JANGAN DIHAPUS */}
                <motion.div
                  className="flex flex-wrap gap-4 pt-4"
                  variants={itemVariants}
                >
                  <motion.button
                    onClick={() => navigate("/form-peminjaman")}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2 group"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Mulai Pinjam
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </motion.button>

                  <motion.button
                    onClick={() => navigate("/riwayat")}
                    className="px-8 py-3 border-2 border-blue-400 text-blue-400 font-semibold rounded-lg hover:bg-blue-400 hover:text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Lihat Riwayat
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 lg:px-12 py-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-[#1e3a8a]/40 to-[#0f3460]/40 border border-blue-500/20 rounded-xl p-6 backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <motion.p
                    className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                    variants={itemVariants}
                  >
                    {stat.number}
                  </motion.p>
                  <p className="text-gray-400 text-sm lg:text-base mt-2">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 lg:px-12 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <h2 className="text-4xl font-bold text-white mb-4">
                Mengapa Memilih Sistem Kami?
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Solusi terpadu dengan fitur-fitur lengkap untuk manajemen
                peminjaman alat praktik yang profesional dan efisien
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="group relative bg-gradient-to-br from-[#1e3a8a]/40 to-[#0f3460]/40 border border-blue-500/20 rounded-xl p-6 hover:border-blue-400/50 transition-all duration-300 overflow-hidden"
                    variants={itemVariants}
                    whileHover={{ y: -8 }}
                  >
                    {/* Gradient background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/10 group-hover:to-purple-600/10 transition-all duration-300" />

                    <motion.div
                      className="relative z-10"
                      variants={containerVariants}
                    >
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <Icon size={24} className="text-white" />
                      </motion.div>

                      <h3 className="text-xl font-bold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 lg:px-12 py-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-12 text-center backdrop-blur-sm"
              variants={itemVariants}
              whileHover={{ borderColor: "#3b82f6" }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Siap Memulai?
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Bergabunglah dengan sistem manajemen peminjaman alat praktik
                yang paling modern dan terpercaya di SMKN 7 Semarang
              </p>

              <motion.button
                onClick={() => navigate("/form-peminjaman")}
                className="px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 inline-flex items-center gap-2 group text-lg"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Mulai Sekarang
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Footer Info */}
        <section className="px-6 lg:px-12 py-12 border-t border-blue-500/10 text-center">
          <motion.p className="text-gray-500 text-sm" variants={itemVariants}>
            © 2024 SMKN 7 Semarang. Sistem Peminjaman Alat Praktik. Semua hak
            dilindungi.
          </motion.p>
        </section>
      </motion.div>
    </div>
  );
}
