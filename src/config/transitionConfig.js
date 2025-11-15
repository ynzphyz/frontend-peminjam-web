// Konfigurasi transisi untuk setiap page
export const transitionVariants = {
  // Home - fade in dari atas
  home: {
    initial: { opacity: 0, y: 30 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -30 },
  },

  // Form Peminjaman - fade in dari kiri
  formPeminjaman: {
    initial: { opacity: 0, x: -30 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 30 },
  },

  // Form Approval - fade in dari kanan
  formApproval: {
    initial: { opacity: 0, x: 30 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -30 },
  },

  // Form Pengembalian - fade in dari bawah
  formPengembalian: {
    initial: { opacity: 0, y: -30 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: 30 },
  },

  // Riwayat - fade in smooth
  riwayat: {
    initial: { opacity: 0, scale: 0.98 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.02 },
  },
};

export const pageTransition = {
  type: "tween",
  duration: 0.35,
  ease: "easeInOut",
};
