import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ShieldCheck, Terminal } from 'lucide-react';
import type { TimelineEra } from '../../types';
import { TIMELINE_DATA } from '../../data/timeline';
import { sound } from '../../audio/soundEngine';

interface TemporalTimelineHUDProps {
  era: TimelineEra;
  onSelectEra: (era: TimelineEra) => void;
}

export const TemporalTimelineHUD = ({
  era,
  onSelectEra
}: TemporalTimelineHUDProps) => {
  const data = TIMELINE_DATA[era];

  const eraColors = {
    past: {
      border: 'border-amber-500/50',
      text: 'text-amber-400',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      accent: 'bg-amber-500'
    },
    present: {
      border: 'border-cyber-cyan/50',
      text: 'text-cyber-cyan',
      badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      accent: 'bg-cyber-cyan'
    },
    future: {
      border: 'border-emerald-500/50',
      text: 'text-emerald-400',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      accent: 'bg-emerald-500'
    }
  }[era];

  return (
    <div className="pointer-events-none fixed bottom-24 sm:bottom-28 inset-x-0 z-40 flex justify-center px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={era}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className={`pointer-events-auto max-w-2xl w-full bg-space-900/90 border ${eraColors.border} rounded-xl p-5 sm:p-6 shadow-2xl backdrop-blur-md text-slate-200 font-sans`}
        >
          {/* Era Header & Temporal Navigator */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
            <div>
              <div className="flex items-center space-x-2">
                <Clock className={`w-4 h-4 ${eraColors.text}`} />
                <h3 className="font-orbitron font-bold text-base sm:text-lg text-white">
                  {data.title}
                </h3>
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                {data.coordinates} • {data.subtitle}
              </div>
            </div>

            {/* Era Switcher Controls */}
            <div className="flex items-center space-x-1.5 bg-space-950 p-1 rounded-lg border border-slate-800">
              {(['past', 'present', 'future'] as TimelineEra[]).map((e) => (
                <button
                  key={e}
                  onClick={() => {
                    sound.playClick();
                    onSelectEra(e);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`px-3 py-1 rounded text-[10px] font-orbitron font-bold tracking-wider uppercase transition-all ${
                    era === e
                      ? `${eraColors.accent} text-space-950 shadow-sm`
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-4">
            {data.description}
          </p>

          {/* Highlights */}
          <div className="space-y-2 mb-4">
            {data.highlights.map((h, i) => (
              <div
                key={i}
                className="flex items-start space-x-2 text-xs text-slate-200 bg-space-800/60 p-2.5 rounded border border-slate-800/80"
              >
                <ShieldCheck className={`w-3.5 h-3.5 ${eraColors.text} mt-0.5 shrink-0`} />
                <span>{h}</span>
              </div>
            ))}
          </div>

          {/* Philosophy / Motto for Future */}
          {data.philosophy && (
            <div className="bg-space-950/80 p-3 rounded-lg border border-slate-800 mb-4">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1.5">
                UNDERLYING ENGINEERING PHILOSOPHY
              </span>
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-emerald-400 font-bold">
                {data.philosophy.map((step, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                      {step}
                    </span>
                    {idx < data.philosophy!.length - 1 && (
                      <span className="text-slate-500 mx-1">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quote Footer */}
          {data.quote && (
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center space-x-1.5">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                <span className="italic">"{data.quote}"</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded border ${eraColors.badge}`}>
                {data.statusBadge}
              </span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
