import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, activeSection, setActiveSection, menuOpen, toggleMenu, closeMenu }) => {
  const layoutVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const backgroundVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-accent-50 flex flex-col relative overflow-hidden"
      variants={layoutVariants}
      initial="initial"
      animate="animate"
    >
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Large primary blob */}
        <motion.div 
          className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-primary-300/40 to-secondary-300/30 rounded-full blur-2xl"
          variants={backgroundVariants}
          animate={{ 
            y: [-20, 20, -20],
            x: [-10, 15, -10],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Large secondary blob */}
        <motion.div 
          className="absolute top-0 right-4 w-80 h-80 bg-gradient-to-br from-secondary-300/40 to-accent-300/30 rounded-full blur-2xl"
          variants={backgroundVariants}
          animate={{ 
            y: [15, -25, 15],
            x: [10, -15, 10],
            rotate: [360, 180, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Large accent blob */}
        <motion.div 
          className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-br from-accent-300/35 to-primary-300/25 rounded-full blur-2xl"
          variants={backgroundVariants}
          animate={{ 
            y: [25, -15, 25],
            x: [-5, 20, -5],
            rotate: [0, 360, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Medium floating elements */}
        <motion.div 
          className="absolute top-1/3 right-1/3 w-40 h-40 bg-secondary-400/25 rounded-full blur-xl"
          animate={{ 
            y: [-10, 15, -10],
            x: [-8, 12, -8],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-primary-400/20 rounded-full blur-lg"
          animate={{ 
            y: [12, -18, 12],
            rotate: [0, 270, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Glass overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-slate-100/10 pointer-events-none z-[1]"></div>

      <Navbar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        closeMenu={closeMenu}
      />
      
      <motion.main 
        className="flex-1 flex flex-col items-center justify-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="w-full mx-auto">
          {children}
        </div>
      </motion.main>

      <Footer />
      
      <ToastContainer 
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="!z-50"
        toastClassName="glass-effect !bg-white/95 !text-slate-800 !rounded-xl !shadow-xl !backdrop-blur-md"
        progressClassName="!bg-gradient-to-r !from-primary-500 !to-secondary-500"
      />
    </motion.div>
  );
};

export default Layout;
