import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Pengembalian() {
  const [pengembalianForm, setPengembalianForm] = useState({
    idPeminjaman: "",
    kondisiAlat: "",
    foto: null,
    keteranganPengembalian: "",
  });

  // State untuk data peminjam
  const [peminjamData, setPeminjamData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [dataNotFound, setDataNotFound] = useState(false);

  const [loading, setLoading] = useState(false);

  // Fungsi untuk mencari data peminjam berdasarkan ID
  const fetchPeminjamData = async (id) => {
    if (!id) return;
    
    setLoadingData(true);
    setDataNotFound(false);
    setPeminjamData(null);
    
    try {
      const response = await fetch(`http://localhost:8080/get-peminjam-data?id=${id}`);
      if (response.ok) {
        const data = await response.json();
        setPeminjamData(data);
        setDataNotFound(false);
      } else {
        setPeminjamData(null);
        setDataNotFound(true);
      }
    } catch (error) {
      console.error("Error fetching peminjam data:", error);
      setPeminjamData(null);
      setDataNotFound(true);
    } finally {
      setLoadingData(false);
    }
  };

  const handlePengembalianChange = (e) => {
    const { name, value } = e.target;
    setPengembalianForm({
      ...pengembalianForm,
      [name]: value,
    });
  };

  // Handler khusus untuk perubahan ID Peminjaman
  const handleIdPeminjamanChange = (e) => {
    const id = e.target.value;
    setPengembalianForm({
      ...pengembalianForm,
      idPeminjaman: id,
    });
    
    // Cari data jika ID memiliki nilai
    if (id) {
      fetchPeminjamData(id);
    } else {
      setPeminjamData(null);
      setDataNotFound(false);
    }
  };

  const handlePengembalianFileChange = (e) => {
    const file = e.target.files[0];
    setPengembalianForm({ ...pengembalianForm, foto: file });
  };

  const resetForm = () => {
    setPengembalianForm({
      idPeminjaman: "",
      kondisiAlat: "",
      foto: null,
      keteranganPengembalian: "",
    });
    setPeminjamData(null);
    setDataNotFound(false);
  };

  const handlePengembalianSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("idPeminjam", pengembalianForm.idPeminjaman);
      formData.append("kondisiAlat", pengembalianForm.kondisiAlat);
      formData.append(
        "keteranganPengembalian",
        pengembalianForm.keteranganPengembalian
      );
      if (pengembalianForm.foto) {
        formData.append("foto", pengembalianForm.foto);
      }

      // Fire and forget fetch
      fetch("http://localhost:8080/pengembalian", {
        method: "POST",
        body: formData,
      });

      // Show loading circle briefly before showing success toast
      setTimeout(() => {
        toast.success("✅ Permohonan pengembalian dikirim.");
        resetForm();
        setLoading(false);
      }, 1500); // 1.5 seconds loading animation
    } catch (err) {
      toast.error("Gagal mengirim data pengembalian.");
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-xl p-10 max-w-3xl mx-auto">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-20 rounded-xl">
          <div className="loader"></div>
          <span className="ml-4 text-indigo-900 font-semibold">
             Please wait, your data is being processed...
          </span>
        </div>
      )}
      <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-900">
        Formulir Pengembalian Alat SMKN 7 SEMARANG
      </h1>
      
      {/* Data Peminjam Section */}
      <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200 transition-all duration-500 ease-in-out transform hover:scale-[1.02]">
        <h2 className="text-xl font-bold mb-4 text-blue-800">Data Peminjam</h2>
        
        {loadingData && (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-blue-700">Mencari data...</span>
          </div>
        )}
        
        {dataNotFound && pengembalianForm.idPeminjaman && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Data tidak ditemukan! </strong>
            <span className="block sm:inline">ID Peminjaman "{pengembalianForm.idPeminjaman}" tidak ditemukan.</span>
          </div>
        )}
        
        {peminjamData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
            <div>
              <p className="text-sm text-gray-600">Nama</p>
              <p className="font-semibold">{peminjamData.nama}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Kelas</p>
              <p className="font-semibold">{peminjamData.kelas}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">NIS</p>
              <p className="font-semibold">{peminjamData.nis}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Nama Alat</p>
              <p className="font-semibold">{peminjamData.namaAlat}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Jumlah Alat</p>
              <p className="font-semibold">{peminjamData.jumlahAlat}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tanggal Pinjam</p>
              <p className="font-semibold">{peminjamData.tanggalPinjam}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tanggal Kembali</p>
              <p className="font-semibold">{peminjamData.tanggalKembali}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Lama Pinjam</p>
              <p className="font-semibold">{peminjamData.lamaPinjam}</p>
            </div>
            {peminjamData.approvalStatus && (
              <div>
                <p className="text-sm text-gray-600">Status Approval</p>
                <p className={`font-semibold ${
                  peminjamData.approvalStatus === "disetujui" ? "text-green-600" : 
                  peminjamData.approvalStatus === "ditolak" ? "text-red-600" : "text-yellow-600"
                }`}>
                  {peminjamData.approvalStatus}
                </p>
              </div>
            )}
          </div>
        )}
        
        {!peminjamData && !loadingData && !dataNotFound && (
          <p className="text-gray-500 italic">Masukkan ID Peminjaman untuk melihat data peminjam</p>
        )}
      </div>
      
      <form onSubmit={handlePengembalianSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-2 text-indigo-800">
            ID Peminjaman
          </label>
          <input
            type="text"
            name="idPeminjaman"
            value={pengembalianForm.idPeminjaman}
            onChange={handleIdPeminjamanChange}
            className="w-full border border-indigo-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />
          <p className="text-sm text-gray-500 mt-1">Masukkan ID peminjaman.</p>
        </div>
        <div>
          <label className="block font-semibold mb-2 text-indigo-800">
            Kondisi Alat
          </label>
          <input
            type="text"
            name="kondisiAlat"
            value={pengembalianForm.kondisiAlat}
            onChange={handlePengembalianChange}
            className="w-full border border-indigo-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />
          <p className="text-sm text-gray-500 mt-1">Masukkan kondisi alat saat dikembalikan.</p>
        </div>
        <div>
          <label className="block font-semibold mb-2 text-indigo-800">
            Keterangan Pengembalian
          </label>
          <input
            type="text"
            name="keteranganPengembalian"
            value={pengembalianForm.keteranganPengembalian}
            onChange={handlePengembalianChange}
            className="w-full border border-indigo-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <p className="text-sm text-gray-500 mt-1">Berikan keterangan tambahan jika perlu.</p>
        </div>
        <div>
          <label className="block font-semibold mb-2 text-indigo-800">
            Foto Alat (upload file)
          </label>
          <div className="flex items-center space-x-4">
            <label
              htmlFor="foto-upload-pengembalian"
              className="cursor-pointer bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              {pengembalianForm.foto ? "Change File" : "Choose File"}
            </label>
            <span className="text-indigo-700">
              {pengembalianForm.foto
                ? pengembalianForm.foto.name
                : "No file chosen"}
            </span>
          </div>
          <input
            id="foto-upload-pengembalian"
            type="file"
            name="foto"
            accept="image/*"
            onChange={handlePengembalianFileChange}
            className="hidden"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          disabled={!peminjamData}
        >
          Kirim
        </button>
      </form>
      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3; /* Light grey */
          border-top: 8px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
