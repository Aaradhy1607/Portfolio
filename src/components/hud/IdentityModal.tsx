import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Cpu, GraduationCap, Award, Compass } from 'lucide-react';
import { PROFILE_DATA } from '../../data/profile';
import { sound } from '../../audio/soundEngine';

interface IdentityModalProps {
  onClose: () => void;
}

export const IdentityModal = ({ onClose }: IdentityModalProps) => {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative max-w-2xl w-full bg-space-900 border border-cyber-cyan/40 rounded-xl p-6 sm:p-8 shadow-cyan-glow text-slate-200 font-sans"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-orbitron font-extrabold text-2xl text-white tracking-wider">
                  {PROFILE_DATA.name.toUpperCase()}
                </h2>
                <div className="text-xs font-mono text-cyber-cyan flex items-center gap-2 mt-0.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{PROFILE_DATA.field}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="space-y-6 text-sm">
            {/* Identity Statement */}
            <div className="bg-space-800/80 border-l-4 border-cyber-cyan p-4 rounded-r-lg">
              <span className="text-[10px] font-mono text-cyber-cyan uppercase tracking-widest block mb-1">
                IDENTITY STATEMENT
              </span>
              <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans font-medium">
                "{PROFILE_DATA.identityStatement}"
              </p>
            </div>

            {/* Core Philosophy */}
            <div className="bg-space-800/60 border border-slate-700/70 p-4 rounded-lg">
              <span className="text-[10px] font-mono text-cyber-amber uppercase tracking-widest block mb-1">
                CORE PHILOSOPHY
              </span>
              <div className="text-base sm:text-lg font-orbitron font-bold text-white">
                "{PROFILE_DATA.corePhilosophy}"
              </div>

              {/* Iterative Builder Loop */}
              <div className="mt-4 pt-3 border-t border-slate-700/60">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  ITERATIVE ENGINEERING LOOP
                </span>
                <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                  {PROFILE_DATA.underlyingMotto.map((step, idx) => (
                    <div key={idx} className="flex items-center">
                      <span className="px-2.5 py-1 rounded bg-space-950 border border-cyber-cyan/30 text-cyber-cyan font-bold">
                        {step}
                      </span>
                      {idx < PROFILE_DATA.underlyingMotto.length - 1 && (
                        <span className="text-slate-500 mx-1">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Academic Foundation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-space-800/50 border border-slate-700/60 p-3.5 rounded-lg flex items-start space-x-3">
                <GraduationCap className="w-5 h-5 text-cyber-cyan mt-0.5" />
                <div>
                  <div className="text-[10px] font-mono text-slate-400">INSTITUTION</div>
                  <div className="text-xs font-bold text-white font-sans mt-0.5">
                    {PROFILE_DATA.institution}
                  </div>
                  <div className="text-[11px] font-mono text-cyber-cyan mt-1">
                    Graduation: {PROFILE_DATA.graduationYear}
                  </div>
                </div>
              </div>

              <div className="bg-space-800/50 border border-slate-700/60 p-3.5 rounded-lg flex items-start space-x-3">
                <Award className="w-5 h-5 text-cyber-amber mt-0.5" />
                <div>
                  <div className="text-[10px] font-mono text-slate-400">ACADEMIC RECORD</div>
                  <div className="text-xs font-bold text-cyber-amber font-sans mt-0.5">
                    {PROFILE_DATA.academics.cgpaDescription}
                  </div>
                  <div className="text-[11px] text-slate-300 font-sans mt-1">
                    {PROFILE_DATA.academics.standing}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Telemetry */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>SECTOR: ACTIVE UNIVERSE</span>
            <div className="flex items-center space-x-2 text-cyber-cyan">
              <Compass className="w-3.5 h-3.5" />
              <span>STABLE ORBIT</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
