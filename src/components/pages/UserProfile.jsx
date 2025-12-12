import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, GraduationCap, IdCard, Calendar, Save } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const UserProfile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    nis: "",
    name: "",
    phone: "",
    kelas: "",
  });

  // Initialize userData with current user data
  useEffect(() => {
    if (user && !userData) {
      setUserData(user);
      setFormData({
        nis: user.nis || "",
        name: user.name || "",
        phone: user.phone || "",
        kelas: user.kelas || "",
      });
    }
  }, [user, userData]);

  // Fetch fresh user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) {
        return;
      }
      
      setRefreshing(true);
      
      try {
        const token = user.token || JSON.parse(sessionStorage.getItem("user") || "{}")?.token;
        console.log("Fetching user data for ID:", user.id);
        
        const response = await axios.get(
          `${API_BASE_URL}/users/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        console.log("API Response:", response.data);
        
        if (response.data.success) {
          const freshUserData = response.data.data;
          console.log("Fresh user data from API:", freshUserData);
          
          setUserData(freshUserData);
          
          // Update form data
          setFormData({
            nis: freshUserData.nis || "",
            name: freshUserData.name || "",
            phone: freshUserData.phone || "",
            kelas: freshUserData.kelas || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        console.error("Error response:", error.response?.data);
      } finally {
        setRefreshing(false);
      }
    };

    if (user?.id) {
      fetchUserData();
    }
  }, [user?.id]); // Run when user.id is available

  // Show loading if user data not available yet
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0f1e] via-[#0f1729] to-[#1a1f35] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const displayUser = userData || user;

  console.log("Current user object:", displayUser);
  console.log("FormData:", formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const token = JSON.parse(sessionStorage.getItem("user") || "{}")?.token;
      
      // Only send editable fields (exclude nis)
      const updateData = {
        name: formData.name,
        phone: formData.phone,
        kelas: formData.kelas,
      };
      
      const response = await axios.put(
        `${API_BASE_URL}/users/${user.id}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.data.success) {
        // Fetch fresh data dari server
        const freshDataResponse = await axios.get(
          `${API_BASE_URL}/users/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        if (freshDataResponse.data.success) {
          const freshUserData = freshDataResponse.data.data;
          const updatedUser = {
            ...user,
            ...freshUserData,
          };
          updateUser(updatedUser);
          setUserData(freshUserData);
          setFormData({
            nis: freshUserData.nis || "",
            name: freshUserData.name || "",
            phone: freshUserData.phone || "",
            kelas: freshUserData.kelas || "",
          });
          setMessage({ type: "success", text: "Profile berhasil diperbarui!" });
          setIsEditing(false);
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Gagal memperbarui profile",
      });
    } finally {
      setLoading(false);
    }
  };

  const profileFields = [
    {
      icon: IdCard,
      label: "NIS",
      value: isEditing ? formData.nis : (displayUser?.nis || "-"),
      name: "nis",
      color: "from-blue-400 to-blue-600",
      editable: false,
    },
    {
      icon: User,
      label: "Nama Lengkap",
      value: isEditing ? formData.name : (displayUser?.name || "-"),
      name: "name",
      color: "from-purple-400 to-purple-600",
      editable: true,
    },
    {
      icon: Mail,
      label: "Email",
      value: displayUser?.email || "-",
      color: "from-cyan-400 to-cyan-600",
      editable: false,
    },
    {
      icon: GraduationCap,
      label: "Kelas",
      value: isEditing ? formData.kelas : (displayUser?.kelas || "-"),
      name: "kelas",
      color: "from-green-400 to-green-600",
      editable: true,
    },
    {
      icon: Phone,
      label: "Nomor WhatsApp",
      value: isEditing ? formData.phone : (displayUser?.phone || "-"),
      name: "phone",
      color: "from-orange-400 to-orange-600",
      editable: true,
    },
    {
      icon: Calendar,
      label: "Bergabung Sejak",
      value: displayUser?.created_at
        ? new Date(displayUser.created_at).toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "-",
      color: "from-pink-400 to-pink-600",
      editable: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1e] via-[#0f1729] to-[#1a1f35] pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Profile Saya
          </h1>
          <p className="text-gray-400">Kelola informasi profile Anda</p>
        </motion.div>

        {/* Message Alert */}
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 px-6 py-4 rounded-xl border ${
              message.type === "success"
                ? "bg-green-600/20 border-green-500/30 text-green-300"
                : "bg-red-600/20 border-red-500/30 text-red-300"
            }`}
          >
            {message.text}
          </motion.div>
        )}

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#0f1f3d] to-[#0a1530] border border-blue-500/30 rounded-2xl shadow-2xl shadow-blue-900/30 overflow-hidden"
        >
          {/* Avatar Section */}
          <div className="relative bg-gradient-to-r from-blue-600/30 to-cyan-600/20 px-8 py-10 border-b border-blue-500/20">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold text-4xl shadow-2xl shadow-blue-500/50 ring-4 ring-blue-500/30"
              >
                {displayUser?.name?.charAt(0).toUpperCase() || "U"}
              </motion.div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-white mb-1">
                  {displayUser?.name || "User"}
                </h2>
                <p className="text-gray-400 text-sm mb-3">{displayUser?.email}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/30 border border-blue-500/30 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-300 capitalize">
                    {displayUser?.role || "user"}
                  </span>
                </div>
              </div>

              {/* Edit Button */}
              <motion.button
                onClick={() => setIsEditing(!isEditing)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                  isEditing
                    ? "bg-gray-600/30 text-gray-300 hover:bg-gray-600/40"
                    : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700"
                }`}
              >
                {isEditing ? "Batal" : "Edit Profile"}
              </motion.button>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profileFields.map((field, index) => {
                const Icon = field.icon;
                const isFieldEditable = isEditing && field.editable;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative group"
                  >
                    <div
                      className={`p-6 rounded-xl border transition-all ${
                        isFieldEditable
                          ? "bg-blue-600/10 border-blue-500/40"
                          : "bg-gradient-to-br from-blue-600/10 to-cyan-600/5 border-blue-500/20"
                      }`}
                    >
                      {/* Icon & Label */}
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${field.color} flex items-center justify-center shadow-lg`}
                        >
                          <Icon size={20} className="text-white" />
                        </div>
                        <label className="text-sm font-semibold text-gray-400">
                          {field.label}
                        </label>
                      </div>

                      {/* Value/Input */}
                      {isFieldEditable ? (
                        <input
                          type="text"
                          name={field.name}
                          value={field.value}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-blue-900/30 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                          placeholder={`Masukkan ${field.label.toLowerCase()}`}
                        />
                      ) : (
                        <p className="text-base font-semibold text-white truncate">
                          {field.value || "-"}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Save Button */}
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex justify-end"
              >
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-green-600/30"
                >
                  <Save size={18} />
                  {loading ? "Menyimpan..." : "Simpan Perubahan"}
                </motion.button>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
