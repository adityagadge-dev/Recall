import React, { useState, useEffect } from "react";

import CinematicIntro from "../../scenes/CinematicIntro";

import HeroScene from "../../scenes/HeroScene";
import SubjectWorldScene from "../../scenes/SubjectWorldScene";
import RecallChallengeScene from "../../scenes/RecallChallengeScene";
import HowItWorksScene from "../../scenes/HowItWorksScene";
import MasteryScene from "../../scenes/MasteryScene";
import ImpactScene from "../../scenes/ImpactScene";
import FinalCTA from "../../scenes/FinalCTA";

import DotField from "../../components/visuals/DotField";
import Hyperspeed from "../../components/visuals/Hyperspeed";
import { hyperspeedPresets } from "../../components/visuals/HyperSpeedPresets";

export const LandingPage: React.FC = () => {
  const [introDone, setIntroDone] = useState(false);
  const [showHyperspeed, setShowHyperspeed] = useState(false);
  const [hasSeenLoader, setHasSeenLoader] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("hasSeenRecallIntro");

    if (seen) {
      setHasSeenLoader(true);
      setIntroDone(true);
    }
  }, []);

  useEffect(() => {
    if (showHyperspeed) {
      const timer = setTimeout(() => {
        setShowHyperspeed(false);
        setIntroDone(true);

        sessionStorage.setItem(
          "hasSeenRecallIntro",
          "true"
        );
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showHyperspeed]);

  const handleIntroComplete = () => {
    setShowHyperspeed(true);
  };

  return (
    <>
      {/* CINEMATIC INTRO */}
      {!hasSeenLoader &&
        !showHyperspeed &&
        !introDone && (
          <CinematicIntro
            onComplete={handleIntroComplete}
          />
        )}

      {/* HYPERSPEED TRANSITION */}
      {!hasSeenLoader && showHyperspeed && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#050507",
          }}
        >
          <Hyperspeed
            effectOptions={hyperspeedPresets.one}
          />
        </div>
      )}

      {/* MAIN WEBSITE */}
      {introDone && (
        <>
          {/* Background */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.8,
              }}
            >
              <DotField
                dotRadius={1.5}
                dotSpacing={14}
                cursorRadius={650}
                cursorForce={0.6}
                bulgeOnly
                bulgeStrength={89}
                glowRadius={120}
                sparkle
                waveAmplitude={0}
                gradientFrom="rgba(168, 85, 247, 0.35)"
                gradientTo="rgba(180, 151, 207, 0.25)"
                glowColor="#120F17"
              />
            </div>
          </div>

          {/* Page Content */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: -1,
                background:
                  "linear-gradient(to bottom, rgba(7,8,12,0) 0%, rgba(7,8,12,0.2) 15%, rgba(7,8,12,0.6) 40%, rgba(7,8,12,0.85) 70%, rgba(7,8,12,0.92) 100%)",
              }}
            />

            <HeroScene />

            <SubjectWorldScene />

            <RecallChallengeScene />

            <HowItWorksScene />

            <MasteryScene />

            <ImpactScene />

            <FinalCTA />
          </div>
        </>
      )}
    </>
  );
};