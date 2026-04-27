import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Star, Check, X, ArrowRight, Map, BookOpen, School, UserCircle2 } from 'lucide-react';

const SchoolLevel = ({ onComplete, addScore, character }) => {
  const [scene, setScene] = useState(1);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '', hint: '' }
  
  // Scene 3 states
  const [selectedWord, setSelectedWord] = useState(null);
  const [matches, setMatches] = useState({}); // { wordId: imageId }
  const [scene3Feedback, setScene3Feedback] = useState(null);

  const words = [
    { id: 'w1', text: 'معلم', label: 'Öğretmen' },
    { id: 'w2', text: 'كتاب', label: 'Kitap' },
    { id: 'w3', text: 'مدرسة', label: 'Okul' },
  ];
  
  const images = [
    { id: 'i1', icon: School, label: 'Okul' },
    { id: 'i2', icon: UserCircle2, label: 'Öğretmen' },
    { id: 'i3', icon: BookOpen, label: 'Kitap' },
  ];

  const handleAnswer = (isCorrect, nextScene, hint = '') => {
    if (isCorrect) {
      addScore(10);
      setFeedback({ type: 'success', message: 'Harika! Doğru cevap +10 puan' });
      setTimeout(() => {
        setFeedback(null);
        setScene(nextScene);
      }, 2000);
    } else {
      setFeedback({ type: 'error', message: 'Tekrar dene!', hint });
    }
  };

  const handleMatchSelect = (type, id) => {
    if (type === 'word') {
      setSelectedWord(id);
    } else if (type === 'image' && selectedWord) {
      setMatches(prev => ({ ...prev, [selectedWord]: id }));
      setSelectedWord(null);
    }
  };

  const checkMatches = () => {
    // correct mappings: w1 -> i2, w2 -> i3, w3 -> i1
    const isCorrect = matches['w1'] === 'i2' && matches['w2'] === 'i3' && matches['w3'] === 'i1';
    if (isCorrect) {
      addScore(10);
      setScene3Feedback({ type: 'success', message: 'Hepsi doğru! +10 puan' });
      setTimeout(() => {
        setScene(4);
      }, 2000);
    } else {
      setScene3Feedback({ type: 'error', message: 'Bazı eşleştirmeler yanlış, tekrar dene!' });
      // Optionally reset matches here: setMatches({})
    }
  };

  const renderFeedbackPopup = () => {
    if (!feedback) return null;
    return (
      <div className="absolute inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
        >
          {feedback.type === 'success' ? (
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Star className="w-16 h-16 text-yellow-500 fill-current" />
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">{feedback.message}</h3>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="bg-red-100 p-4 rounded-full mb-4">
                <X className="w-16 h-16 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-red-600 mb-2">{feedback.message}</h3>
              {feedback.hint && <p className="text-lg text-slate-600 mb-6 font-semibold">İpucu: {feedback.hint}</p>}
              <button 
                onClick={() => setFeedback(null)}
                className="btn-primary w-full"
              >
                Geri Dön
              </button>
            </div>
          )}
        </motion.div>
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-blue-50 relative flex flex-col items-center justify-center p-4 md:p-8 overflow-y-auto">
      {renderFeedbackPopup()}

      <AnimatePresence mode="wait">
        {/* SCENE 1 */}
        {scene === 1 && (
          <motion.div 
            key="scene1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-2xl card-container flex flex-col items-center"
          >
            <div className="flex items-start gap-4 mb-8">
              <div className="bg-slate-200 w-24 h-24 rounded-full flex items-center justify-center border-4 border-white shadow-md">
                <UserCircle2 className="w-16 h-16 text-slate-600" />
              </div>
              <div className="bg-white px-8 py-4 rounded-3xl rounded-tl-none shadow-md border-2 border-blue-100 relative mt-4">
                <div className="flex items-center gap-4">
                  <p className="text-4xl arabic-text text-blue-900">مرحبا</p>
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-sm text-slate-500 mt-1">(Merhaba)</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-700 mb-6">Ne demelisin?</h2>

            <div className="flex flex-col gap-4 w-full max-w-md">
              <button onClick={() => handleAnswer(true, 2)} className="btn-option arabic-text">مرحبا</button>
              <button onClick={() => handleAnswer(false, 1, 'Selamlaşma kelimesi')} className="btn-option arabic-text">كتاب</button>
              <button onClick={() => handleAnswer(false, 1, 'Selamlaşma kelimesi')} className="btn-option arabic-text">باب</button>
            </div>
          </motion.div>
        )}

        {/* SCENE 2 */}
        {scene === 2 && (
          <motion.div 
            key="scene2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-2xl card-container flex flex-col items-center"
          >
            <div className="bg-white px-8 py-6 rounded-3xl shadow-md border-2 border-blue-100 mb-8 text-center w-full max-w-md">
               <p className="text-4xl arabic-text text-blue-900 mb-2">ما اسمك؟</p>
               <p className="text-slate-500 font-semibold">(Adın ne?)</p>
            </div>

            <h2 className="text-2xl font-bold text-slate-700 mb-6">Doğru cevabı seç:</h2>

            <div className="flex flex-col gap-4 w-full max-w-md">
              <button onClick={() => handleAnswer(true, 3)} className="btn-option arabic-text">اسمي علي</button>
              <button onClick={() => handleAnswer(false, 2, 'Kendi isminden bahsetmelisin')} className="btn-option arabic-text">أنا كتاب</button>
              <button onClick={() => handleAnswer(false, 2, 'Kendi isminden bahsetmelisin')} className="btn-option arabic-text">في المدرسة</button>
            </div>
          </motion.div>
        )}

        {/* SCENE 3 */}
        {scene === 3 && (
          <motion.div 
            key="scene3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-4xl card-container flex flex-col items-center"
          >
            <h2 className="text-3xl font-black text-blue-800 mb-2">Eşleştirme Oyunu</h2>
            <p className="text-xl text-slate-600 mb-8 font-semibold">Kelimeyi resimle eşleştir.</p>

            <div className="flex justify-between w-full gap-8 mb-8">
              {/* Words Column */}
              <div className="flex flex-col gap-4 flex-1">
                {words.map(w => (
                  <button 
                    key={w.id}
                    onClick={() => handleMatchSelect('word', w.id)}
                    className={`btn-option !py-6 text-3xl ${selectedWord === w.id ? 'ring-4 ring-blue-400 bg-blue-50' : ''}`}
                  >
                    {w.text}
                  </button>
                ))}
              </div>

              {/* Connecting Lines (Visual abstraction, just logic driven for now via colors) */}
              <div className="flex-1 flex flex-col gap-4">
                {images.map(img => {
                  const Icon = img.icon;
                  // Find if this image is matched to any word
                  const matchedWordId = Object.keys(matches).find(k => matches[k] === img.id);
                  const isMatched = !!matchedWordId;
                  
                  return (
                    <button 
                      key={img.id}
                      onClick={() => handleMatchSelect('image', img.id)}
                      className={`h-[92px] bg-white rounded-2xl shadow-md border-2 flex items-center justify-center transition-all ${
                        isMatched ? 'border-green-400 bg-green-50' : 'border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      <Icon className={`w-12 h-12 ${isMatched ? 'text-green-500' : 'text-slate-600'}`} />
                      {isMatched && <Check className="absolute right-4 text-green-500 w-6 h-6" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {scene3Feedback && (
              <div className={`mb-4 p-4 rounded-xl font-bold text-lg w-full text-center ${scene3Feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {scene3Feedback.message}
              </div>
            )}

            <button onClick={checkMatches} className="btn-primary flex items-center gap-2">
              Kontrol Et <ArrowRight />
            </button>
          </motion.div>
        )}

        {/* SCENE 4 */}
        {scene === 4 && (
          <motion.div 
            key="scene4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl card-container flex flex-col items-center text-center bg-gradient-to-b from-yellow-50 to-orange-50 border-yellow-200"
          >
            <h2 className="text-4xl font-black text-yellow-600 mb-8">Bölüm Tamamlandı!</h2>
            
            <div className="flex gap-4 mb-8">
              {[1, 2, 3].map((star, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  <Star className="w-20 h-20 text-yellow-400 fill-current drop-shadow-md" />
                </motion.div>
              ))}
            </div>

            <div className="bg-white px-8 py-4 rounded-full shadow-inner mb-10">
              <p className="text-2xl font-bold text-slate-700">Harikasın!</p>
            </div>

            <button onClick={onComplete} className="btn-primary w-full max-w-md flex items-center justify-center gap-3 bg-gradient-to-r from-orange-400 to-yellow-500 border-none hover:from-orange-500 hover:to-yellow-600 shadow-[0_8px_0_#ca8a04] hover:shadow-[0_6px_0_#ca8a04]">
              <Map className="w-6 h-6" /> Haritaya Dön
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SchoolLevel;
