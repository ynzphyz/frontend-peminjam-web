import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import LogoStemba from "../../assets/Logo_STEMBA.png";
export default function HomePage({ onNavigate }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const features = [
    {
      icon: (
        <div className="bg-blue-900 text-blue-400 w-12 h-12 rounded-full flex items-center justify-center shadow">
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
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
      ),
      title: "Proses Instan",
      desc: "Peminjaman alat hanya butuh beberapa klik, tanpa ribet.",
    },
    {
      icon: (
        <div className="bg-green-900 text-green-400 w-12 h-12 rounded-full flex items-center justify-center shadow">
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
              d="M12 11c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm0 0V7m0 4v4m0 0h4m-4 0H8"
            />
          </svg>
        </div>
      ),
      title: "Terdata & Aman",
      desc: "Semua alat terpantau, terintegrasi dengan database sekolah.",
    },
    {
      icon: (
        <div className="bg-purple-900 text-purple-400 w-12 h-12 rounded-full flex items-center justify-center shadow">
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
              d="M9 17v-2a4 4 0 014-4h3m-7 6v2a4 4 0 004 4h3m-7-6H5a4 4 0 01-4-4V7a4 4 0 014-4h3m7 6h2a4 4 0 014 4v3a4 4 0 01-4 4h-3"
            />
          </svg>
        </div>
      ),
      title: "Realtime & Otomatis",
      desc: "Update status alat langsung, tanpa manual input.",
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#0a183d] via-[#101a2b] to-[#1e293b] relative overflow-x-hidden text-white"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
      }}
    >
      {/* Animated Blobs */}
      <motion.div
        className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-900 opacity-30 rounded-full blur-3xl z-0"
        animate={{ scale: [1, 1.2, 1], x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-900 opacity-30 rounded-full blur-3xl z-0"
        animate={{ scale: [1, 1.1, 1], x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-10 md:py-32 flex flex-col md:flex-row items-center max-w-7xl mx-auto z-10">
        {/* SVG Illustration */}
        <motion.div
          className="flex-1 flex justify-center items-center mb-10 md:mb-0"
          variants={fadeUp}
        >
          <img
            src={LogoStemba}
            alt="Illustration"
            className="w-64"
          />
        </motion.div>
        {/* Hero Text */}
        <motion.div className="flex-1" variants={fadeUp}>
          <h2 className="text-blue-400 text-lg font-semibold uppercase mb-4 tracking-wide">
            SMKN 7 SEMARANG
          </h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Sistem Peminjaman <br />
            <span className="text-blue-400">Alat Praktik</span>
          </h1>
          <p className="text-slate-300 text-lg mb-8 max-w-xl">
            Platform digital modern untuk memudahkan proses peminjaman alat
            praktik. Terintegrasi langsung dengan database sekolah, cepat dan
            aman.
          </p>
          <div className="flex gap-4 flex-col sm:flex-row">
            <button
              onClick={() => onNavigate("peminjaman")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300"
            >
              Mulai Pinjam
            </button>
            <button
              onClick={() => onNavigate("riwayat")}
              className="bg-transparent border border-blue-400 text-blue-400 hover:bg-blue-900 px-8 py-3 rounded-xl font-semibold text-lg shadow transition-all duration-300"
            >
              Lihat Riwayat
            </button>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="px-6 py-16 max-w-5xl mx-auto z-10">
        <motion.div
          className="bg-[#16213a] rounded-2xl shadow-xl p-8 text-center border border-blue-900"
          variants={fadeUp}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-4">
            Tentang Sistem Peminjaman
          </h2>
          <p className="text-slate-300 text-lg mb-2">
            Sistem ini dibuat untuk memudahkan siswa dan guru dalam proses
            peminjaman alat praktik di SMKN 7 Semarang.
          </p>
          <p className="text-slate-400 text-base">
            Semua data alat, peminjam, dan pengembalian tercatat otomatis dan
            terintegrasi dengan database sekolah. Proses lebih cepat,
            transparan, dan aman.
          </p>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-blue-400">
          Cara Kerja Sistem
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              step: "1",
              title: "Isi Formulir",
              desc: "Lengkapi data peminjaman dengan informasi yang diperlukan.",
              icon: "📝",
            },
            {
              step: "2",
              title: "Tunggu Approval",
              desc: "Menunggu persetujuan dari kepala bengkel atau penanggung jawab.",
              icon: "⏳",
            },
            {
              step: "3",
              title: "Ambil Alat",
              desc: "Setelah disetujui, alat dapat diambil sesuai jadwal.",
              icon: "📦",
            },
            {
              step: "4",
              title: "Kembalikan",
              desc: "Kembalikan alat dalam kondisi baik sesuai jadwal.",
              icon: "✅",
            },
          ].map((step, idx) => (
            <motion.div
              key={idx}
              className="bg-[#16213a] rounded-xl p-8 text-center shadow-lg border border-blue-900 hover:bg-blue-900 transition-all duration-300"
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center text-2xl bg-blue-900 rounded-full border-2 border-blue-400">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                {step.title}
              </h3>
              <p className="text-slate-300 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-blue-400">
          Fitur Unggulan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-[#16213a] rounded-2xl shadow-lg p-8 flex flex-col items-center border border-blue-900 hover:bg-blue-900 transition-all duration-300"
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.07 }}
            >
              {feature.icon}
              <h3 className="text-lg font-semibold text-blue-400 mt-6 mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-slate-300 text-center">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Statistic Section */}
      <section className="px-6 py-12 max-w-5xl mx-auto z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { number: "500+", label: "Alat Tersedia", color: "text-blue-400" },
            {
              number: "1000+",
              label: "Peminjaman Sukses",
              color: "text-green-400",
            },
            {
              number: "99%",
              label: "Tingkat Kepuasan",
              color: "text-purple-400",
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="bg-[#16213a] rounded-2xl shadow-xl p-8 flex flex-col items-center border border-blue-900 hover:bg-blue-900 transition-all duration-300"
              variants={fadeUp}
              whileHover={{
                scale: 1.07,
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              }}
            >
              <div
                className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}
              >
                {stat.number}
              </div>
              <div className="text-slate-300 font-medium text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-16 max-w-4xl mx-auto z-10">
        <h2 className="text-2xl font-bold text-center mb-10 text-blue-400">
          FAQ
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "Berapa lama batas waktu peminjaman alat?",
              a: "Maksimal 7 hari untuk alat praktik reguler, dan 14 hari untuk project besar.",
            },
            {
              q: "Bagaimana jika alat rusak saat dipinjam?",
              a: "Segera laporkan ke kepala bengkel. Kerusakan akan dievaluasi dan ditentukan tindak lanjutnya.",
            },
            {
              q: "Apakah bisa memperpanjang masa peminjaman?",
              a: "Ya, bisa mengajukan perpanjangan maksimal 3 hari sebelum batas waktu berakhir.",
            },
          ].map((faq, idx) => (
            <motion.details
              key={idx}
              className="bg-[#16213a] rounded-lg p-4 border border-blue-900 shadow hover:bg-blue-900 transition-all duration-300"
              variants={fadeUp}
            >
              <summary className="text-blue-400 font-medium cursor-pointer">
                {faq.q}
              </summary>
              <p className="text-slate-300 mt-3 text-sm">{faq.a}</p>
            </motion.details>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 max-w-4xl mx-auto z-10">
        <motion.div
          className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-800 rounded-2xl px-8 py-12 shadow-xl text-center border border-blue-900"
          variants={fadeUp}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-4">
            Siap Memulai Peminjaman?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Bergabunglah dengan siswa lain yang sudah merasakan kemudahan sistem
            digital ini!
          </p>
          <button
            onClick={() => onNavigate("peminjaman")}
            className="bg-blue-600 text-white font-bold px-10 py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            Mulai Sekarang
          </button>
        </motion.div>
      </section>

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl border border-blue-500"
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
        </button>
      </motion.div>
    </motion.div>
  );
}
