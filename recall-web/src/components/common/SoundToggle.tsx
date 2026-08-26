import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useGlobalClickSound } from '../../hooks/useGlobalClickSound';

export const SoundToggle: React.FC = () => {
  const { enabled, setEnabled } = useGlobalClickSound();

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className="fixed bottom-6 right-6 z-50 p-3 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full shadow-sm text-slate-500 hover:text-[#25364A] hover:bg-white transition-all focus:outline-none"
      aria-label={enabled ? 'Disable sound' : 'Enable sound'}
      title={enabled ? 'Disable sound' : 'Enable sound'}
      data-no-global-sound="true"
    >
      {enabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
    </button>
  );
};
