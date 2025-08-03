import React, { useState, useEffect } from "react";

const statusOptions = ["Semua", "Disetujui", "Dipinjam", "Dikembalikan", "Menunggu Persetujuan", "Ditolak"];

export default function Riwayat() {
  const [historyData, setHistoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/history");
        if (!response.ok) {
          throw new Error("Gagal mengambil data riwayat");
        }
        const data = await response.json();
        setHistoryData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setHistoryData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryData();
  }, []);

  useEffect(() => {
    const filtered = historyData.filter((item) => {
      const matchName = item.name.toLowerCase().includes(filterName.toLowerCase());
      const matchDate = filterDate ? item.date === filterDate : true;
      const matchStatus = filterStatus === "Semua" ? true : (filterStatus === "Disetujui" ? item.status === "Dipinjam" : item.status === filterStatus);
      return matchName && matchDate && matchStatus;
    });
    setFilteredData(filtered);
  }, [historyData, filterName, filterDate, filterStatus]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 w-full max-w-6xl">
        <div className="text-xl font-semibold text-indigo-700">Memuat data riwayat...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 w-full max-w-6xl">
        <div className="text-xl font-semibold text-red-600">Error: {error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 py-12 w-full max-w-6xl">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Riwayat Peminjaman & Pengembalian</h1>
      <div className="flex flex-wrap gap-4 mb-6 w-full">
        <input
          type="text"
          placeholder="Filter berdasarkan nama"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-grow min-w-[200px]"
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-indigo-100">
            <th className="border border-gray-300 px-4 py-2">No</th>
            <th className="border border-gray-300 px-4 py-2">Nama</th>
            <th className="border border-gray-300 px-4 py-2">Tanggal</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Jenis</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                Tidak ada data
              </td>
            </tr>
          ) : (
            filteredData.map((item, index) => (
              <tr key={`${item.id}-${index}`} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-300 px-4 py-2 text-center">{item.id}</td>
                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{item.date}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    item.status === "Dipinjam" ? "bg-green-200 text-green-900" :
                    item.status === "Dikembalikan" ? "bg-blue-100 text-blue-800" :
                    item.status === "Menunggu Persetujuan" ? "bg-yellow-100 text-yellow-800" :
                    item.status === "Ditolak" ? "bg-red-100 text-red-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {item.status === "Dipinjam" ? "Disetujui" : item.status}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">{item.type}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
