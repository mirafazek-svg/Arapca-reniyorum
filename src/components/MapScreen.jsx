import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2, School, Store, Hospital, Home } from 'lucide-react';

const MapScreen = ({ unlockedBuildings, onSelectBuilding, character }) => {
  const buildings = [
    { id: 'school', name: 'OKUL', icon: School, color: 'bg-yellow-400' },
    { id: 'market', name: 'MARKET', icon: Store, color: 'bg-green-400' },
    { id: 'hospital', name: 'HASTANE', icon: Hospital, color: 'bg-red-400' },
    { id: 'home', name: 'EV', icon: Home, color: 'bg-purple-400' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center p-8 bg-green-100 pattern-dots relative">
      <motion.h2 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl md:text-5xl font-black text-green-800 mt-10 mb-12 bg-white px-8 py-4 rounded-3xl shadow-md border-4 border-white/50 z-10"
      >
        Nereye gitmek istersin?
      </motion.h2>

      {/* Map Layout */}
      <div className="w-full max-w-4xl flex-1 relative flex items-center justify-center">
        {/* Simple "Roads" background */}
        <div className="absolute w-full h-24 bg-slate-300 rounded-full top-1/2 transform -translate-y-1/2 opacity-50"></div>
        <div className="absolute w-24 h-full bg-slate-300 rounded-full left-1/2 transform -translate-x-1/2 opacity-50"></div>

        <div className="grid grid-cols-2 gap-8 md:gap-24 w-full relative z-10">
          {buildings.map((b) => {
            const isUnlocked = unlockedBuildings.includes(b.id);
            const Icon = b.icon;
            
            return (
              <motion.div
                key={b.id}
                whileHover={isUnlocked ? { scale: 1.05 } : {}}
                whileTap={isUnlocked ? { scale: 0.95 } : {}}
                onClick={() => isUnlocked && onSelectBuilding(b.id)}
                className={`relative flex flex-col items-center justify-center p-6 rounded-3xl shadow-xl transition-all ${
                  isUnlocked 
                    ? `${b.color} cursor-pointer hover:shadow-2xl` 
                    : 'bg-slate-200 cursor-not-allowed opacity-80 grayscale-[50%]'
                }`}
              >
                {/* Status Badge */}
                <div className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg">
                  {isUnlocked ? (
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  ) : (
                    <Lock className="w-8 h-8 text-slate-400" />
                  )}
                </div>

                <div className="bg-white/30 p-6 rounded-2xl mb-4">
                  <Icon className={`w-20 h-20 ${isUnlocked ? 'text-white' : 'text-slate-500'}`} />
                </div>
                
                <h3 className={`text-2xl font-black uppercase tracking-wide ${isUnlocked ? 'text-white' : 'text-slate-500'}`}>
                  {b.name}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MapScreen;
