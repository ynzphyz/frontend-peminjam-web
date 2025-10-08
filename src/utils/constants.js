// Status options for filtering
export const STATUS_OPTIONS = [
  "Semua", 
  "Disetujui", 
  "Dipinjam", 
  "Dikembalikan", 
  "Menunggu Persetujuan", 
  "Ditolak"
];

// Kondisi alat options
export const KONDISI_ALAT_OPTIONS = [
  "Baik",
  "Rusak Ringan", 
  "Rusak Berat"
];

// Approval status options
export const APPROVAL_STATUS_OPTIONS = [
  "Disetujui",
  "Ditolak"
];

// Form field names
export const FORM_FIELDS = {
  PEMINJAMAN: {
    NAMA: 'nama',
    KELAS: 'kelas',
    NIS: 'nis',
    NO_WA: 'noWa',
    NAMA_ALAT: 'namaAlat',
    JUMLAH_ALAT: 'jumlahAlat',
    TANGGAL_PINJAM: 'tanggalPinjam',
    TANGGAL_KEMBALI: 'tanggalKembali',
    KETERANGAN: 'keterangan',
    FOTO: 'foto'
  },
  APPROVAL: {
    ID_PINJAM: 'idPinjam',
    APPROVER: 'approver',
    STATUS_PERSETUJUAN: 'statusPersetujuan'
  },
  PENGEMBALIAN: {
    ID_PEMINJAMAN: 'idPeminjaman',
    KONDISI_ALAT: 'kondisiAlat',
    FOTO: 'foto',
    KETERANGAN_PENGEMBALIAN: 'keteranganPengembalian'
  }
};

// Navigation menu items
export const MENU_ITEMS = [
  { key: 'home', label: 'Home', isHome: true },
  { key: 'peminjaman', label: 'Peminjaman' },
  { key: 'approval', label: 'Approval' },
  { key: 'pengembalian', label: 'Pengembalian' },
  { key: 'riwayat', label: 'Riwayat' }
];

// Toast messages
export const TOAST_MESSAGES = {
  SUCCESS: {
    PEMINJAMAN: 'Pengajuan peminjaman berhasil dikirim!',
    APPROVAL: 'Persetujuan berhasil diproses!',
    PENGEMBALIAN: 'Pengembalian berhasil diproses!'
  },
  ERROR: {
    REQUIRED_FIELDS: 'Harap isi semua field yang wajib!',
    NETWORK_ERROR: 'Terjadi kesalahan jaringan. Silakan coba lagi.',
    SERVER_ERROR: 'Terjadi kesalahan server. Silakan coba lagi.',
    FILE_SIZE: 'Ukuran file terlalu besar. Maksimal 5MB.',
    FILE_TYPE: 'Tipe file tidak didukung. Gunakan JPG, PNG, atau PDF.'
  }
};
