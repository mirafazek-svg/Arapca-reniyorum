import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle, UserSquare } from 'lucide-react';

const CharacterSelection = ({ onSelect }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-blue-100 pattern-dots">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center w-full max-w-3xl"
      >
        <h2 className="text-4xl font-black text-blue-800 mb-12 drop-shadow-sm">
          Karakterini Seç
        </h2>
        
        <div className="flex flex-col md:flex-row justify-center gap-8 px-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect('girl')}
            className="card-container cursor-pointer flex flex-col items-center gap-6 flex-1 bg-pink-50 border-pink-200 hover:border-pink-400"
          >
            <div className="bg-pink-200 p-6 rounded-full">
              <UserCircle className="w-32 h-32 text-pink-600" />
            </div>
            <h3 className="text-3xl font-bold text-pink-700">Kız</h3>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect('boy')}
            className="card-container cursor-pointer flex flex-col items-center gap-6 flex-1 bg-cyan-50 border-cyan-200 hover:border-cyan-400"
          >
            <div className="bg-cyan-200 p-6 rounded-full">
              <UserSquare className="w-32 h-32 text-cyan-600" />
            </div>
            <h3 className="text-3xl font-bold text-cyan-700">Erkek</h3>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CharacterSelection;
