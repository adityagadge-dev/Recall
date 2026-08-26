import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb } from 'lucide-react';
import './Hangman.css';

const WORD = 'PASSWORD';
const HINT = 'A secret sequence used to protect access to an account or device.';
const MAX_MISTAKES = 8;
const ALPHABET = [
  ['A','B','C','D','E','F','G','H','I'],
  ['J','K','L','M','N','O','P','Q','R'],
  ['S','T','U','V','W','X','Y','Z']
];

export default function Hangman() {
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const isWon = WORD.split('').every((char) => guessed.has(char));
  const isLost = mistakes >= MAX_MISTAKES;
  const isGameOver = isWon || isLost;

  const handleGuess = useCallback(
    (letter: string) => {
      if (isGameOver || guessed.has(letter)) return;
      
      const newGuessed = new Set(guessed).add(letter);
      setGuessed(newGuessed);
      
      if (!WORD.includes(letter)) {
        setMistakes((m) => m + 1);
      }
    },
    [guessed, isGameOver]
  );

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (ALPHABET.flat().includes(key)) {
        handleGuess(key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGuess]);

  const handleRestart = () => {
    setGuessed(new Set());
    setMistakes(0);
    setShowHint(false);
  };

  return (
    <div className="hangman-dark">
      {/* Header */}
      <div className="hangman-dark__header">
        <h2>RECALL CHALLENGE</h2>
        <p>How much do you remember?</p>
      </div>

      {/* Visual */}
      <div className="hangman-dark__visual-container">
        <svg viewBox="0 0 150 160" className="hangman-dark__svg">
          {/* Base */}
          {mistakes > 0 && (
            <line x1="30" y1="140" x2="120" y2="140" stroke="#A9AFBD" strokeWidth="6" strokeLinecap="round" />
          )}
          {/* Pole */}
          {mistakes > 1 && (
            <path d="M50 140 L50 20 L95 20 L95 40" stroke="#F7F5F1" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          )}
          
          {/* Head */}
          {mistakes > 2 && (
            <circle cx="95" cy="60" r="16" stroke="#F7F5F1" strokeWidth="6" fill="none" />
          )}
          {/* Body */}
          {mistakes > 3 && (
            <line x1="95" y1="76" x2="95" y2="110" stroke="#F7F5F1" strokeWidth="6" strokeLinecap="round" />
          )}
          {/* Left Arm */}
          {mistakes > 4 && (
            <line x1="95" y1="85" x2="70" y2="105" stroke="#F7F5F1" strokeWidth="6" strokeLinecap="round" />
          )}
          {/* Right Arm */}
          {mistakes > 5 && (
            <line x1="95" y1="85" x2="120" y2="105" stroke="#F7F5F1" strokeWidth="6" strokeLinecap="round" />
          )}
          {/* Left Leg */}
          {mistakes > 6 && (
            <line x1="95" y1="110" x2="75" y2="135" stroke="#F7F5F1" strokeWidth="6" strokeLinecap="round" />
          )}
          {/* Right Leg */}
          {mistakes > 7 && (
            <line x1="95" y1="110" x2="115" y2="135" stroke="#F7F5F1" strokeWidth="6" strokeLinecap="round" />
          )}
        </svg>
      </div>

      {/* Tag */}
      <div className="hangman-dark__tag-container">
        <span className="hangman-dark__tag">FIRST AID</span>
      </div>

      {/* Hint Area */}
      <div className="hangman-dark__hint-wrapper">
        <AnimatePresence mode="wait">
          {!showHint ? (
            <motion.button 
              key="btn"
              className="hangman-dark__hint-btn"
              onClick={() => setShowHint(true)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Lightbulb size={16} /> Need a clue?
            </motion.button>
          ) : (
            <motion.div 
              key="box"
              className="hangman-dark__hint-box"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Lightbulb className="hangman-dark__hint-icon" />
              <span>{HINT}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Word */}
      <div className="hangman-dark__word">
        {WORD.split('').map((char, i) => {
          const isRevealed = guessed.has(char) || isLost;
          return (
            <div key={i} className="hangman-dark__char-container">
              <span className="hangman-dark__char">
                {isRevealed ? char : ''}
              </span>
              <div className={`hangman-dark__char-line ${isRevealed ? 'hangman-dark__char-line--active' : ''}`} />
            </div>
          );
        })}
      </div>

      {/* Keyboard */}
      <div className="hangman-dark__keyboard">
        {ALPHABET.map((row, rowIdx) => (
          <div key={rowIdx} className="hangman-dark__keyboard-row">
            {row.map((letter) => {
              const isGuessed = guessed.has(letter);
              const isCorrect = WORD.includes(letter);
              let statusClass = '';
              if (isGuessed) {
                statusClass = isCorrect ? 'hangman-dark__key--correct' : 'hangman-dark__key--wrong';
              }
              
              return (
                <button
                  key={letter}
                  className={`hangman-dark__key ${statusClass}`}
                  onClick={() => handleGuess(letter)}
                  disabled={isGuessed || isGameOver}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Game Over Overlay */}
      <AnimatePresence>
        {isGameOver && (
          <motion.div 
            className="hangman-dark__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="hangman-dark__result">
              <h3 style={{ color: isWon ? '#73CFC5' : '#FF786B' }}>
                {isWon ? 'WELL DONE!' : 'GAME OVER'}
              </h3>
              <p>
                {isWon ? 'You remembered it correctly.' : `The correct word was ${WORD}.`}
              </p>
              <button className="hangman-dark__restart" onClick={handleRestart}>
                Try Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
