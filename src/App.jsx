import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import CharacterSelection from './components/CharacterSelection';
import MapScreen from './components/MapScreen';
import SchoolLevel from './components/SchoolLevel';
import { Star } from 'lucide-react';

function App() {
  const [gameState, setGameState] = useState('START'); // START, CHAR_SELECT, MAP, LEVEL_SCHOOL
  const [score, setScore] = useState(0);
  const [character, setCharacter] = useState(null); // 'boy' or 'girl'
  const [unlockedBuildings, setUnlockedBuildings] = useState(['school']);

  const handleStart = () => setGameState('CHAR_SELECT');
  
  const handleCharacterSelect = (char) => {
    setCharacter(char);
    setGameState('MAP');
  };

  const handleSelectBuilding = (building) => {
    if (building === 'school') {
      setGameState('LEVEL_SCHOOL');
    }
  };

  const handleLevelComplete = (newUnlocks) => {
    setUnlockedBuildings(prev => {
      const updated = [...prev];
      newUnlocks.forEach(u => {
        if (!updated.includes(u)) updated.push(u);
      });
      return updated;
    });
    setGameState('MAP');
  };

  const addScore = (points) => {
    setScore(prev => prev + points);
  };

  return (
    <div className="w-full h-screen bg-blue-50 relative overflow-hidden font-['Nunito']">
      {/* Score Display (Persistent) */}
      {gameState !== 'START' && (
        <div className="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur rounded-2xl px-6 py-3 shadow-lg border-2 border-yellow-400 flex items-center gap-3 transform transition-all hover:scale-105">
          <div className="bg-yellow-400 p-2 rounded-full">
            <Star className="text-white w-6 h-6 fill-current" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Puan</div>
            <div className="text-2xl font-black text-slate-800 leading-none">{score}</div>
          </div>
        </div>
      )}

      {/* Screen Router */}
      {gameState === 'START' && <StartScreen onStart={handleStart} />}
      {gameState === 'CHAR_SELECT' && <CharacterSelection onSelect={handleCharacterSelect} />}
      {gameState === 'MAP' && (
        <MapScreen 
          unlockedBuildings={unlockedBuildings} 
          onSelectBuilding={handleSelectBuilding}
          character={character}
        />
      )}
      {gameState === 'LEVEL_SCHOOL' && (
        <SchoolLevel 
          onComplete={() => handleLevelComplete(['market'])} 
          addScore={addScore}
          character={character}
        />
      )}
    </div>
  );
}

export default App;
