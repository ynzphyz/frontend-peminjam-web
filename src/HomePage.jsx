import React from "react";

export default function HomePage({ onNavigate }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-4xl bg-white rounded-xl shadow-xl p-10">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-6">
          Selamat Datang di Sistem Peminjaman Alat SMKN 7 <span role="img" aria-label="clapping">👏</span>
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-6">
          Sistem ini dirancang untuk memudahkan proses peminjaman alat praktik secara digital. Data Anda langsung tercatat otomatis dan bisa dipantau oleh admin.
        </p>
        <p className="italic text-indigo-500 text-base mb-8">
          "Memudahkan praktik dengan alat yang cepat, aman, dan terpercaya."
        </p>
        <div>
          <h2 className="font-semibold mb-4 text-lg text-gray-900">
            Kenapa menggunakan sistem ini?
          </h2>
          <ul className="list-none space-y-3 text-indigo-600 text-base">
            <li className="flex items-center">
              <span className="inline-block bg-green-400 rounded mr-3 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              Proses peminjaman cepat dan mudah
            </li>
            <li className="flex items-center">
              <span className="inline-block bg-green-400 rounded mr-3 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              Alat terdata dan dalam kondisi baik
            </li>
            <li className="flex items-center">
              <span className="inline-block bg-green-400 rounded mr-3 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              Sistem otomatis langsung ke spreadsheet
            </li>
          </ul>
        </div>
        <div className="flex space-x-4 mt-8">
          <button
            onClick={() => onNavigate("peminjaman")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold"
          >
            + Mulai Pinjam Sekarang
          </button>
          <button
            onClick={() => onNavigate("riwayat")}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300 font-semibold"
          >
            Riwayat
          </button>
        </div>
      </div>
    </div>
  );
}
