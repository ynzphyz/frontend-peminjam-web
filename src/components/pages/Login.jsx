import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { Mail, Lock, ArrowRight } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setError("");

      const idToken = credentialResponse.credential;

      // Send token to backend with correct payload
      const response = await axios.post(
        "http://localhost:8080/auth/google",
        { id_token: idToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Backend response:", response);
      
      // Backend returns: { success, message, data: { token, user } }
      const responseData = response.data?.data || response.data;
      const { token, user } = responseData;
      const { email, name, role } = user || {};
      
      console.log("Parsed user:", { email, name, role, token });

      // Save user to context with token
      login({ email, name, role, token });

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error ||
                          "Login gagal. Silakan coba lagi.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Gagal melakukan login dengan Google");
  };

  const handleManualLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        "http://localhost:8080/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Backend returns: { success, message, data: { token, user } }
      const responseData = response.data?.data || response.data;
      const { token, user } = responseData;
      const { email: eResp, name, role } = user || {};
      login({ email: eResp, name, role, token });

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Manual login error:", err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error ||
                          "Login gagal. Periksa email dan password Anda.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-4">
      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-[#0f2855]/95 to-[#051530]/95 backdrop-blur-xl rounded-2xl border border-blue-500/30 p-8 shadow-2xl shadow-blue-900/50"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
            Login
          </h1>
          <p className="text-sm text-gray-400">
            Akses akun Anda di Sistem Manajemen Peminjaman
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg"
          >
            <p className="text-red-300 text-sm font-medium">{error}</p>
          </motion.div>
        )}

        {/* Google Login Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              text="signin_with"
              theme="dark"
              size="large"
            />
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-blue-500/20 to-transparent" />
          <span className="text-xs text-gray-500 font-semibold">ATAU</span>
          <div className="flex-1 h-px bg-gradient-to-l from-blue-500/20 to-transparent" />
        </motion.div>

        {/* Manual Login Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          onSubmit={handleManualLogin}
          className="space-y-3"
        >
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-2.5 text-blue-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-4 py-2 text-sm bg-blue-900/20 border border-blue-500/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition disabled:opacity-50"
                disabled={loading}
              />
            </div>
          </div>
          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-2.5 text-blue-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full pl-9 pr-4 py-2 text-sm bg-blue-900/20 border border-blue-500/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition disabled:opacity-50"
                disabled={loading}
              />
            </div>
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg transition-all flex items-center justify-center gap-2"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? "Masuk..." : "Login"}
            {!loading && <ArrowRight size={16} />}
          </motion.button>
        </motion.form>

        {/* Manual email/password login disabled */}
      </motion.div>
    </div>
  );
};

export default Login;
