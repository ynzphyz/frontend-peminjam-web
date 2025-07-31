import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-white to-indigo-100 flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-4xl bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-xl p-10">
        <h1 className="text-5xl font-extrabold text-indigo-900 mb-6">
          Selamat Datang di Formulir Peminjaman Alat
        </h1>
        <p className="text-indigo-800 text-lg leading-relaxed mb-6">
          Silakan isi formulir di sebelah kanan untuk meminjam alat yang Anda
          butuhkan. Pastikan data yang Anda masukkan sudah benar dan lengkap.
        </p>
        <p className="italic text-indigo-700 text-xl mb-8">
          "Memudahkan peminjaman alat dengan cepat dan terpercaya."
        </p>
        <div>
          <h2 className="text-indigo-900 font-semibold mb-4 text-2xl">
            Informasi Tambahan
          </h2>
          <ul className="list-disc list-inside text-indigo-700 space-y-2 text-lg">
            <li>Proses peminjaman cepat dan mudah</li>
            <li>Alat tersedia dalam kondisi baik</li>
            <li>Dukungan teknis siap membantu</li>
          </ul>
        </div>
        <div className="mt-10 text-indigo-800 text-lg">
          <p>
            Kami berkomitmen untuk memberikan layanan peminjaman alat yang
            efisien dan terpercaya. Dengan sistem kami, Anda dapat meminjam
            alat dengan mudah tanpa harus khawatir tentang proses yang rumit.
          </p>
          <p className="mt-4">
            Jika Anda membutuhkan bantuan atau informasi lebih lanjut, jangan
            ragu untuk menghubungi tim dukungan teknis kami yang siap membantu
            kapan saja.
          </p>
        </div>
      </div>
    </div>
  );
}
