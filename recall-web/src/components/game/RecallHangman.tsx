import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playClickSound } from '../../hooks/useGlobalClickSound';
import { Trophy, RefreshCw, XCircle, Lightbulb } from 'lucide-react';

const WORDS = [
  { word: 'SAVINGS', category: 'Financial Literacy', hint: "Money you set aside for future needs or goals." },
  { word: 'BUDGET', category: 'Financial Literacy', hint: "A plan for how you will manage your income and expenses." },
  { word: 'INTEREST', category: 'Financial Literacy', hint: "The extra amount paid or earned for using money over time." },
  { word: 'CREDIT', category: 'Financial Literacy', hint: "An arrangement to receive cash, goods, or services now and pay for them in the future." },
  { word: 'INSURANCE', category: 'Financial Literacy', hint: "Protection against financial loss from unexpected events." },
  { word: 'PHISHING', category: 'Digital Safety', hint: "A deceptive attempt to trick someone into revealing sensitive information." },
  { word: 'PRIVACY', category: 'Digital Safety', hint: "The ability to control who can access your personal information." },
  { word: 'PASSWORD', category: 'Digital Safety', hint: "A secret sequence used to protect access to an account or device." },
  { word: 'SCAM', category: 'Digital Safety', hint: "A dishonest trick used to steal money, information, or access." },
  { word: 'FIRSTAID', category: 'First Aid', hint: "Emergency care given immediately to an injured or ill person." },
  { word: 'EMERGENCY', category: 'First Aid', hint: "A serious unexpected situation requiring immediate action." },
  { word: 'RECOVERY', category: 'First Aid', hint: "The process of returning to a normal state of health, mind, or strength." },
  { word: 'LISTENING', category: 'Communication Skills', hint: "Giving someone your full attention so you can understand what they are saying." },
  { word: 'EMPATHY', category: 'Communication Skills', hint: "Understanding and recognizing another person's feelings or perspective." },
  { word: 'CONFLICT', category: 'Communication Skills', hint: "A serious disagreement or argument that needs resolution." },
  { word: 'CLARITY', category: 'Communication Skills', hint: "The quality of being easy to see, hear, or understand." },
];

