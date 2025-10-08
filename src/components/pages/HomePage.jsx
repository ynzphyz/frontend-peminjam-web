import React from "react";
import { motion as Motion } from "framer-motion";

export default function HomePage({ onNavigate }) {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
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

  const features = [
    {
      icon: "⚡",
      title: "Proses Cepat",
      description: "Peminjaman hanya butuh beberapa menit",
    },
    {
      icon: "🔒",
      title: "Aman & Terdata",
      description: "Semua alat terdata dan dalam kondisi baik",
    },
    {
      icon: "📊",
      title: "Sistem Otomatis",
      description: "Langsung terintegrasi ke spreadsheet",
    },
  ];

  return (
    <Motion.div
      className="min-h-screen flex flex-col items-starzt md:items-center justify-center px-4 sm:px-6 py-8 sm:py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <Motion.div
        className="max-w-5xl glass-effect bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-12 border border-white/20 mb-8"
        variants={cardVariants}
      >
        <Motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold gradient-text mb-6 text-left md:text-center leading-tight flex flex-col gap-1 sm:gap-2 w-full"
          variants={itemVariants}
        >
          <span className="block break-words max-w-full leading-tight">
            <span>Sistem</span> <span>Peminjaman</span>
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl break-words max-w-full leading-tight">
            Alat Praktik
          </span>
          <span className="block h-2 sm:h-3" aria-hidden="true"></span>
          <span className="block text-secondary-500 text-2xl sm:text-3xl md:text-4xl font-bold break-words max-w-full leading-tight mt-1 sm:mt-2">
            SMKN 7 SEMARANG
          </span>
        </Motion.h1>

        <Motion.p
          className="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed mb-6 text-left md:text-center max-w-3xl md:mx-auto"
          variants={itemVariants}
        >
          Platform digital terdepan untuk memudahkan proses peminjaman alat
          praktik. Sistem otomatis yang terintegrasi langsung dengan database
          sekolah.
        </Motion.p>

        <Motion.div
          className="text-left md:text-center mb-8"
          variants={itemVariants}
        >
          <p className="italic text-secondary-500 text-lg sm:text-xl font-medium leading-relaxed">
            "Memudahkan praktik dengan alat yang cepat, aman, dan terpercaya."
          </p>
        </Motion.div>

        {/* CTA Buttons */}
        <Motion.div
          className="flex flex-col sm:flex-row gap-4 justify-start md:justify-center mb-12"
          variants={itemVariants}
        >
          <Motion.button
            onClick={() => onNavigate("peminjaman")}
            className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover-lift font-semibold text-base sm:text-lg shadow-xl relative overflow-hidden group w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center justify-center">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="text-sm sm:text-base">Mulai Pinjam Sekarang</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Motion.button>

          <Motion.button
            onClick={() => onNavigate("riwayat")}
            className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover-lift font-semibold text-base sm:text-lg shadow-xl relative overflow-hidden group w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center justify-center">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-sm sm:text-base">Lihat Riwayat</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-secondary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Motion.button>
        </Motion.div>
      </Motion.div>

      {/* Features Section */}
      <Motion.div className="max-w-6xl w-full px-4" variants={itemVariants}>
        <Motion.h2
          className="text-2xl sm:text-3xl font-bold text-left md:text-center mb-8 text-slate-800"
          variants={itemVariants}
        >
          Mengapa Menggunakan Sistem Ini?
        </Motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Motion.div
              key={index}
              className="glass-effect bg-white/70 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/30 hover-lift group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600">{feature.description}</p>
            </Motion.div>
          ))}
        </div>
      </Motion.div>

      {/* Stats Section */}
      <Motion.div className="max-w-4xl w-full mt-12 px-4" variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[
            { number: "500+", label: "Alat Tersedia" },
            { number: "1000+", label: "Peminjaman Sukses" },
            { number: "99%", label: "Tingkat Kepuasan" },
          ].map((stat, index) => (
            <Motion.div
              key={index}
              className="text-left md:text-center glass-effect bg-white/60 backdrop-blur-lg rounded-xl p-4 md:p-6 shadow-lg border border-white/30"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-slate-600 font-medium text-sm sm:text-base">{stat.label}</div>
            </Motion.div>
          ))}
        </div>
      </Motion.div>

      {/* Floating Action Elements */}
      <Motion.div
        className="fixed bottom-8 right-8 z-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Motion.button
          className="bg-gradient-to-r from-accent-500 to-accent-600 text-white p-4 rounded-full shadow-xl hover-lift"
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </Motion.button>
      </Motion.div>
    </Motion.div>
  );
}
