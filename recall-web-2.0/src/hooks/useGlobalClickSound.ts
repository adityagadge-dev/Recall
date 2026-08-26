import { useEffect, useState } from 'react';

let audioContext: AudioContext | null = null;
let soundEnabled = true;

export const initAudio = () => {
  if (!audioContext && typeof window !== 'undefined') {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioContext = new AudioContextClass();
    }
  }
};

export const playClickSound = (type: 'default' | 'success' | 'error' | 'win' | 'lose' = 'default') => {
  if (!soundEnabled || !audioContext) return;
  if (audioContext.state === 'suspended') {
    audioContext.resume().catch(() => {});
  }

  try {
    const t = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.connect(gain);
    gain.connect(audioContext.destination);

    if (type === 'default') {
      // Soft, subtle click
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(200, t + 0.05);
      gain.gain.setValueAtTime(0.0, t);
      gain.gain.linearRampToValueAtTime(0.05, t + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      osc.start(t);
      osc.stop(t + 0.05);
    } else if (type === 'success') {
      // Soft chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, t);
      osc.frequency.exponentialRampToValueAtTime(1200, t + 0.1);
      gain.gain.setValueAtTime(0.0, t);
      gain.gain.linearRampToValueAtTime(0.05, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      osc.start(t);
      osc.stop(t + 0.15);
    } else if (type === 'error') {
      // Dull thud
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.exponentialRampToValueAtTime(100, t + 0.1);
      gain.gain.setValueAtTime(0.0, t);
      gain.gain.linearRampToValueAtTime(0.05, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      osc.start(t);
      osc.stop(t + 0.15);
    } else if (type === 'win') {
      // Little success arpeggio
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, t);
      osc.frequency.setValueAtTime(600, t + 0.1);
      osc.frequency.setValueAtTime(800, t + 0.2);
      gain.gain.setValueAtTime(0.0, t);
      gain.gain.linearRampToValueAtTime(0.05, t + 0.05);
      gain.gain.linearRampToValueAtTime(0.05, t + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      osc.start(t);
      osc.stop(t + 0.4);
    } else if (type === 'lose') {
      // Sad descending tone
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.linearRampToValueAtTime(200, t + 0.3);
      gain.gain.setValueAtTime(0.0, t);
      gain.gain.linearRampToValueAtTime(0.05, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc.start(t);
      osc.stop(t + 0.3);
    }
  } catch (err) {
    // Fail silently
  }
};

export const useGlobalClickSound = () => {
  const [enabled, setEnabled] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('recall-sound-enabled') !== 'false';
    }
    return true;
  });

  useEffect(() => {
    soundEnabled = enabled;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('recall-sound-enabled', enabled ? 'true' : 'false');
    }
  }, [enabled]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      initAudio(); // Initialize audio context on any click to ensure it's un-suspended
      
      const target = e.target as HTMLElement;
      const interactive = target.closest('button, a, [role="button"], .clickable');
      
      if (interactive && !interactive.closest('[data-no-global-sound]')) {
        playClickSound('default');
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return { enabled, setEnabled, playSound: playClickSound };
};
