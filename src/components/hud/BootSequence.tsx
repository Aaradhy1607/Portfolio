import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../../audio/soundEngine';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  const terminalScript = [
    "INITIALIZING AARADHY.EXE [CORE-KERNEL v4.2.9]",
    "IDENTITY .......... AARADHY SHARMA",
    "FIELD ............. ARTIFICIAL INTELLIGENCE & MACHINE LEARNING",
    "CORE PHILOSOPHY ... 'I LEARN TECHNOLOGY BY BUILDING WITH IT'",
    "ACADEMIC ARCHIVE .. USAR (B.TECH AI/ML '29 // CGPA > 9.0)",
    "TEMPORAL CORE ..... STABLE // FREQ: 1420.405 MHz",
    "PROJECT ORBITS .... 4 PLANETARY SYSTEMS MAPPED",
    "SKILL CONSTELLATION CONNECTED",
    "NAVIGATION HUB .... ONLINE // COCKPIT READY",
    "SYSTEM STATUS ..... 100% OPERATIONAL"
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < terminalScript.length) {
        setLines((prev) => [...prev, terminalScript[currentLine]]);
        sound.playHover();
        currentLine++;
      } else {
        clearInterval(interval);
        setIsReady(true);
      }
    }, 180);

    return () => clearInterval(interval);
  }, []);

  const handleLaunch = () => {
    sound.playWarp();
    sound.toggleMute(); // initialize ambient audio
    setIsLaunching(true);
    setTimeout(() => {
      onComplete();
    }, 1800);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
        className="fixed inset-0 z-50 bg-space-950 flex flex-col items-center justify-center p-6 text-slate-100 font-mono select-none"
      >
        {/* Subtle Ambient Cosmic Background Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

        <div className="relative z-10 max-w-xl w-full bg-space-900/90 border border-cyber-cyan/40 p-8 rounded-lg shadow-cyan-glow backdrop-blur-md">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-cyber-cyan/30 pb-3 mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-cyber-cyan" />
              <span className="text-xs text-cyber-cyan tracking-widest font-orbitron ml-2">
                AARADHY_UNIVERSE_BOOT_LOADER
              </span>
            </div>
            <span className="text-[10px] text-slate-400">SEC-00</span>
          </div>

          {/* Terminal Console Output */}
          <div className="space-y-2 min-h-[260px] text-xs sm:text-sm">
            {lines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${
                  idx === 0
                    ? 'text-cyber-cyan font-bold font-orbitron'
                    : idx === 1
                    ? 'text-white font-semibold'
                    : 'text-slate-300'
                }`}
              >
                <span className="text-cyber-cyan mr-2">&gt;</span>
                {line}
              </motion.div>
            ))}
            {!isReady && (
              <div className="flex items-center space-x-1 text-cyber-cyan">
                <span>&gt;</span>
                <span className="animate-pulse">_</span>
              </div>
            )}
          </div>

          {/* Launch Control */}
          <div className="mt-8 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[11px] text-slate-400 font-sans tracking-wide">
              AUTHENTICATION: <span className="text-cyber-emerald">VERIFIED</span>
            </div>

            {isReady && (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLaunch}
                disabled={isLaunching}
                className="w-full sm:w-auto px-6 py-3 bg-cyber-cyan text-space-950 font-orbitron font-bold text-xs sm:text-sm tracking-wider rounded shadow-cyan-glow hover:bg-cyber-neon transition-all flex items-center justify-center space-x-2"
              >
                <span>{isLaunching ? 'ENTERING HYPERSPACE...' : 'ENTER THE UNIVERSE'}</span>
                <span className="text-lg">→</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Cinematic Subtitle */}
        <div className="mt-6 text-center text-xs text-slate-400 font-sans tracking-widest uppercase">
          A Cinematic 3D Journey Through Space, Time and Technology
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
