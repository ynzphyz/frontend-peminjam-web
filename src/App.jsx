import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";
import PageTransition from "./components/PageTransition";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Import Layout
import Layout from "./components/layout/Layout";
import AuthLayout from "./components/layout/AuthLayout";

// Import Pages
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import CompleteProfile from "./components/pages/CompleteProfile";
import AdminDashboard from "./components/pages/AdminDashboard";
import HomePage from "./components/pages/HomePage";
import Peminjaman from "./components/pages/Peminjaman";
import Approval from "./components/pages/Approval";
import Pengembalian from "./components/pages/Pengembalian";
import Riwayat from "./components/pages/Riwayat";
import UserProfile from "./components/pages/UserProfile";

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

  // Error boundary fallback
  React.useEffect(() => {
    const handleError = (event) => {
      console.error("Global error caught:", event.error);
    };
    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  return (
    <>
      <GoogleOAuthProvider clientId={googleClientId}>
        <AuthProvider>
          <Router>
            <AnimatePresence mode="wait">
              <Routes>
                {/* Public Routes */}
                <Route
                  path="/login"
                  element={
                    <AuthLayout>
                      <Login />
                    </AuthLayout>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <AuthLayout>
                      <Register />
                    </AuthLayout>
                  }
                />
                <Route
                  path="/"
                  element={
                    <PageTransition>
                      <Layout />
                    </PageTransition>
                  }
                >
                  <Route index element={<HomePage />} />
                </Route>
                
                {/* Complete Profile Route (after Google OAuth) */}
                <Route
                  path="/complete-profile"
                  element={
                    <ProtectedRoute>
                      <PageTransition>
                        <CompleteProfile />
                      </PageTransition>
                    </ProtectedRoute>
                  }
                />
                
                {/* Admin Routes without Layout (standalone design) */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <PageTransition>
                        <AdminDashboard />
                      </PageTransition>
                    </ProtectedRoute>
                  }
                />

                {/* Protected Routes with Layout */}
                <Route
                  element={
                    <ProtectedRoute>
                      <Layout />
                    </ProtectedRoute>
                  }
                >
                  <Route
                    path="/dashboard"
                    element={
                      <PageTransition>
                        <HomePage />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <PageTransition>
                        <UserProfile />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/form-peminjaman"
                    element={
                      <PageTransition>
                        <Peminjaman />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/form-approval"
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <PageTransition>
                          <Approval />
                        </PageTransition>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/form-pengembalian"
                    element={
                      <PageTransition>
                        <Pengembalian />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/riwayat"
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <PageTransition>
                          <Riwayat />
                        </PageTransition>
                      </ProtectedRoute>
                    }
                  />
                </Route>

                {/* Catch all - redirect to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </Router>

          {/* ToastContainer */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            limit={1}
            className="toast-container"
            toastClassName="toast-custom"
            bodyClassName="toast-body-custom"
          />
        </AuthProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
