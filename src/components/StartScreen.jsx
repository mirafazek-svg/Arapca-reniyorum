import React from 'react';
import { motion } from 'framer-motion';
import { Map, Sun, Trees, Building2 } from 'lucide-react';

const StartScreen = ({ onStart }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-gradient-to-b from-sky-300 to-orange-100 overflow-hidden">
      {/* Background Elements */}
      <Sun className="absolute top-12 right-12 text-yellow-400 w-32 h-32 opacity-80" />
      <div className="absolute bottom-0 w-full h-48 bg-yellow-600/20 rounded-t-[100%] scale-150 transform translate-y-12"></div>
      
      {/* Decorative City Silhouettes */}
      <div className="absolute bottom-10 flex w-full justify-between px-10 text-orange-900/20">
        <Trees className="w-48 h-48" />
        <Building2 className="w-64 h-64 mb-10" />
        <Trees className="w-40 h-40 mt-10" />
      </div>

      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
        className="z-10 text-center flex flex-col items-center gap-8"
      >
        <div className="card-container text-center max-w-2xl mx-4">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="mb-6 flex justify-center"
          >
            <Map className="w-20 h-20 text-orange-500" />
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500 mb-6 drop-shadow-sm leading-tight">
            Arapça Şehre<br/>Hoş Geldin!
          </h1>
          
          <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6 mb-8 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-orange-200 rotate-45"></div>
            <p className="text-xl text-orange-800 font-bold">
              Kayboldun! Eve dönmek için Arapça konuşman gerekiyor.
            </p>
          </div>

          <button 
            onClick={onStart}
            className="btn-primary w-64 h-16 text-2xl animate-bounce"
          >
            BAŞLA
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default StartScreen;
