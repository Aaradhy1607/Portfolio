import { motion, AnimatePresence } from 'framer-motion';
import { X, Network, Share2, Terminal } from 'lucide-react';
import type { SkillNode } from '../../types';
import { sound } from '../../audio/soundEngine';

interface SkillDetailModalProps {
  skill: SkillNode | null;
  onClose: () => void;
  onSelectConnectedSkill?: (skillId: string) => void;
}

export const SkillDetailModal = ({
  skill,
  onClose,
  onSelectConnectedSkill
}: SkillDetailModalProps) => {
  if (!skill) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative max-w-lg w-full bg-space-900 border border-cyber-cyan/40 rounded-xl p-6 sm:p-7 shadow-cyan-glow text-slate-200"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-3 mb-5">
            <div className="flex items-center space-x-3">
              <span
                className="w-3.5 h-3.5 rounded-full"
                style={{ backgroundColor: skill.color }}
              />
              <div>
                <h3 className="font-orbitron font-bold text-xl text-white">
                  {skill.name}
                </h3>
                <span className="text-[10px] font-mono text-cyber-cyan tracking-wider uppercase">
                  CATEGORY: {skill.category}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1 text-slate-400 hover:text-white rounded bg-slate-800 hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Dossier Body */}
          <div className="space-y-4 text-xs sm:text-sm">
            {/* Why It Matters */}
            <div className="bg-space-800/60 border border-slate-700/60 p-3.5 rounded-lg">
              <div className="text-[10px] font-mono text-cyber-cyan font-bold tracking-widest uppercase mb-1 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                WHY IT MATTERS
              </div>
              <p className="text-slate-300 leading-relaxed font-sans">
                {skill.whyItMatters}
              </p>
            </div>

            {/* Where It Is Used */}
            <div className="bg-space-800/60 border border-slate-700/60 p-3.5 rounded-lg">
              <div className="text-[10px] font-mono text-cyber-amber font-bold tracking-widest uppercase mb-1 flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5" />
                WHERE IT IS USED
              </div>
              <p className="text-slate-300 leading-relaxed font-sans">
                {skill.whereItIsUsed}
              </p>
            </div>

            {/* Related Projects */}
            <div>
              <div className="text-[10px] font-mono text-slate-400 tracking-wider uppercase mb-2">
                RELATED SYSTEMS &amp; DOMAINS
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.relatedProjects.map((p, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-space-800 border border-slate-700 rounded text-xs font-mono text-white"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Connected Nodes */}
            <div>
              <div className="text-[10px] font-mono text-slate-400 tracking-wider uppercase mb-2 flex items-center gap-1">
                <Share2 className="w-3 h-3 text-cyber-cyan" />
                CONNECTED CONSTELLATION EDGES
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.connectedTo.map((edgeId, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (onSelectConnectedSkill) {
                        sound.playClick();
                        onSelectConnectedSkill(edgeId);
                      }
                    }}
                    className="px-2 py-0.5 bg-slate-800/80 hover:bg-cyber-cyan hover:text-space-950 border border-slate-700 rounded text-[11px] font-mono text-slate-300 transition-all"
                  >
                    → {edgeId}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
