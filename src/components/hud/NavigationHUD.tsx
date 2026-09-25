import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Globe,
  Share2,
  Clock,
  Radio,
  FileText,
  User,
  Zap,
  HelpCircle,
  X
} from 'lucide-react';
import type { NavigationTarget, TimelineEra } from '../../types';
import { PROFILE_DATA } from '../../data/profile';
import { sound } from '../../audio/soundEngine';

interface NavigationHUDProps {
  currentTarget: NavigationTarget;
  currentEra: TimelineEra;
  onNavigate: (target: NavigationTarget) => void;
  onSelectEra: (era: TimelineEra) => void;
  onTriggerWarp: () => void;
}

export const NavigationHUD = ({
  currentTarget,
  currentEra,
  onNavigate,
  onSelectEra,
  onTriggerWarp
}: NavigationHUDProps) => {
  const [showHelp, setShowHelp] = useState(false);

  const navButtons = [
    { id: 'cockpit' as NavigationTarget, label: 'SPACESHIP HUB', icon: Compass, shortcut: 'H' },
    { id: 'temporal_core' as NavigationTarget, label: 'TIME MACHINE', icon: Clock, shortcut: 'T' },
    { id: 'project_system' as NavigationTarget, label: 'PROJECT ORBITS', icon: Globe, shortcut: 'P' },
    { id: 'skill_constellation' as NavigationTarget, label: 'SKILL CONSTELLATION', icon: Share2, shortcut: 'S' },
    { id: 'mission_log' as NavigationTarget, label: 'MISSION LOG', icon: FileText, shortcut: 'M' },
    { id: 'identity' as NavigationTarget, label: 'IDENTITY CORE', icon: User, shortcut: 'I' },
    { id: 'communication' as NavigationTarget, label: 'COMMUNICATION', icon: Radio, shortcut: 'C' }
  ];

  return (
    <header className="pointer-events-none fixed inset-0 z-40 flex flex-col justify-between p-4 sm:p-6 text-slate-200 select-none">
      {/* Top Header HUD Bar */}
      <div className="flex items-start justify-between">
        {/* Callsign & Identity Badge */}
        <div className="pointer-events-auto flex items-center space-x-3 bg-space-900/80 border border-cyber-cyan/30 px-4 py-2.5 rounded backdrop-blur-md shadow-cyan-glow">
          <div className="w-2.5 h-2.5 rounded-full bg-cyber-cyan animate-ping" />
          <div>
            <div className="font-orbitron font-bold text-xs sm:text-sm tracking-wider text-white flex items-center gap-2">
              <span>{PROFILE_DATA.name.toUpperCase()}</span>
              <span className="text-[10px] text-cyber-cyan font-mono px-1.5 py-0.5 bg-cyber-cyan/10 rounded border border-cyber-cyan/30">
                USAR '29
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono tracking-widest">
              AI/ML ENGINEERING // CGPA &gt; 9.0
            </div>
          </div>
        </div>

        {/* Temporal Ring Mode Selector */}
        <div className="pointer-events-auto hidden sm:flex items-center space-x-1 bg-space-900/80 border border-slate-700/60 p-1.5 rounded backdrop-blur-md">
          {(['past', 'present', 'future'] as TimelineEra[]).map((era) => (
            <button
              key={era}
              onClick={() => {
                sound.playClick();
                onSelectEra(era);
                onNavigate('temporal_core');
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-3 py-1 rounded font-orbitron text-[11px] font-semibold tracking-wider transition-all ${
                currentEra === era
                  ? era === 'past'
                    ? 'bg-amber-500 text-space-950 shadow-amber-glow'
                    : era === 'present'
                    ? 'bg-cyber-cyan text-space-950 shadow-cyan-glow'
                    : 'bg-cyber-emerald text-space-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {era.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Diagnostic Actions */}
        <div className="pointer-events-auto flex items-center space-x-2">
          {/* Hyperspace Warp Jump Button */}
          <button
            onClick={() => {
              sound.playClick();
              onTriggerWarp();
            }}
            onMouseEnter={() => sound.playHover()}
            title="Trigger Hyperspace Warp"
            className="flex items-center space-x-1.5 bg-space-900/80 hover:bg-cyber-cyan hover:text-space-950 border border-cyber-cyan/40 px-3 py-2 rounded text-xs font-orbitron font-semibold text-cyber-cyan transition-all shadow-cyan-glow"
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="hidden md:inline">WARP JUMP</span>
          </button>

          {/* Help Overlay Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setShowHelp(!showHelp);
            }}
            onMouseEnter={() => sound.playHover()}
            className="bg-space-900/80 hover:bg-slate-800 border border-slate-700 p-2 rounded text-slate-300 transition-all"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Main Navigation Deck HUD */}
      <nav aria-label="Main Navigation" className="flex flex-col items-center gap-3">
        {/* Navigation Tabs */}
        <div className="pointer-events-auto max-w-full overflow-x-auto scrollbar-none flex items-center space-x-1.5 sm:space-x-2 bg-space-900/90 border border-cyber-cyan/30 p-2 rounded-lg backdrop-blur-lg shadow-cyan-glow">
          {navButtons.map((btn) => {
            const Icon = btn.icon;
            const isActive = currentTarget === btn.id;

            return (
              <button
                key={btn.id}
                onClick={() => {
                  sound.playClick();
                  onNavigate(btn.id);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`flex items-center space-x-2 px-3 py-2 rounded text-xs font-orbitron font-medium tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-cyber-cyan text-space-950 font-bold shadow-cyan-glow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{btn.label}</span>
                <span className="hidden lg:inline text-[9px] opacity-60 font-mono bg-black/30 px-1 py-0.5 rounded">
                  [{btn.shortcut}]
                </span>
              </button>
            );
          })}
        </div>

        {/* Minimal Navigation Hint */}
        <div className="text-[10px] text-slate-400 font-mono tracking-widest hidden sm:block">
          NAVIGATE VIA HUD • PRESS [H] FOR KEYMAP • 3D ROTATION ENABLED
        </div>
      </nav>

      {/* Keyboard Shortcuts Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-md w-full bg-space-900 border border-cyber-cyan/40 p-6 rounded-lg shadow-cyan-glow"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="font-orbitron text-sm font-bold text-cyber-cyan flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  NAVIGATION TELEMETRY &amp; SHORTCUTS
                </div>
                <button
                  onClick={() => setShowHelp(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs font-mono text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>[ H ] Cockpit Navigation Hub</span>
                  <span className="text-cyber-cyan">Spaceship Bridge</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>[ T ] Temporal Core</span>
                  <span className="text-cyber-amber">Time Machine</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>[ P ] Project Orbits</span>
                  <span className="text-cyber-cyan">Planetary Systems</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>[ S ] Skill Constellation</span>
                  <span className="text-cyber-violet">3D Knowledge Graph</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>[ M ] Mission Log</span>
                  <span className="text-slate-400">Hackathon Archives</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>[ I ] Identity Core</span>
                  <span className="text-white">Profile &amp; Philosophy</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>[ C ] Communication Array</span>
                  <span className="text-cyber-emerald">Transmissions</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>[ Space ] Hyperspace Jump</span>
                  <span className="text-cyber-neon">Warp Drive</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>[ Drag / Mouse ] Universe Orbit</span>
                  <span className="text-slate-400">Cinematic Parallax</span>
                </div>
              </div>

              <button
                onClick={() => setShowHelp(false)}
                className="mt-6 w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-orbitron text-xs rounded tracking-wider"
              >
                CLOSE CONSOLE
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
