import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

export const AudioControls = () => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  const handleToggle = () => {
    const newMuted = sound.toggleMute();
    setIsMuted(newMuted);
  };

  return (
    <div className="pointer-events-auto fixed top-4 right-4 sm:top-6 sm:right-6 z-40">
      <button
        onClick={handleToggle}
        onMouseEnter={() => sound.playHover()}
        title={isMuted ? 'Unmute Ambient Sci-Fi Audio' : 'Mute Ambient Audio'}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all backdrop-blur-md text-xs font-orbitron font-semibold ${
          isMuted
            ? 'bg-space-900/80 border-slate-700 text-slate-400 hover:text-white'
            : 'bg-space-900/80 border-cyber-cyan text-cyber-cyan shadow-cyan-glow'
        }`}
      >
        {isMuted ? (
          <>
            <VolumeX className="w-4 h-4 text-slate-400" />
            <span className="hidden md:inline">AUDIO: OFF</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 text-cyber-cyan animate-pulse" />
            <span className="hidden md:inline">AUDIO: ON</span>
            {/* Animated Equalizer Sound Bars */}
            <div className="flex items-end space-x-0.5 h-3 ml-1">
              <span className="w-0.5 bg-cyber-cyan animate-bounce h-2" />
              <span className="w-0.5 bg-cyber-cyan animate-bounce h-3 delay-75" />
              <span className="w-0.5 bg-cyber-cyan animate-bounce h-1.5 delay-150" />
            </div>
          </>
        )}
      </button>
    </div>
  );
};
