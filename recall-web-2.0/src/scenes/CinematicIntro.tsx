import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./CinematicIntro.css";

interface IntroProps {
  onComplete: () => void;
}

const DECODE_TEXT = [
  "INITIALIZING NEURAL LINK...",
  "BYPASSING SECURITY PROTOCOLS...",
  "UPLOADING SKILL MATRICES...",
  "SYNC COMPLETE.",
];

export default function CinematicIntro({
  onComplete,
}: IntroProps) {
  const [phase, setPhase] = useState<
    "boot" | "glitch" | "complete"
  >("boot");

  const [bootTextIndex, setBootTextIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const bootInterval = setInterval(() => {
      setBootTextIndex((i) => {
        if (i >= DECODE_TEXT.length - 1) {
          clearInterval(bootInterval);

          setTimeout(() => {
            setPhase("glitch");
          }, 450);

          return i;
        }

        return i + 1;
      });
    }, 350);

    return () => {
      clearInterval(bootInterval);
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (phase === "glitch") {
      const timer = setTimeout(() => {
        setPhase("complete");
        document.body.style.overflow = "auto";
        onComplete();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  if (phase === "complete") {
    return null;
  }

  return (
    <div className="intro-gamified">
      <div className="intro-gamified__crt" />

      <AnimatePresence mode="wait">
        {/* BOOT SEQUENCE */}
        {phase === "boot" && (
          <motion.div
            key="boot"
            className="intro-gamified__boot text-game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              filter: "blur(4px)",
            }}
            transition={{
              duration: 0.25,
            }}
          >
            {DECODE_TEXT
              .slice(0, bootTextIndex + 1)
              .map((text, i) => (
                <p key={i}>{text}</p>
              ))}

            <span className="intro-gamified__cursor" />
          </motion.div>
        )}

        {/* RECALL */}
        {phase === "glitch" && (
          <motion.div
            key="glitch"
            className="intro-gamified__glitch-container"
            initial={{
              opacity: 1,
            }}
            animate={{
              opacity: [1, 1, 1, 0.8, 0],
            }}
            transition={{
              duration: 1.5,
              times: [0, 0.75, 0.85, 0.94, 1],
              ease: "linear",
            }}
          >
            <div
              className="intro-gamified__glitch-text heading-display"
              data-text="RECALL"
            >
              RECALL
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}