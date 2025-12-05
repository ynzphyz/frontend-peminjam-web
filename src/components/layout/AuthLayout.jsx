import React from "react";
import Navbar from "./Navbar";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0a183d] via-[#0f1b35] to-[#1a2a4a]">
      <Navbar />
      <div className="flex-1 flex items-center justify-center pt-20">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
