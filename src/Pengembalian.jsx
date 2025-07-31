import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Pengembalian() {
  const [pengembalianForm, setPengembalianForm] = useState({
    idPeminjaman: "",
    kondisiAlat: "",
    foto: null,
    keteranganPengembalian: "",
  });

  const [loading, setLoading] = useState(false);

  const handlePengembalianChange = (e) => {
    const { name, value } = e.target;
    setPengembalianForm({
      ...pengembalianForm,
      [name]: value,
    });
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
        Formulir Pengembalian Alat
      </h1>
      <form onSubmit={handlePengembalianSubmit} className="space-y-6">
        {[
          {
            label: "ID Peminjaman",
            name: "idPeminjaman",
            description: "Masukkan ID peminjaman.",
          },
          {
            label: "Kondisi Alat",
            name: "kondisiAlat",
            description: "Masukkan kondisi alat saat dikembalikan.",
          },
          {
            label: "Keterangan Pengembalian",
            name: "keteranganPengembalian",
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
              value={pengembalianForm[name]}
              onChange={handlePengembalianChange}
              className="w-full border border-indigo-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required={name !== "keteranganPengembalian"}
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
      `}</style>
    </div>
  );
}
