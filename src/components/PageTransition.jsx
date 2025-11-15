// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { transitionVariants, pageTransition } from "../config/transitionConfig";

export default function PageTransition({ children }) {
  const location = useLocation();

  // Tentukan tipe transisi berdasarkan route
  const getTransitionType = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    if (path === "/form-peminjaman") return "formPeminjaman";
    if (path === "/form-approval") return "formApproval";
    if (path === "/form-pengembalian") return "formPengembalian";
    if (path === "/riwayat") return "riwayat";
    return "home";
  };

  const transitionType = getTransitionType();
  const variants = transitionVariants[transitionType];

  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      transition={pageTransition}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
