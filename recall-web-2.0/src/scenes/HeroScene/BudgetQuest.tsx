import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './BudgetQuest.css';

interface Expense {
  name: string;
  cost: number;
  type: 'need' | 'want';
  emoji: string;
}

const EXPENSES: Expense[] = [
  { name: 'Groceries', cost: 2500, type: 'need', emoji: '🥦' },
  { name: 'Netflix', cost: 649, type: 'want', emoji: '🎬' },
  { name: 'Bus Pass', cost: 1200, type: 'need', emoji: '🚌' },
  { name: 'Sneakers', cost: 4999, type: 'want', emoji: '👟' },
  { name: 'Phone Bill', cost: 599, type: 'need', emoji: '📱' },
  { name: 'Café Latte', cost: 350, type: 'want', emoji: '☕' },
  { name: 'Medicine', cost: 800, type: 'need', emoji: '💊' },
  { name: 'Gaming Sub', cost: 499, type: 'want', emoji: '🎮' },
  { name: 'Electricity', cost: 1800, type: 'need', emoji: '⚡' },
  { name: 'Concert Tix', cost: 3500, type: 'want', emoji: '🎵' },
  { name: 'Textbooks', cost: 1500, type: 'need', emoji: '📚' },
  { name: 'Uber Eats', cost: 750, type: 'want', emoji: '🍔' },
];

const INITIAL_BUDGET = 34500;

export default function BudgetQuest() {
  const [budget, setBudget] = useState(INITIAL_BUDGET);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [day, setDay] = useState(1);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [decisions, setDecisions] = useState<Array<{ expense: Expense; bought: boolean }>>([]);
  const [gameOver, setGameOver] = useState(false);

  const currentExpense = EXPENSES[currentIndex % EXPENSES.length];

  const [isAnimating, setIsAnimating] = useState(false);

  const advance = useCallback(() => {
    if (day >= 12) {
      setGameOver(true);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setDay((d) => d + 1);
  }, [day]);

  const handleBuy = useCallback(() => {
    if (isAnimating) return;
    if (budget < currentExpense.cost) return;

    setIsAnimating(true);
    setDirection('right');
    const newBudget = budget - currentExpense.cost;
    setBudget(newBudget);
    setDecisions((d) => [...d, { expense: currentExpense, bought: true }]);
    setTimeout(() => {
      setDirection(null);
      advance();
      setIsAnimating(false);
    }, 300);
  }, [budget, currentExpense, advance, isAnimating]);

  const handleSkip = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection('left');
    setDecisions((d) => [...d, { expense: currentExpense, bought: false }]);
    setTimeout(() => {
      setDirection(null);
      advance();
      setIsAnimating(false);
    }, 300);
  }, [currentExpense, advance, isAnimating]);

  const handleRestart = () => {
    setBudget(INITIAL_BUDGET);
    setCurrentIndex(0);
    setDay(1);
    setDecisions([]);
    setGameOver(false);
    setDirection(null);
  };

  const needsBought = decisions.filter((d) => d.bought && d.expense.type === 'need').length;
  const wantsBought = decisions.filter((d) => d.bought && d.expense.type === 'want').length;

  return (
    <div className="bq">
      {/* Game frame border */}
      <div className="bq__frame">
        {/* Header */}
        <div className="bq__header">
          <span className="bq__title text-game">BUDGET QUEST</span>
          <span className="bq__day text-game">
            DAY {String(day).padStart(2, '0')}/12
          </span>
        </div>

        {/* Budget display */}
        <div className="bq__budget">
          <span className="bq__budget-label text-game">BUDGET</span>
          <motion.span
            className="bq__budget-value"
            key={budget}
            initial={{ scale: 1.15, color: direction === 'right' ? '#FF7467' : '#F5EFE2' }}
            animate={{ scale: 1, color: '#F5EFE2' }}
            transition={{ duration: 0.3 }}
          >
            ₹{budget.toLocaleString('en-IN')}
          </motion.span>
        </div>

        {/* Budget bar */}
        <div className="bq__bar">
          <motion.div
            className="bq__bar-fill"
            animate={{ width: `${(budget / INITIAL_BUDGET) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Card area */}
        <div className="bq__card-area">
          <AnimatePresence mode="wait">
            {!gameOver ? (
              <motion.div
                key={currentIndex}
                className="bq__card"
                initial={{
                  x: direction === 'left' ? 0 : direction === 'right' ? 0 : 0,
                  opacity: 0,
                  scale: 0.9,
                  rotateZ: 0,
                }}
                animate={{ x: 0, opacity: 1, scale: 1, rotateZ: 0 }}
                exit={{
                  x: direction === 'left' ? -200 : direction === 'right' ? 200 : 0,
                  opacity: 0,
                  rotateZ: direction === 'left' ? -8 : direction === 'right' ? 8 : 0,
                  scale: 0.85,
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={`bq__card-type text-game bq__card-type--${currentExpense.type}`}>
                  {currentExpense.type === 'need' ? '★ NEED' : '♦ WANT'}
                </span>
                <span className="bq__card-emoji">{currentExpense.emoji}</span>
                <span className="bq__card-name">{currentExpense.name}</span>
                <span className="bq__card-cost">₹{currentExpense.cost.toLocaleString('en-IN')}</span>
              </motion.div>
            ) : (
              <motion.div
                className="bq__result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <span className="bq__result-emoji">
                  {budget > 15000 ? '🏆' : budget > 5000 ? '👍' : '😬'}
                </span>
                <span className="bq__result-title text-game">
                  {budget > 15000 ? 'SMART SPENDER!' : budget > 5000 ? 'NOT BAD!' : 'BUDGET BUSTED!'}
                </span>
                <span className="bq__result-saved">
                  ₹{budget.toLocaleString('en-IN')} saved
                </span>
                <div className="bq__result-stats">
                  <span className="text-game">NEEDS: {needsBought}</span>
                  <span className="text-game">WANTS: {wantsBought}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className="bq__actions">
          {!gameOver ? (
            <>
              <button className="btn-game bq__btn-skip" onClick={handleSkip} id="bq-skip" disabled={isAnimating}>
                ← SKIP
              </button>
              <button 
                className="btn-game bq__btn-buy" 
                onClick={handleBuy} 
                id="bq-buy" 
                disabled={isAnimating || budget < currentExpense.cost}
                style={{ opacity: budget < currentExpense.cost ? 0.4 : 1, cursor: budget < currentExpense.cost ? 'not-allowed' : 'pointer' }}
              >
                BUY →
              </button>
            </>
          ) : (
            <button className="btn-game bq__btn-restart" onClick={handleRestart} id="bq-restart">
              ↻ PLAY AGAIN
            </button>
          )}
        </div>

        {/* Pixel corners */}
        <div className="bq__corner bq__corner--tl" />
        <div className="bq__corner bq__corner--tr" />
        <div className="bq__corner bq__corner--bl" />
        <div className="bq__corner bq__corner--br" />
      </div>
    </div>
  );
}
