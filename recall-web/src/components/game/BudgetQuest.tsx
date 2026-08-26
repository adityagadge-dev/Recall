import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClickSound } from '../../hooks/useGlobalClickSound';

const itemsPool = [
  { name: "Rent Share", cost: 8000, cat: "Need", icon: "🏠" },
  { name: "Groceries", cost: 1500, cat: "Need", icon: "🍞" },
  { name: "Fancy Coffee", cost: 200, cat: "Want", icon: "☕" },
  { name: "Electricity Bill", cost: 1200, cat: "Need", icon: "⚡" },
  { name: "Takeout Dinner", cost: 600, cat: "Want", icon: "🍕" },
  { name: "Bus Pass", cost: 800, cat: "Need", icon: "🚌" },
  { name: "Video Game", cost: 1500, cat: "Want", icon: "🎮" },
  { name: "Streaming", cost: 400, cat: "Want", icon: "📺" },
  { name: "New Shoes", cost: 2000, cat: "Want", icon: "👟" },
  { name: "Internet Bill", cost: 1000, cat: "Need", icon: "🌐" },
  { name: "Concert Ticket", cost: 2500, cat: "Want", icon: "🎟️" },
  { name: "Pharmacy", cost: 500, cat: "Need", icon: "💊" },
  { name: "Gym Membershp", cost: 1000, cat: "Want", icon: "🏋️" },
  { name: "Work Lunch", cost: 300, cat: "Want", icon: "🥗" }
];

