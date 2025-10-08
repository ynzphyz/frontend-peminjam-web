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
      className="min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <section className="px-6 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          <Motion.div className="max-w-3xl" variants={ cardVariants }>
            <Motion.h2
              className="text-secondary-500 text-2xl sm:text-3xl md:text-4xl mb-4 font-bold"
              variants={itemVariants}
            >
              SMKN 7 SEMARANG
            </Motion.h2>
            {/* Title */}
            <Motion.h1
              className="text-5xl sm:text-5xl md:text-6xl font-extrabold gradient-text mb-16 leading-tight"
              variants={itemVariants}
            >
              Sistem Peminjaman
              <br />
              <span className="text-4xl md:text-5xl">Alat Praktik</span>
              <br />
            </Motion.h1>
            
            {/* Description */}
            <Motion.p
              className="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-3xl"
              variants={itemVariants}
            >
              Platform digital terdepan untuk memudahkan proses peminjaman alat
              praktik. Sistem otomatis yang terintegrasi langsung dengan database
              sekolah.
            </Motion.p>
            
            {/* CTA Buttons */}
            <Motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              variants={itemVariants}
            >
              <Motion.button
                onClick={() => onNavigate("peminjaman")}
                className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover-lift font-semibold text-base sm:text-lg shadow-xl relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  Mulai Pinjam Sekarang
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Motion.button>

              <Motion.button
                onClick={() => onNavigate("riwayat")}
                className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover-lift font-semibold text-base sm:text-lg shadow-xl relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Lihat Riwayat
              </Motion.button>
            </Motion.div>
            
            {/* Stats */}
            <Motion.div 
              className="grid grid-cols-3 gap-4 md:gap-8 justify-start max-w-xl md:max-w-2xl text-left"
              style={{marginLeft: 0}}
              variants={itemVariants}
            >
              {[
                { number: "500+", label: "Alat Tersedia" },
                { number: "1000+", label: "Peminjaman Sukses" },
                { number: "99%", label: "Tingkat Kepuasan" },
              ].map((stat, index) => (
                <div key={index} className="text-left">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 font-medium text-sm sm:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </Motion.div>
          </Motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <Motion.h2
            className="text-2xl sm:text-3xl font-bold text-center mb-12 text-slate-800"
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
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <Motion.h2
            className="text-2xl sm:text-3xl font-bold text-center mb-12 text-slate-800"
            variants={itemVariants}
          >
            Cara Kerja Sistem
          </Motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Isi Formulir",
                description: "Lengkapi data peminjaman dengan informasi yang diperlukan",
                icon: "📝"
              },
              {
                step: "02", 
                title: "Tunggu Approval",
                description: "Menunggu persetujuan dari kepala bengkel atau penanggung jawab",
                icon: "⏳"
              },
              {
                step: "03",
                title: "Ambil Alat",
                description: "Setelah disetujui, alat dapat diambil sesuai jadwal",
                icon: "📦"
              },
              {
                step: "04",
                title: "Kembalikan",
                description: "Kembalikan alat dalam kondisi baik sesuai jadwal",
                icon: "✅"
              }
            ].map((step, index) => (
              <Motion.div
                key={index}
                className="text-center group"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  {step.description}
                </p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-6xl mx-auto">
          <Motion.h2
            className="text-2xl sm:text-3xl font-bold text-center mb-12 text-slate-800"
            variants={itemVariants}
          >
            Apa Kata Pengguna
          </Motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Ahmad Rizki",
                role: "Siswa PPLG",
                avatar: "👨‍💻",
                quote: "Sistem ini sangat memudahkan dalam meminjam alat praktik. Prosesnya cepat dan tidak ribet!"
              },
              {
                name: "Siti Nurhaliza", 
                role: "Siswa TJKT",
                avatar: "👩‍💼",
                quote: "Dengan sistem digital ini, saya bisa track status peminjaman dengan mudah. Sangat praktis!"
              },
              {
                name: "Budi Santoso",
                role: "Kepala Bengkel",
                avatar: "👨‍🔧",
                quote: "Sistem ini membantu kami mengelola inventori alat dengan lebih terorganisir dan efisien."
              }
            ].map((testimonial, index) => (
              <Motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-white/30"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-600 italic">"{testimonial.quote}"</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <Motion.div
            className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl shadow-2xl px-6 sm:px-12 py-12 text-center"
            variants={itemVariants}
          >
            <Motion.h2
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
              variants={itemVariants}
            >
              Siap Memulai Peminjaman?
            </Motion.h2>
            <Motion.p
              className="text-primary-100 text-lg mb-8"
              variants={itemVariants}
            >
              Bergabunglah dengan ribuan siswa yang sudah merasakan kemudahan sistem peminjaman digital
            </Motion.p>
            <Motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <Motion.button
                onClick={() => onNavigate("peminjaman")}
                className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Mulai Sekarang
              </Motion.button>
              <Motion.button
                onClick={() => onNavigate("riwayat")}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Lihat Panduan
              </Motion.button>
            </Motion.div>
          </Motion.div>
        </div>
      </section>

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
