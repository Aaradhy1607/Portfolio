import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, CheckCircle2, Award, Terminal } from 'lucide-react';
import { MISSION_LOGS } from '../../data/missions';
import { sound } from '../../audio/soundEngine';

interface MissionLogModalProps {
  onClose: () => void;
}

export const MissionLogModal = ({ onClose }: MissionLogModalProps) => {
  const [filter, setFilter] = useState<'ALL' | 'HACKATHON' | 'ACADEMIC'>('ALL');

  const filteredLogs = MISSION_LOGS.filter((log) => {
    if (filter === 'ALL') return true;
    return log.category === filter;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative max-w-3xl w-full bg-space-900 border border-cyber-cyan/40 rounded-xl p-6 sm:p-8 shadow-cyan-glow text-slate-200 max-h-[85vh] flex flex-col font-sans"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-6">
            <div>
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-cyber-cyan" />
                <h2 className="font-orbitron font-bold text-xl sm:text-2xl text-white tracking-wider">
                  MISSION LOG // FLIGHT DOSSIER
                </h2>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-1">
                TACTICAL RECORDS • HACKATHONS • ACADEMIC MILESTONES
              </p>
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

          {/* Filter Bar */}
          <div className="flex items-center space-x-2 mb-6 font-orbitron text-xs">
            {(['ALL', 'HACKATHON', 'ACADEMIC'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick();
                  setFilter(cat);
                }}
                className={`px-3 py-1.5 rounded transition-all ${
                  filter === cat
                    ? 'bg-cyber-cyan text-space-950 font-bold shadow-cyan-glow'
                    : 'bg-space-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Logs List */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="bg-space-800/70 border border-slate-700/80 hover:border-cyber-cyan/50 p-4 rounded-lg transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/50 pb-2 mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-cyber-cyan">
                      {log.missionCode}
                    </span>
                    <h3 className="font-orbitron font-bold text-sm sm:text-base text-white">
                      {log.title}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1 ${
                        log.status === 'IN_ORBIT'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      {log.status === 'IN_ORBIT' ? (
                        <Award className="w-3 h-3" />
                      ) : (
                        <CheckCircle2 className="w-3 h-3" />
                      )}
                      <span>{log.status}</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div>
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block">
                      OBJECTIVE
                    </span>
                    <p className="text-slate-200 font-sans mt-0.5">{log.objective}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block">
                      CONTEXT &amp; EXECUTION
                    </span>
                    <p className="text-slate-300 font-sans mt-0.5">{log.context}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Philosophy Note */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center space-x-2 text-[11px] font-mono text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>LEARN BY BUILDING • COMPETE UNDER CONSTRAINTS • SHIP IMPACTFUL CODE</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
