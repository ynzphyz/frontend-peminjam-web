import React from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  TrendingUp,
  Users,
  Boxes,
  Sparkles,
  Zap as InfinityIcon,
} from "lucide-react";
import logoStemba from "../../assets/Logo_STEMBA.png";

export default function HomePage() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Proses peminjaman instan dengan approval real-time dalam hitungan detik",
      gradient: "from-yellow-400 to-orange-500",
      bgGradient: "from-yellow-500/10 to-orange-500/10",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Enkripsi tingkat militer dan audit trail lengkap untuk setiap transaksi",
      gradient: "from-green-400 to-emerald-500",
      bgGradient: "from-green-500/10 to-emerald-500/10",
    },
    {
      icon: Clock,
      title: "Smart Analytics",
      description:
        "Dashboard real-time dengan insights mendalam tentang penggunaan alat",
      gradient: "from-blue-400 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      icon: CheckCircle,
      title: "Automated Workflow",
      description:
        "Sistem approval otomatis yang terstruktur dan transparan penuh",
      gradient: "from-purple-400 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10",
    },
  ];

  const stats = [
    {
      icon: Boxes,
      number: "500+",
      label: "Alat Berkualitas",
      subtext: "Terintegrasi penuh",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      icon: TrendingUp,
      number: "10K+",
      label: "Transaksi Sukses",
      subtext: "Setiap tahunnya",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      icon: Users,
      number: "99.9%",
      label: "Uptime Sistem",
      subtext: "Terjamin 24/7",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      icon: InfinityIcon,
      number: "0ms",
      label: "Response Time",
      subtext: "Ultra cepat",
      gradient: "from-orange-400 to-red-500",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Pilih Alat",
      desc: "Browse katalog lengkap alat praktik",
    },
    {
      number: "02",
      title: "Isi Form",
      desc: "Lengkapi data peminjaman dengan mudah",
    },
    { number: "03", title: "Submit", desc: "Kirim untuk persetujuan instant" },
    {
      number: "04",
      title: "Konfirmasi",
      desc: "Terima alat dalam waktu singkat",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a183d] via-[#0f1b35] to-[#1a2a4a] overflow-hidden relative">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20"
          animate={{
            y: [0, 100, 0],
            x: [0, 60, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -right-32 w-96 h-96 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-15"
          animate={{
            y: [0, -80, 0],
            x: [0, -50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 left-1/3 w-80 h-80 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-15"
          animate={{
            y: [0, 60, 0],
            x: [0, 80, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <motion.div
        className="relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section - Ultra Premium */}
        <section className="min-h-screen px-6 lg:px-12 py-20 flex items-center justify-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Logo dengan Floating Effect */}
              <motion.div
                className="flex justify-center lg:justify-start"
                variants={itemVariants}
              >
                <div className="relative">
                  {/* Outer Glow Ring */}
                  <motion.div
                    className="absolute -inset-8 rounded-3xl"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-3xl blur-xl opacity-30" />
                  </motion.div>

                  {/* Middle Ring */}
                  <motion.div
                    className="absolute -inset-4 rounded-3xl"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur-lg opacity-20" />
                  </motion.div>

                  {/* Logo Container */}
                  <motion.div
                    className="relative bg-gradient-to-br from-blue-900/50 to-purple-900/30 backdrop-blur-xl border border-blue-400/30 p-8 rounded-3xl shadow-2xl"
                    animate={{
                      y: [0, -15, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{ scale: 1.08, rotate: 5 }}
                  >
                    <img
                      src={logoStemba}
                      alt="SMKN 7 Semarang"
                      className="w-80 h-80 object-contain drop-shadow-2xl"
                    />
                  </motion.div>

                  {/* Floating Particles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                      style={{
                        top: `${20 + i * 30}%`,
                        left: `${60 + i * 20}%`,
                      }}
                      animate={{
                        y: [0, -30, 0],
                        x: [0, 20, 0],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Right - Premium Content */}
              <motion.div variants={itemVariants} className="space-y-10">
                {/* Top Badge */}
                <motion.div
                  className="inline-block"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/50 rounded-full flex items-center gap-2 backdrop-blur-sm w-fit">
                    <Sparkles size={16} className="text-cyan-400" />
                    <span className="text-cyan-300 text-sm font-bold">
                      Next Generation Platform
                    </span>
                  </div>
                </motion.div>

                {/* Main Title */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <h1 className="text-6xl lg:text-7xl font-black leading-tight">
                    <span className="block text-white">Manajemen Alat</span>
                    <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                      Generasi Baru
                    </span>
                  </h1>
                </motion.div>

                {/* Description */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Platform revolusioner untuk manajemen peminjaman alat
                    praktik dengan teknologi AI, real-time tracking, dan
                    approval otomatis yang mengubah cara kerja sekolah Anda.
                  </p>
                  <p className="text-lg text-gray-400">
                    Dipercaya oleh{" "}
                    <span className="text-cyan-400 font-bold">
                      1000+ pengguna aktif
                    </span>{" "}
                    dengan tingkat kepuasan{" "}
                    <span className="text-emerald-400 font-bold">99.9%</span>
                  </p>
                </motion.div>

                {/* Feature Highlights */}
                <motion.div
                  className="space-y-3 pt-4"
                  variants={containerVariants}
                >
                  {[
                    "⚡ Proses 10x lebih cepat dari sistem manual",
                    "🔒 Keamanan enterprise dengan enkripsi end-to-end",
                    "📊 Dashboard analytics real-time dan insights mendalam",
                    "🤖 AI-powered recommendations untuk optimasi inventaris",
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 group"
                      variants={itemVariants}
                      whileHover={{ x: 10 }}
                    >
                      <div className="w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full group-hover:scale-150 transition-transform" />
                      <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-wrap gap-4 pt-8"
                  variants={itemVariants}
                >
                  <motion.button
                    onClick={() => navigate("/form-peminjaman")}
                    className="group relative px-8 py-4 rounded-xl font-bold text-lg text-white overflow-hidden"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:from-blue-500 group-hover:to-cyan-500 transition-all duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <span className="relative flex items-center gap-2">
                      Mulai Sekarang
                      <ArrowRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                  </motion.button>

                  <motion.button
                    onClick={() => navigate("/riwayat")}
                    className="px-8 py-4 rounded-xl font-bold text-lg border-2 border-blue-400/50 text-blue-300 hover:bg-blue-400/10 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Jelajahi Riwayat
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section - Luxury */}
        <section className="px-6 lg:px-12 py-24">
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
                Powered by Numbers
              </h2>
              <p className="text-xl text-gray-400">
                Statistik real-time dari sistem terdepan
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl backdrop-blur-xl border border-blue-400/20 hover:border-blue-400/50 p-8 transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ y: -12, scale: 1.05 }}
                  >
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    {/* Content */}
                    <div className="relative z-10 space-y-4">
                      <motion.div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}
                        whileHover={{ rotate: 12 }}
                      >
                        <Icon size={24} className="text-white" />
                      </motion.div>

                      <div>
                        <motion.p
                          className={`text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}
                          variants={itemVariants}
                        >
                          {stat.number}
                        </motion.p>
                        <p className="text-gray-300 font-bold mb-1">
                          {stat.label}
                        </p>
                        <p className="text-gray-500 text-sm">{stat.subtext}</p>
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="px-6 lg:px-12 py-24">
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-20" variants={itemVariants}>
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
                Alur Simpel, Hasil Maksimal
              </h2>
              <p className="text-xl text-gray-400">
                Hanya 4 langkah untuk mendapatkan alat impian Anda
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
            >
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  variants={itemVariants}
                >
                  {/* Card */}
                  <motion.div
                    className="relative bg-gradient-to-br from-blue-900/30 to-purple-900/20 border border-blue-400/20 hover:border-blue-400/50 rounded-2xl p-8 backdrop-blur-xl overflow-hidden transition-all duration-300 h-full"
                    whileHover={{ y: -8 }}
                  >
                    {/* Number */}
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-600/30 to-cyan-600/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10 space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                          {step.number}
                        </span>
                        {index < 3 && (
                          <ArrowRight size={24} className="text-blue-400/50" />
                        )}
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-400">{step.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-6 lg:px-12 py-24">
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-20" variants={itemVariants}>
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
                Fitur-Fitur Unggulan
              </h2>
              <p className="text-xl text-gray-400">
                Teknologi terdepan untuk pengalaman terbaik
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
                    className="group relative"
                    variants={itemVariants}
                  >
                    <motion.div
                      className={`relative bg-gradient-to-br ${feature.bgGradient} border border-blue-400/20 hover:border-blue-400/50 rounded-2xl p-8 backdrop-blur-xl overflow-hidden h-full transition-all duration-300`}
                      whileHover={{ y: -12, scale: 1.05 }}
                    >
                      {/* Gradient Background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                      />

                      <div className="relative z-10 space-y-6">
                        <motion.div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:shadow-xl group-hover:shadow-current/50 transition-all`}
                          whileHover={{ rotate: 20, scale: 1.15 }}
                        >
                          <Icon size={28} className="text-white" />
                        </motion.div>

                        <div>
                          <h3 className="text-xl font-bold text-white mb-3">
                            {feature.title}
                          </h3>
                          <p className="text-gray-400 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>

                        {/* Animated underline */}
                        <motion.div
                          className={`h-1 w-0 bg-gradient-to-r ${feature.gradient} group-hover:w-full transition-all duration-500`}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Ultimate CTA */}
        <section className="px-6 lg:px-12 py-24">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="group relative overflow-hidden rounded-3xl backdrop-blur-xl p-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative bg-gradient-to-br from-[#0a183d] to-[#1a2a4a] rounded-3xl p-16 text-center space-y-8">
                <motion.div variants={containerVariants}>
                  <motion.h2
                    className="text-5xl lg:text-6xl font-black text-white mb-6"
                    variants={itemVariants}
                  >
                    Revolusioner Cara Anda Bekerja
                  </motion.h2>
                  <motion.p
                    className="text-xl text-gray-300 max-w-2xl mx-auto"
                    variants={itemVariants}
                  >
                    Tingkatkan produktivitas, kurangi kompleksitas, dan
                    optimalkan manajemen alat dengan platform paling canggih di
                    industri
                  </motion.p>
                </motion.div>

                <motion.button
                  onClick={() => navigate("/form-peminjaman")}
                  className="group/btn relative px-12 py-5 rounded-xl font-bold text-lg text-white overflow-hidden inline-flex items-center gap-3"
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 group-hover/btn:from-blue-500 group-hover/btn:via-purple-500 group-hover/btn:to-cyan-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 blur-xl opacity-0 group-hover/btn:opacity-100 transition-all duration-300" />
                  <span className="relative flex items-center gap-2">
                    Mulai Transformasi Sekarang
                    <ArrowRight
                      size={22}
                      className="group-hover/btn:translate-x-2 transition-transform"
                    />
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <section className="px-6 lg:px-12 py-16 border-t border-blue-500/10 text-center">
          <motion.div variants={itemVariants} className="space-y-3">
            <p className="text-gray-400 text-sm">
              © 2024 SMKN 7 Semarang • Next Generation Platform
            </p>
            <p className="text-gray-500 text-xs">
              Transformasi Digital untuk Pendidikan Berkualitas
            </p>
          </motion.div>
        </section>
      </motion.div>
    </div>
  );
}