const MAX_MISTAKES = 6;
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const RecallHangman: React.FC = () => {
  const [currentWordObj, setCurrentWordObj] = useState(() => WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [showHint, setShowHint] = useState(false);
  
  const word = currentWordObj.word;
  const isWinner = word.split('').every((letter) => guessedLetters.has(letter));
  const isLoser = mistakes >= MAX_MISTAKES;
  const gameOver = isWinner || isLoser;

  const handleGuess = useCallback((letter: string) => {
    if (gameOver || guessedLetters.has(letter)) return;
    
    setGuessedLetters((prev) => new Set(prev).add(letter));
    
    if (word.includes(letter)) {
      playClickSound('success');
    } else {
      setMistakes((prev) => prev + 1);
      playClickSound('error');
    }
  }, [gameOver, guessedLetters, word]);

  useEffect(() => {
    if (isWinner) {
      playClickSound('win');
    } else if (isLoser) {
      playClickSound('lose');
    }
  }, [isWinner, isLoser]);

  const resetGame = () => {
    let nextWord;
    do {
      nextWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    } while (nextWord.word === word);
    
    setCurrentWordObj(nextWord);
    setGuessedLetters(new Set());
    setMistakes(0);
    setShowHint(false);
    playClickSound('default');
  };

  const renderHangman = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full max-w-[200px] mx-auto text-[#FF6B61]" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      {/* 1. Base */}
      {mistakes > 0 && (
        <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1="40" y1="180" x2="160" y2="180" stroke="#FFD166" strokeWidth="8" />
      )}
      {/* 2. Pole */}
      {mistakes > 1 && (
        <>
          <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1="80" y1="180" x2="80" y2="40" />
          <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1="80" y1="40" x2="140" y2="40" />
          <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1="140" y1="40" x2="140" y2="60" />
        </>
      )}
      {/* 3. Head */}
      {mistakes > 2 && (
        <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} cx="140" cy="80" r="20" />
      )}
      {/* 4. Body */}
      {mistakes > 3 && (
        <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1="140" y1="100" x2="140" y2="140" />
      )}
      {/* 5. Arms */}
      {mistakes > 4 && (
        <>
          <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1="140" y1="110" x2="120" y2="130" />
          <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1="140" y1="110" x2="160" y2="130" />
        </>
      )}
      {/* 6. Legs */}
      {mistakes > 5 && (
        <>
          <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1="140" y1="140" x2="125" y2="170" />
          <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1="140" y1="140" x2="155" y2="170" />
        </>
      )}
    </svg>
  );

  return (
    <div className="relative w-full max-w-[450px] mx-auto min-h-[650px] rounded-[2rem] bg-[#11151F] shadow-2xl border border-[#323B4E] flex flex-col overflow-hidden group hover:shadow-[0_0_40px_rgba(255,107,97,0.15)] transition-shadow duration-500">
      
      {/* Subtle animated background shapes for idle state */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-10 -right-10 w-40 h-40 bg-[#FFD166]/10 rounded-full blur-2xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#54D6C2]/10 rounded-full blur-2xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="relative z-10 flex flex-col h-full p-5 sm:p-6 lg:p-8 flex-1">
        {/* Header */}
        <div className="text-center mb-4">
          <h3 className="text-[#F7F8FC] font-extrabold text-lg sm:text-xl tracking-tight mb-1">RECALL CHALLENGE</h3>
          <p className="text-xs sm:text-sm text-[#9AA4B8] font-medium">How much do you remember?</p>
        </div>

        {/* Hangman Illustration Area */}
        <div className="w-full flex items-center justify-center py-4 bg-[#0D1017] rounded-2xl border border-[#323B4E] mb-4 shrink-0 aspect-[5/3] sm:aspect-[2/1]">
          {renderHangman()}
        </div>

        {/* Category & Word Area */}
        <div className="text-center mb-6">
          <div className="inline-block px-3 py-1 bg-[#1A2030] text-[#9AA4B8] text-xs font-bold uppercase tracking-wider rounded-full mb-3 border border-[#323B4E]">
            {currentWordObj.category}
          </div>
          
          <div className="mb-4 flex flex-col items-center min-h-[44px]">
            {!showHint ? (
              <button
                onClick={() => {
                  setShowHint(true);
                  playClickSound('default');
                }}
                className="flex items-center gap-1.5 text-xs font-medium text-[#9AA4B8] hover:text-[#FFD166] bg-[#0D1017] hover:bg-[#1A2030] border border-[#323B4E] px-4 py-2 rounded-full transition-all active:scale-95"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                Need a clue?
              </button>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                className="text-xs text-[#9AA4B8] bg-[#FFD166]/10 border border-[#FFD166]/20 px-4 py-2.5 rounded-xl max-w-[90%] flex items-start gap-2 shadow-sm text-left overflow-hidden"
              >
                <Lightbulb className="w-4 h-4 text-[#FFD166] shrink-0 mt-0.5" />
                <span>{currentWordObj.hint}</span>
              </motion.div>
            )}
          </div>
          
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 px-2 min-h-[50px]">
            {word.split('').map((letter, i) => (
              <div 
                key={i} 
                className={`w-7 h-9 sm:w-8 sm:h-10 border-b-4 flex items-end justify-center pb-1 sm:pb-2 text-xl sm:text-2xl font-bold transition-colors ${
                  guessedLetters.has(letter) || isLoser ? 'border-[#F7F8FC] text-[#F7F8FC]' : 'border-[#323B4E] text-transparent'
                }`}
              >
                <AnimatePresence>
                  {(guessedLetters.has(letter) || isLoser) && (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={!guessedLetters.has(letter) && isLoser ? 'text-[#FF4D5A]' : ''}
                    >
                      {letter}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Keyboard or Result State */}
        <div className="mt-auto min-h-[180px] flex flex-col justify-end">
          <AnimatePresence mode="wait">
            {!gameOver ? (
              <motion.div 
                key="keyboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex flex-wrap justify-center gap-1.5 sm:gap-2"
              >
                {ALPHABET.map((letter) => {
                  const isGuessed = guessedLetters.has(letter);
                  const isCorrect = word.includes(letter);
                  let stateClasses = 'bg-[#151A24] border-[#323B4E] text-[#9AA4B8] hover:border-[#FFD166] hover:text-[#FFD166] hover:bg-[#1A2030] hover:-translate-y-0.5 active:scale-95 shadow-sm';
                  
                  if (isGuessed) {
                    if (isCorrect) {
                      stateClasses = 'bg-[#54D6C2]/10 border-[#54D6C2]/30 text-[#54D6C2] opacity-80 cursor-default';
                    } else {
                      stateClasses = 'bg-[#FF4D5A]/10 border-[#FF4D5A]/30 text-[#FF4D5A] opacity-50 cursor-default';
                    }
                  }

                  return (
                    <button
                      key={letter}
                      onClick={() => handleGuess(letter)}
                      disabled={isGuessed || gameOver}
                      data-no-global-sound="true"
                      className={`w-[8%] min-w-[28px] max-w-[36px] aspect-square rounded-md border flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-200 ${stateClasses}`}
                      aria-label={`Guess letter ${letter}`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-6 bg-[#0D1017] rounded-2xl border border-[#323B4E] w-full"
              >
                {isWinner ? (
                  <div className="text-center mb-5">
                    <div className="flex justify-center mb-3">
                      <motion.div animate={{ rotate: [0, -10, 10, -10, 10, 0] }} transition={{ duration: 0.5, delay: 0.2 }}>
                        <Trophy className="w-10 h-10 text-[#FFD166]" />
                      </motion.div>
                    </div>
                    <h4 className="text-2xl font-bold text-[#F7F8FC] mb-2">Nice recall!</h4>
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: 0.4 }}
                      className="text-base font-bold text-[#54D6C2]"
                    >
                      +25 XP
                    </motion.div>
                  </div>
                ) : (
                  <div className="text-center mb-5">
                    <div className="flex justify-center mb-3">
                      <XCircle className="w-10 h-10 text-[#FF4D5A]" />
                    </div>
                    <h4 className="text-xl font-bold text-[#F7F8FC] mb-2">The word was: <span className="text-[#FF4D5A]">{word}</span></h4>
                    <p className="text-sm text-[#9AA4B8]">Try another skill.</p>
                  </div>
                )}
                
                <button
                  onClick={resetGame}
                  data-no-global-sound="true"
                  className="flex items-center gap-2 bg-[#F7F8FC] text-[#07080C] px-8 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-white hover:-translate-y-1 active:scale-95 transition-all w-full justify-center"
                >
                  <RefreshCw className="w-4 h-4" />
                  Play Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
