import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageTransition from "./components/PageTransition";

// Import Layout
import Layout from "./components/layout/Layout";

// Import Pages
import HomePage from "./components/pages/HomePage";
import Peminjaman from "./components/pages/Peminjaman";
import Approval from "./components/pages/Approval";
import Pengembalian from "./components/pages/Pengembalian";
import Riwayat from "./components/pages/Riwayat";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <HomePage />
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
                  <PageTransition>
                    <Approval />
                  </PageTransition>
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
                  <PageTransition>
                    <Riwayat />
                  </PageTransition>
                }
              />
            </Routes>
          </AnimatePresence>
        </Layout>
      </Router>

      {/* ToastContainer HARUS di luar Router dan Layout */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ zIndex: 9999 }}
      />
    </>
  );
}

export default App;
