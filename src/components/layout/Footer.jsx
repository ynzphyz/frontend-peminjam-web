import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const socialLinks = [
    { icon: Facebook, label: "Facebook", color: "hover:text-blue-400" },
    { icon: Twitter, label: "Twitter", color: "hover:text-cyan-400" },
    { icon: Instagram, label: "Instagram", color: "hover:text-pink-400" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#0a183d] to-[#050d1f] border-t border-blue-900/30 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-10"
          animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-10"
          animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-blue-500/40"
                whileHover={{ scale: 1.1 }}
              >
                S7
              </motion.div>
              <div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  SMKN 7
                </h3>
                <p className="text-xs text-gray-400">SEMARANG</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Platform manajemen alat praktik generasi baru dengan teknologi
              terdepan untuk mendukung pendidikan berkualitas.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-bold text-blue-300">Menu</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", path: "/" },
                { label: "Peminjaman", path: "/form-peminjaman" },
                { label: "Approval", path: "/form-approval" },
                { label: "Pengembalian", path: "/form-pengembalian" },
                { label: "Riwayat", path: "/riwayat" },
              ].map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-bold text-blue-300">Kontak</h4>
            <div className="space-y-4">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group hover:text-blue-400 transition-colors"
              >
                <MapPin
                  size={18}
                  className="text-blue-400 flex-shrink-0 mt-1"
                />
                <span className="text-sm text-gray-400 group-hover:text-blue-300">
                  Jl. Simpang Lima No.1
                  <br />
                  Semarang, Jawa Tengah
                </span>
              </a>
              <a
                href="mailto:info@smkn7semarang.sch.id"
                className="flex items-center gap-3 group hover:text-blue-400 transition-colors"
              >
                <Mail size={18} className="text-blue-400" />
                <span className="text-sm text-gray-400 group-hover:text-blue-300">
                  info@smkn7semarang.sch.id
                </span>
              </a>
              <a
                href="tel:+62241234567"
                className="flex items-center gap-3 group hover:text-blue-400 transition-colors"
              >
                <Phone size={18} className="text-blue-400" />
                <span className="text-sm text-gray-400 group-hover:text-blue-300">
                  (024) 123-4567
                </span>
              </a>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-bold text-blue-300">Ikuti Kami</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href="#"
                    className={`w-10 h-10 bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:border-blue-400/50`}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent my-8"
          variants={itemVariants}
        />

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4"
          variants={itemVariants}
        >
          <p className="text-sm text-gray-500">
            © {currentYear} SMKN 7 Semarang. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Made with <span className="text-red-400">❤️</span> for education
            excellence
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
