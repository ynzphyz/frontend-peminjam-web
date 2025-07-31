import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Peminjaman() {
  const [peminjamanForm, setPeminjamanForm] = useState({
    nama: "",
    kelas: "",
    nis: "",
    noWa: "",
    namaAlat: "",
    jumlahAlat: 1,
    tanggalPinjam: "",
    tanggalKembali: "",
    keterangan: "",
    foto: null,
  });

  const [loading, setLoading] = useState(false);

  // Timer untuk sembunyikan notifikasi otomatis
  // Removed success state and fixed-position notification to avoid duplicate with toast
  // useEffect(() => {
  //   let timer;
  //   if (success) {
  //     timer = setTimeout(() => setSuccess(false), 4000);
  //   }
  //   return () => clearTimeout(timer);
  // }, [success]);

  // Reset form ke awal
  const resetForm = () => {
    setPeminjamanForm({
      nama: "",
      kelas: "",
      nis: "",
      noWa: "",
      namaAlat: "",
      jumlahAlat: 1,
      tanggalPinjam: "",
      tanggalKembali: "",
      keterangan: "",
      foto: null,
    });
  };

  const handlePeminjamanChange = (e) => {
    const { name, value } = e.target;

    if (name === "noWa") {
      const isNumeric = /^[0-9]*$/.test(value);
      if (!isNumeric && value !== "") {
        toast.error("Nomor telepon harus berupa angka.");
        return;
      }
    }

    setPeminjamanForm({
      ...peminjamanForm,
      [name]: name === "jumlahAlat" ? Number(value) : value,
    });
  };

  const handlePeminjamanFileChange = (e) => {
    const file = e.target.files[0];
    setPeminjamanForm({ ...peminjamanForm, foto: file });
  };

  const handlePeminjamanSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("nama", peminjamanForm.nama);
      formData.append("kelas", peminjamanForm.kelas);
      formData.append("nis", peminjamanForm.nis);
      formData.append("noWa", peminjamanForm.noWa);
      formData.append("namaAlat", peminjamanForm.namaAlat);
      formData.append("jumlahAlat", peminjamanForm.jumlahAlat);
      formData.append("tanggalPinjam", peminjamanForm.tanggalPinjam);
      formData.append("tanggalKembali", peminjamanForm.tanggalKembali);
      formData.append("keterangan", peminjamanForm.keterangan);
      if (peminjamanForm.foto) {
        formData.append("foto", peminjamanForm.foto);
      }

      const res = await fetch("http://localhost:8080/pinjam", {
        method: "POST",
        body: formData,
      });

      const result = await res.text();
      toast.success(result);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Auto scroll ke atas
      resetForm(); // Kosongkan form
    } catch (err) {
      toast.error("Gagal mengirim data peminjaman.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* NOTIFIKASI DI ATAS */}
      {/* Removed fixed-position success notification to avoid duplicate with toast */}
      {/* {success && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out flex items-center space-x-2 w-[90%] max-w-md">
          <svg
            className="w-6 h-6 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <span>✅ Data berhasil diterima dan sedang diproses</span>
        </div>
      )} */}

      {/* FORM PEMINJAMAN */}
      <div className="relative bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-xl p-10 max-w-3xl mx-auto mt-8">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-20 rounded-xl">
            <div className="loader"></div>
            <span className="ml-4 text-indigo-900 font-semibold">
              Please wait, your data is being processed...
            </span>
          </div>
        )}
        <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-900">
          Formulir Peminjaman Alat SMKN 7 SEMARANG
        </h1>
        <form onSubmit={handlePeminjamanSubmit} className="space-y-6">
          {[
            {
              label: "Nama",
              name: "nama",
              description: "Masukkan nama lengkap Anda.",
            },
            {
              label: "Kelas",
              name: "kelas",
              description: "Masukkan kelas Anda, misalnya: X-PPLG-1",
            },
            {
              label: "NIS",
              name: "nis",
              description: "Nomor Induk Siswa Anda.",
            },
            {
              label: "No. WhatsApp",
              name: "noWa",
              description: "Masukkan nomor WhatsApp yang aktif.",
            },
            {
              label: "Nama Alat",
              name: "namaAlat",
              description: "Sebutkan nama alat yang ingin dipinjam.",
            },
            {
              label: "Jumlah Alat",
              name: "jumlahAlat",
              type: "number",
              description: "Masukkan jumlah alat yang ingin dipinjam.",
            },
            {
              label: "Tanggal Pinjam",
              name: "tanggalPinjam",
              type: "date",
              description: "Pilih tanggal peminjaman.",
            },
            {
              label: "Tanggal Kembali",
              name: "tanggalKembali",
              type: "date",
              description: "Pilih tanggal pengembalian.",
            },
            {
              label: "Keterangan",
              name: "keterangan",
              description: "Berikan keterangan tambahan jika perlu.",
            },
          ].map(({ label, name, type = "text", description }) => (
            <div key={name}>
              <label className="block font-semibold mb-2 text-indigo-800">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={peminjamanForm[name]}
                onChange={handlePeminjamanChange}
                className="w-full border border-indigo-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                required={name !== "keterangan"}
              />
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
          ))}

          <div>
            <label className="block font-semibold mb-2 text-indigo-800">
              Foto Alat (upload file)
            </label>
            <div className="flex items-center space-x-4">
              <label
                htmlFor="foto-upload-peminjaman"
                className="cursor-pointer bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                {peminjamanForm.foto ? "Change File" : "Choose File"}
              </label>
              <span className="text-indigo-700">
                {peminjamanForm.foto
                  ? peminjamanForm.foto.name
                  : "No file chosen"}
              </span>
            </div>
            <input
              id="foto-upload-peminjaman"
              type="file"
              name="foto"
              accept="image/*"
              onChange={handlePeminjamanFileChange}
              className="hidden"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Kirim
          </button>
        </form>

        <style jsx>{`
          .loader {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #3498db;
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

          .animate-fade-in-out {
            animation: fadeIn 0.3s ease-out, fadeOut 0.5s ease-in 3.5s forwards;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translate(-50%, -20px);
            }
            to {
              opacity: 1;
              transform: translate(-50%, 0);
            }
          }

          @keyframes fadeOut {
            to {
              opacity: 0;
              transform: translate(-50%, -20px);
            }
          }
        `}</style>
      </div>
    </>
  );
}