export const BudgetQuest: React.FC = () => {
  const [budget, setBudget] = useState(0);
  const [initialBudget, setInitialBudget] = useState(0);
  const [currentDay, setCurrentDay] = useState(1);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [gameState, setGameState] = useState<'playing' | 'bankrupt' | 'success'>('playing');
  const [cardKey, setCardKey] = useState(0);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);
  const [floatingText, setFloatingText] = useState<{id: number, text: string, type: 'buy' | 'skip'}[]>([]);
  
  const totalDays = 30;
  const floatingIdRef = useRef(0);

  const initGame = useCallback(() => {
    const newBudget = Math.floor(Math.random() * (45000 - 30000 + 1)) + 30000;
    setInitialBudget(newBudget);
    setBudget(newBudget);
    setCurrentDay(1);
    setGameState('playing');
    setExitDirection(null);
    setCardKey(0);
    setCurrentItem(itemsPool[Math.floor(Math.random() * itemsPool.length)]);
    setFloatingText([]);
  }, []);

  const handleRestart = () => {
    playClickSound('default');
    initGame();
  };

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleDecision = useCallback((bought: boolean) => {
    if (gameState !== 'playing' || !currentItem) return;

    if (bought) {
      playClickSound('default');
    } else {
      playClickSound('default');
    }

    setExitDirection(bought ? 'right' : 'left');
    
    // Add floating text
    const fId = floatingIdRef.current++;
    setFloatingText(prev => [...prev, {
      id: fId,
      text: bought ? `\u20B9${currentItem.cost.toLocaleString()}` : 'SAVED',
      type: bought ? 'buy' : 'skip'
    }]);

    setTimeout(() => {
      setFloatingText(prev => prev.filter(t => t.id !== fId));
    }, 1000);

    let newBudget = budget;
    if (bought) {
      newBudget -= currentItem.cost;
      setBudget(newBudget);
    }

    if (newBudget < 0) {
      setTimeout(() => {
        setGameState('bankrupt');
        playClickSound('error');
      }, 300);
      return;
    }

    if (currentDay >= totalDays) {
      setTimeout(() => {
        setGameState('success');
        playClickSound('win');
      }, 300);
      return;
    }

    setTimeout(() => {
      let nextItem;
      do {
        nextItem = itemsPool[Math.floor(Math.random() * itemsPool.length)];
      } while (nextItem.name === currentItem.name); // basic anti-repeat
      
      setCurrentItem(nextItem);
      setCurrentDay(d => d + 1);
      setExitDirection(null);
      setCardKey(k => k + 1);
    }, 250); // wait for swipe animation
  }, [budget, currentDay, currentItem, gameState]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === 'playing') {
        if (e.key === 'ArrowLeft') handleDecision(false);
        if (e.key === 'ArrowRight') handleDecision(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDecision, gameState]);

  return (
    <div className="relative w-full max-w-[320px] mx-auto bg-[#11151F] border-4 border-[#323B4E] rounded-xl p-2.5 shadow-[0_0_40px_rgba(84,214,194,0.15)] font-pixel overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        .font-pixel { font-family: 'Press Start 2P', monospace; }
        .pixel-shadow { box-shadow: 3px 3px 0px rgba(0,0,0,0.5); }
      `}</style>
      
      {/* HUD */}
      <div className="bg-[#07080C] border-2 border-[#323B4E] p-1.5 mb-2.5 text-[9px] leading-relaxed pixel-shadow rounded-lg flex flex-col gap-1">
        <div className="flex justify-between items-center text-white">
          <span>DAY:</span>
          <span className="text-[#FFD166]">{currentDay}/{totalDays}</span>
        </div>
        <div className="flex justify-between items-center text-white">
          <span>BUDGET:</span>
          <motion.span 
            key={budget}
            initial={{ scale: 1.5, color: '#FFD166' }}
            animate={{ scale: 1, color: budget < 5000 ? '#FF6B61' : '#54D6C2' }}
            className="transition-colors"
          >
            &#8377;{budget.toLocaleString()}
          </motion.span>
        </div>
      </div>

      {/* Floating feedback */}
      <AnimatePresence>
        {floatingText.map(ft => (
          <motion.div
            key={ft.id}
            initial={{ opacity: 1, y: 0, x: ft.type === 'buy' ? 50 : -50 }}
            animate={{ opacity: 0, y: -40, x: ft.type === 'buy' ? 60 : -60 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`absolute top-1/3 left-1/2 -translate-x-1/2 z-50 text-xs font-bold ${ft.type === 'buy' ? 'text-[#FF6B61]' : 'text-[#54D6C2]'}`}
            style={{ textShadow: '2px 2px 0 #000' }}
          >
            {ft.type === 'buy' ? '-' : ''}{ft.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* GAME AREA */}
      <div className="relative h-[160px] mb-2.5">
        <AnimatePresence mode="popLayout">
          {gameState === 'playing' && currentItem && (
            <motion.div
              key={cardKey}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ 
                opacity: 0, 
                x: exitDirection === 'left' ? -150 : (exitDirection === 'right' ? 150 : 0),
                rotate: exitDirection === 'left' ? -15 : (exitDirection === 'right' ? 15 : 0),
                scale: 0.8
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="absolute inset-0 bg-[#F7F8FC] border-4 border-[#07080C] rounded-lg p-2.5 flex flex-col justify-between items-center pixel-shadow cursor-default"
            >
              <div className="w-full flex justify-between items-center text-[7px] uppercase font-bold text-[#687286]">
                <span className={currentItem.cat === 'Need' ? 'text-[#FF6B61]' : 'text-[#FFD166]'}>
                  {currentItem.cat}
                </span>
                <span>&#8377;{currentItem.cost.toLocaleString()}</span>
              </div>
              
              <div className="text-4xl my-1 filter drop-shadow-md">
                {currentItem.icon}
              </div>
              
              <div className="text-center text-[#07080C]">
                <h3 className="text-[9px] sm:text-[10px] mb-1.5 leading-snug">{currentItem.name}</h3>
                <div className="inline-block bg-[#FF6B61]/10 border-2 border-[#FF6B61] text-[#FF6B61] px-1.5 py-1 text-[7px]">
                  -&#8377;{currentItem.cost.toLocaleString()}
                </div>
              </div>
            </motion.div>
          )}
          {gameState === 'bankrupt' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-[#11151F] border-4 border-[#FF6B61] rounded-lg p-2.5 flex flex-col justify-center items-center text-center pixel-shadow"
            >
              <h2 className="text-[#FF6B61] text-[11px] mb-2">BANKRUPT!</h2>
              <p className="text-[7px] text-[#9AA4B8] leading-loose mb-3">
                Ran out of money on Day {currentDay}!<br/><br/>
                Prioritize Needs over Wants.
              </p>
              <button 
                data-no-global-sound
                onClick={handleRestart}
                className="w-full bg-[#FFD166] text-[#07080C] border-2 border-[#07080C] py-2 text-[7px] hover:bg-[#F7F8FC] transition-colors pixel-shadow active:translate-y-1 active:shadow-none"
              >
                PLAY AGAIN
              </button>
            </motion.div>
          )}
          {gameState === 'success' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-[#11151F] border-4 border-[#54D6C2] rounded-lg p-2.5 flex flex-col justify-center items-center text-center pixel-shadow"
            >
              <h2 className="text-[#54D6C2] text-[10px] mb-2 leading-relaxed">MONTH<br/>COMPLETED!</h2>
              <p className="text-[7px] text-[#9AA4B8] leading-loose mb-3">
                Survived 30 days!<br/>
                Saved: <span className="text-[#FFD166]">&#8377;{budget.toLocaleString()}</span>
              </p>
              <button 
                data-no-global-sound
                onClick={handleRestart}
                className="w-full bg-[#54D6C2] text-[#07080C] border-2 border-[#07080C] py-2 text-[7px] hover:bg-[#F7F8FC] transition-colors pixel-shadow active:translate-y-1 active:shadow-none"
              >
                PLAY AGAIN
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CONTROLS */}
      <div className={`flex justify-between gap-2 ${gameState !== 'playing' ? 'opacity-50 pointer-events-none' : ''}`}>
        <button 
          data-no-global-sound
          onClick={() => handleDecision(false)}
          className="flex-1 bg-[#11151F] text-[#F7F8FC] border-2 border-[#323B4E] py-2.5 text-[8px] hover:border-[#FF6B61] hover:text-[#FF6B61] transition-colors pixel-shadow active:translate-y-1 active:shadow-none flex justify-center items-center gap-1.5"
        >
          <span>&larr;</span> SKIP
        </button>
        <button 
          data-no-global-sound
          onClick={() => handleDecision(true)}
          className="flex-1 bg-[#11151F] text-[#F7F8FC] border-2 border-[#323B4E] py-2.5 text-[8px] hover:border-[#54D6C2] hover:text-[#54D6C2] transition-colors pixel-shadow active:translate-y-1 active:shadow-none flex justify-center items-center gap-1.5"
        >
          BUY <span>&rarr;</span>
        </button>
      </div>

      {/* Header Badge */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#FFD166] text-[#07080C] text-[7px] px-2 py-1 font-bold border-2 border-[#07080C] whitespace-nowrap z-10">
        PIXEL BUDGET QUEST
      </div>
    </div>
  );
};
