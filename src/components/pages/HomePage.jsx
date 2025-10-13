import React from "react";
import { motion as Motion } from "framer-motion";

export default function HomePage({ onNavigate }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
      className="min-h-screen bg-slate-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section - Left Aligned */}
      <section className="px-6 py-24 md:py-32 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <Motion.div className="max-w-4xl" variants={cardVariants}>
            {/* School Name - Left Aligned */}
            <Motion.h2
              className="text-blue-400 text-lg sm:text-xl md:text-2xl mb-6 font-semibold tracking-wide uppercase"
              variants={itemVariants}
            >
              SMKN 7 SEMARANG
            </Motion.h2>
            
            {/* Main Title - Left Aligned */}
            <Motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.1]"
              variants={itemVariants}
            >
              Sistem Peminjaman
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-slate-300">
                Alat Praktik
              </span>
            </Motion.h1>
            
            {/* Description - Left Aligned */}
            <Motion.p
              className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-12 max-w-3xl"
              variants={itemVariants}
            >
              Platform digital terdepan untuk memudahkan proses peminjaman alat
              praktik. Sistem otomatis yang terintegrasi langsung dengan database
              sekolah.
            </Motion.p>
            
            {/* CTA Buttons - Left Aligned */}
            <Motion.div
              className="flex flex-col sm:flex-row gap-6 mb-16"
              variants={itemVariants}
            >
              <Motion.button
                onClick={() => onNavigate("peminjaman")}
                aria-label="Mulai proses peminjaman alat praktik"
                role="button"
                tabIndex={0}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl border border-blue-500 group"
              >
                <span className="flex items-center justify-center">
                  Mulai Pinjam Sekarang
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Motion.button>

              <Motion.button
                onClick={() => onNavigate("riwayat")}
                className="border-2 border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-slate-500 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Lihat Riwayat
              </Motion.button>
            </Motion.div>
            
            {/* Stats - Left Aligned */}
            <Motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl"
              variants={itemVariants}
            >
              {[
                { number: "500+", label: "Alat Tersedia" },
                { number: "1000+", label: "Peminjaman Sukses" },
                { number: "99%", label: "Tingkat Kepuasan" },
              ].map((stat, index) => (
                <div key={index} className="text-left">
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-400 font-medium text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </Motion.div>
          </Motion.div>
        </div>
      </section>

      {/* Features Section - Centered */}
      <section className="px-6 py-20 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <Motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
            variants={itemVariants}
          >
            Mengapa Menggunakan Sistem Ini?
          </Motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Motion.div
                key={index}
                className="bg-slate-700/80 backdrop-blur-sm border border-slate-600/50 rounded-xl p-8 hover:bg-slate-600/80 transition-all duration-300 hover:border-blue-500/30"
                variants={cardVariants}
                whileHover={{ y: -8 }}
              >
                <div className="text-5xl mb-6 text-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-slate-300 text-center leading-relaxed">
                  {feature.description}
                </p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Status Section - After Features */}
      <section className="px-6 py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <Motion.h2 className="text-2xl font-bold text-center mb-12 text-white">
            Status Real-time Sistem
          </Motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-4"></div>
              <h3 className="text-white font-medium">Sistem Online</h3>
              <p className="text-slate-400 text-sm">Uptime: 99.9%</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
              <div className="text-blue-400 text-2xl font-bold mb-2">24</div>
              <h3 className="text-white font-medium">Alat Tersedia</h3>
              <p className="text-slate-400 text-sm">Hari ini</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
              <div className="text-green-400 text-2xl font-bold mb-2">12</div>
              <h3 className="text-white font-medium">Peminjaman Aktif</h3>
              <p className="text-slate-400 text-sm">Saat ini</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Centered */}
      <section className="px-6 py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <Motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
            variants={itemVariants}
          >
            Cara Kerja Sistem
          </Motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
                className="text-center"
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-blue-600 border-2 border-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-3xl">{step.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-600 border-2 border-slate-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {step.description}
                </p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Centered */}
      <section className="px-6 py-20 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <Motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
            variants={itemVariants}
          >
            Apa Kata Pengguna
          </Motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className="bg-slate-700 border border-slate-600 rounded-xl p-6"
                variants={cardVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-300 italic leading-relaxed">"{testimonial.quote}"</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Centered */}
      <section className="px-6 py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <Motion.div
            className="bg-slate-800 border border-slate-700 rounded-2xl px-8 py-16"
            variants={cardVariants}
          >
            <Motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              Siap Memulai Peminjaman?
            </Motion.h2>
            <Motion.p
              className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed"
              variants={itemVariants}
            >
              Bergabunglah dengan ribuan siswa yang sudah merasakan kemudahan sistem peminjaman digital
            </Motion.p>
            <Motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              variants={itemVariants}
            >
              <Motion.button
                onClick={() => onNavigate("peminjaman")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Mulai Sekarang
              </Motion.button>
              <Motion.button
                onClick={() => onNavigate("riwayat")}
                className="border-2 border-slate-600 text-slate-300 hover:bg-slate-800 px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Lihat Panduan
              </Motion.button>
            </Motion.div>
          </Motion.div>
        </div>
      </section>

      {/* FAQ Section - Before CTA */}
      <section className="px-6 py-20 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <Motion.h2 className="text-3xl font-bold text-center mb-12 text-white">
            Pertanyaan Sering Diajukan
          </Motion.h2>
          <div className="space-y-4">
            {[
              {
                q: "Berapa lama batas waktu peminjaman alat?",
                a: "Maksimal 7 hari untuk alat praktik reguler, dan 14 hari untuk project besar."
              },
              {
                q: "Bagaimana jika alat rusak saat dipinjam?",
                a: "Segera laporkan ke kepala bengkel. Kerusakan akan dievaluasi dan ditentukan tindak lanjutnya."
              },
              {
                q: "Apakah bisa memperpanjang masa peminjaman?",
                a: "Ya, bisa mengajukan perpanjangan maksimal 3 hari sebelum batas waktu berakhir."
              }
            ].map((faq, index) => (
              <Motion.details key={index} className="bg-slate-700 rounded-lg p-4">
                <summary className="text-white font-medium cursor-pointer">{faq.q}</summary>
                <p className="text-slate-300 mt-3 text-sm">{faq.a}</p>
              </Motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <Motion.div
        className="fixed bottom-8 right-8 z-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <Motion.button
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl border border-blue-500"
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
