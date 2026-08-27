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
    "boot" | "glitch" | "zoom" | "complete"
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
          }, 400);

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
        setPhase("zoom");
      }, 1200);

      return () => clearTimeout(timer);
    }

    if (phase === "zoom") {
      const timer = setTimeout(() => {
        setPhase("complete");
        onComplete();
        document.body.style.overflow = "auto";
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  if (phase === "complete") {
    return null;
  }

  return (
    <motion.div
      className="intro-gamified"
      animate={{
        opacity: phase === "zoom" ? 0 : 1,
      }}
      transition={{
        duration: phase === "zoom" ? 0.8 : 0.2,
        ease: "easeInOut",
      }}
    >
      <div className="intro-gamified__crt" />

      <AnimatePresence mode="wait">
        {phase === "boot" && (
          <motion.div
            key="boot"
            className="intro-gamified__boot text-game"
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 1.08,
              filter: "blur(6px)",
            }}
            transition={{
              duration: 0.3,
            }}
          >
            {DECODE_TEXT.slice(
              0,
              bootTextIndex + 1
            ).map((text, i) => (
              <p key={i}>{text}</p>
            ))}

            <span className="intro-gamified__cursor" />
          </motion.div>
        )}

        {(phase === "glitch" ||
          phase === "zoom") && (
          <motion.div
            key="glitch"
            className="intro-gamified__glitch-container"
            initial={{
              scale: 0.8,
              opacity: 0,
              filter: "blur(8px)",
            }}
            animate={
              phase === "zoom"
                ? {
                    scale: 12,
                    opacity: 0,
                    filter: "blur(12px)",
                  }
                : {
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                  }
            }
            transition={
              phase === "zoom"
                ? {
                    duration: 0.8,
                    ease: [0.64, 0.04, 0.35, 1],
                  }
                : {
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }
            }
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
    </motion.div>
  );
}