import React, { useState, useEffect } from 'react';
import CinematicIntro from '../../scenes/CinematicIntro';
import HeroScene from '../../scenes/HeroScene';
import SubjectWorldScene from '../../scenes/SubjectWorldScene';
import RecallChallengeScene from '../../scenes/RecallChallengeScene';
import HowItWorksScene from '../../scenes/HowItWorksScene';
import MasteryScene from '../../scenes/MasteryScene';
import ImpactScene from '../../scenes/ImpactScene';
import FinalCTA from '../../scenes/FinalCTA';
import DotField from '../../components/visuals/DotField';
import GradientWaves from '../../components/visuals/GradientWaves';

export const LandingPage: React.FC = () => {
  const [introDone, setIntroDone] = useState(false);
  const [hasSeenLoader, setHasSeenLoader] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('hasSeenRecallIntro');

    if (seen) {
      setHasSeenLoader(true);
      setIntroDone(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setIntroDone(true);
    sessionStorage.setItem('hasSeenRecallIntro', 'true');
  };

  return (
    <>
      {!hasSeenLoader && !introDone && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      {introDone && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 0,
              pointerEvents: 'none',
            }}
          >
            {/* LANDING PAGE WAVE BACKGROUND */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.6,
              }}
            >
              <GradientWaves
                horizonColor="#5227FF"
                waveColor="#FF9FFC"
                crestColor="#FFFFFF"
                speed={0.4}
                amplitude={2.5}
                waveScale={0.6}
                waveRatio={0.9}
                swell={35}
                turbulence={20}
                tilt={1.11}
                zoom={1}
                height={5.5}
                fogDepth={15}
                detail="medium"
                brightness={1.3}
                opacity={1}
                grain
                grainIntensity={0.05}
                parallaxStrength={0.5}
              />
            </div>

            {/* DOT BACKGROUND */}
            <div
              style={{
                position: 'absolute',
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

          {/* PAGE CONTENT */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
            }}
          >
            {/* ORIGINAL DARK GRADIENT FADE */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: -1,
                background:
                  'linear-gradient(to bottom, rgba(7,8,12,0) 0%, rgba(7,8,12,0.2) 15%, rgba(7,8,12,0.6) 40%, rgba(7,8,12,0.85) 70%, rgba(7,8,12,0.92) 100%)',
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