import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [activeForm, setActiveForm] = useState("peminjaman");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false); // State untuk loading

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

  const [pengembalianForm, setPengembalianForm] = useState({
    idPeminjaman: "",
    kondisiAlat: "",
    foto: null,
    keteranganPengembalian: "",
  });

  const [approvalForm, setApprovalForm] = useState({
    idPinjam: "",
    approver: "", // "Kepala Bengkel" or "Penanggung Jawab"
    statusPersetujuan: "", // "disetujui", "dipertimbangkan", "ditolak"
  });

  const handlePeminjamanChange = (e) => {
    const { name, value } = e.target;

    // Validate phone number to ensure it's numeric
    if (name === "noWa") {
      const isNumeric = /^[0-9]*$/.test(value); // Check if the input is numeric

      if (!isNumeric && value !== "") {
        toast.error("Nomor telepon harus berupa angka.");
        return; // Prevent updating state if the input is not numeric
      }
    }

    setPeminjamanForm({
      ...peminjamanForm,
      [name]: name === "jumlahAlat" ? Number(value) : value,
    });
  };

  const handleApprovalChange = (e) => {
    const { name, value } = e.target;
    setApprovalForm({
      ...approvalForm,
      [name]: value,
    });
  };

  const handleApprovalSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("idPinjam", approvalForm.idPinjam);
    formData.append("approver", approvalForm.approver);
    formData.append("statusPersetujuan", approvalForm.statusPersetujuan);

    // Show loading spinner briefly, then show success notification and hide loading
    setTimeout(() => {
      toast.success("✅ Permohonan persetujuan berhasil diproses");
      setLoading(false);
    }, 1000); // 1 second delay

    // Run the fetch call asynchronously in the background
    (async () => {
      try {
        const res = await fetch("https://backend-peminjam-production.up.railway.app/approval-request-new", {
          method: "POST",
          body: formData,
        });
        const result = await res.text();
        console.log("Background approval request result:", result);
      } catch (err) {
        console.error("Background approval request error:", err);
      }
    })();
  };

  const handlePengembalianChange = (e) => {
    const { name, value } = e.target;
    setPengembalianForm({
      ...pengembalianForm,
      [name]: value,
    });
  };

  const handlePeminjamanFileChange = (e) => {
    const file = e.target.files[0];
    setPeminjamanForm({ ...peminjamanForm, foto: file });
  };

  const handlePengembalianFileChange = (e) => {
    const file = e.target.files[0];
    setPengembalianForm({ ...pengembalianForm, foto: file });
  };

  const handlePeminjamanSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading ke true
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

      const res = await fetch("https://backend-peminjam-production.up.railway.app/pinjam", {
        method: "POST",
        body: formData,
      });

      const result = await res.text();
      toast.success(result); // Notifikasi sukses
      setLoading(false); // Set loading ke false segera setelah respons diterima
    } catch (err) {
      toast.error("Gagal mengirim data peminjaman."); // Notifikasi error
      console.error(err);
      setLoading(false); // Pastikan loading dimatikan juga saat error
    }
  };

  const handlePengembalianSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading ke true
    try {
      const formData = new FormData();
      formData.append("idPeminjam", pengembalianForm.idPeminjaman);
      formData.append("kondisiAlat", pengembalianForm.kondisiAlat);
      formData.append("keteranganPengembalian", pengembalianForm.keteranganPengembalian);
      if (pengembalianForm.foto) {
        formData.append("foto", pengembalianForm.foto);
      }

      const res = await fetch("https://backend-peminjam-production.up.railway.app/pengembalian", {
        method: "POST",
        body: formData,
      });
      const result = await res.text();
      // Show loading spinner briefly before showing success notification
      setTimeout(() => {
        toast.success(result); // Notifikasi sukses
        setLoading(false); // Set loading ke false setelah delay
      }, 1000); // 1 second delay
    } catch (err) {
      toast.error("Gagal mengirim data pengembalian."); // Notifikasi error
      console.error(err);
      setLoading(false); // Ensure loading is turned off on error
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-white to-indigo-100 flex">
      <aside
        className={`w-16 bg-indigo-700 text-white flex flex-col items-center py-6 relative`}
      >
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="w-10 h-10 rounded-md bg-indigo-900 flex flex-col justify-center space-y-1.5 p-2"
        >
          <span className="block w-full h-0.5 bg-white"></span>
          <span className="block w-full h-0.5 bg-white"></span>
          <span className="block w-full h-0.5 bg-white"></span>
        </button>
        {menuOpen && (
          <div className="absolute top-16 left-0 w-40 bg-white text-indigo-900 rounded-md shadow-lg z-10">
            <button
              className={`block w-full text-left px-4 py-2 hover:bg-indigo-100 ${
                activeForm === "peminjaman" ? "font-bold" : ""
              }`}
              onClick={() => {
                setActiveForm("peminjaman");
                setMenuOpen(false);
              }}
            >
              Peminjaman
            </button>
            <button
              className={`block w-full text-left px-4 py-2 hover:bg-indigo-100 ${
                activeForm === "pengembalian" ? "font-bold" : ""
              }`}
              onClick={() => {
                setActiveForm("pengembalian");
                setMenuOpen(false);
              }}
            >
              Pengembalian
            </button>
            <button
              className={`block w-full text-left px-4 py-2 hover:bg-indigo-100 ${
                activeForm === "approval" ? "font-bold" : ""
              }`}
              onClick={() => {
                setActiveForm("approval");
                setMenuOpen(false);
              }}
            >
              Approval
            </button>
          </div>
        )}
      </aside>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative">
        <div
          className={`max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-10`}
        >
          <section className="col-span-1 flex flex-col justify-start px-6 h-full bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-xl p-6">
            <h2 className="text-4xl font-extrabold text-indigo-900 mb-4">
              Selamat Datang di Formulir Peminjaman Alat
            </h2>
            <p className="text-indigo-800 text-lg leading-relaxed">
              Silakan isi formulir di sebelah kanan untuk meminjam alat yang
              Anda butuhkan. Pastikan data yang Anda masukkan sudah benar dan
              lengkap.
            </p>
            <p className="mt-6 text-indigo-700 italic">
              "Memudahkan peminjaman alat dengan cepat dan terpercaya."
            </p>
            <div className="mt-auto pt-6 border-t border-indigo-200">
              <h3 className="text-indigo-900 font-semibold mb-2">
                Informasi Tambahan
              </h3>
              <ul className="list-disc list-inside text-indigo-700 space-y-1">
                <li>Proses peminjaman cepat dan mudah</li>
                <li>Alat tersedia dalam kondisi baik</li>
                <li>Dukungan teknis siap membantu</li>
              </ul>
            </div>
          </section>
          <section className="col-span-2 bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-xl p-10">
            {activeForm === "peminjaman" && (
              <>
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
                      description: "Masukkan kelas Anda, misalnya: 10A.",
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
                      <p className="text-sm text-gray-500 mt-1">
                        {description}
                      </p>
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
              </>
            )}
            {activeForm === "pengembalian" && (
              <>
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
                      <p className="text-sm text-gray-500 mt-1">
                        {description}
                      </p>
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
              </>
            )}
            {activeForm === "approval" && (
              <>
                <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-900">
                  Formulir Approval Peminjaman Alat
                </h1>
                <form onSubmit={handleApprovalSubmit} className="space-y-6">
                  <div>
                    <label className="block font-semibold mb-2 text-indigo-800">
                      ID Pinjam
                    </label>
                    <input
                      type="text"
                      name="idPinjam"
                      value={approvalForm.idPinjam}
                      onChange={handleApprovalChange}
                      className="w-full border border-indigo-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2 text-indigo-800">
                      Pilih Approver
                    </label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="approver"
                          value="Kepala Bengkel"
                          checked={approvalForm.approver === "Kepala Bengkel"}
                          onChange={handleApprovalChange}
                          className="form-radio"
                          required
                        />
                        <span className="ml-2">Kepala Bengkel</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="approver"
                          value="Penanggung Jawab"
                          checked={approvalForm.approver === "Penanggung Jawab"}
                          onChange={handleApprovalChange}
                          className="form-radio"
                          required
                        />
                        <span className="ml-2">Penanggung Jawab</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold mb-2 text-indigo-800">
                      Status Persetujuan
                    </label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="statusPersetujuan"
                          value="disetujui"
                          checked={
                            approvalForm.statusPersetujuan === "disetujui"
                          }
                          onChange={handleApprovalChange}
                          className="form-radio"
                          required
                        />
                        <span className="ml-2">Disetujui</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="statusPersetujuan"
                          value="dipertimbangkan"
                          checked={
                            approvalForm.statusPersetujuan === "dipertimbangkan"
                          }
                          onChange={handleApprovalChange}
                          className="form-radio"
                          required
                        />
                        <span className="ml-2">Dipertimbangkan</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="statusPersetujuan"
                          value="ditolak"
                          checked={approvalForm.statusPersetujuan === "ditolak"}
                          onChange={handleApprovalChange}
                          className="form-radio"
                          required
                        />
                        <span className="ml-2">Ditolak</span>
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Kirim Approval
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-20">
            <div className="loader"></div>
            <span className="ml-4 text-indigo-900 font-semibold">
              Please wait, do not close the application, data is being forwarded
              to the responsible party.
            </span>
          </div>
        )}
      </main>
      <ToastContainer /> {/* Menambahkan ToastContainer untuk notifikasi */}
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
