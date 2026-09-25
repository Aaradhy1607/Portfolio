import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers, Cpu, Code2, GitFork, ExternalLink, Activity } from 'lucide-react';
import type { ProjectData } from '../../types';
import { sound } from '../../audio/soundEngine';

interface ProjectModal3DProps {
  project: ProjectData | null;
  onClose: () => void;
}

type TabType = 'overview' | 'model' | 'tech' | 'architecture';

export const ProjectModal3D = ({ project, onClose }: ProjectModal3DProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-3xl w-full bg-space-900/95 border border-cyber-cyan/50 rounded-xl p-6 sm:p-8 shadow-cyan-glow overflow-hidden font-sans text-slate-200 max-h-[90vh] flex flex-col"
        >
          {/* Top Status Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-6">
            <div>
              <div className="flex items-center space-x-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white tracking-wider">
                  {project.name}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyber-cyan border border-cyber-cyan/30">
                  {project.holographicStatus}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
                {project.subtitle} • {project.category}
              </p>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progressive Holographic Layer Tabs */}
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 mb-6 overflow-x-auto scrollbar-none font-orbitron text-xs">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('overview');
              }}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded transition-all ${
                activeTab === 'overview'
                  ? 'bg-cyber-cyan text-space-950 font-bold shadow-cyan-glow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>OVERVIEW</span>
            </button>

            {project.systemModel && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('model');
                }}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded transition-all ${
                  activeTab === 'model'
                    ? 'bg-cyber-cyan text-space-950 font-bold shadow-cyan-glow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>MODEL &amp; CAPABILITIES</span>
              </button>
            )}

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('tech');
              }}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded transition-all ${
                activeTab === 'tech'
                  ? 'bg-cyber-cyan text-space-950 font-bold shadow-cyan-glow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>TECH STACK</span>
            </button>

            {project.architectureLayers && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('architecture');
                }}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded transition-all ${
                  activeTab === 'architecture'
                    ? 'bg-cyber-cyan text-space-950 font-bold shadow-cyan-glow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>ARCHITECTURE</span>
              </button>
            )}
          </div>

          {/* Modal Tab Content Area */}
          <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-thin">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-mono font-bold text-cyber-cyan tracking-widest uppercase mb-2">
                    MISSION OBJECTIVE
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                    {project.objective}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-mono font-bold text-cyber-cyan tracking-widest uppercase mb-2">
                    SYSTEM SUMMARY
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {project.description}
                  </p>
                </div>

                {project.metrics && (
                  <div>
                    <h3 className="text-xs font-mono font-bold text-cyber-cyan tracking-widest uppercase mb-3">
                      KEY TELEMETRY METRICS
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.metrics.map((m, i) => (
                        <div
                          key={i}
                          className="bg-space-800/80 border border-slate-700/60 p-3 rounded-lg"
                        >
                          <div className="text-[10px] font-mono text-slate-400 tracking-wider">
                            {m.label}
                          </div>
                          <div className="text-sm font-orbitron font-bold text-cyber-cyan mt-1">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'model' && (
              <div className="space-y-6">
                {project.systemModel && (
                  <div className="bg-space-800/80 border border-cyber-cyan/30 p-4 rounded-lg">
                    <div className="text-xs font-mono text-cyber-cyan">DEPLOYED MODEL ENGINE</div>
                    <div className="text-base font-orbitron font-bold text-white mt-1">
                      {project.systemModel}
                    </div>
                  </div>
                )}

                {project.capabilities && (
                  <div>
                    <h3 className="text-xs font-mono font-bold text-cyber-cyan tracking-widest uppercase mb-3">
                      PLATFORM CAPABILITIES
                    </h3>
                    <div className="space-y-2">
                      {project.capabilities.map((cap, i) => (
                        <div
                          key={i}
                          className="flex items-start space-x-2 text-sm text-slate-200 bg-space-800/50 p-2.5 rounded border border-slate-800"
                        >
                          <span className="text-cyber-cyan mt-0.5">▹</span>
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'tech' && (
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold text-cyber-cyan tracking-widest uppercase">
                  VERIFIED TECHNOLOGY STACK
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-md bg-space-800 border border-slate-700 text-xs font-mono text-slate-200 hover:border-cyber-cyan/50 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'architecture' && project.architectureLayers && (
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold text-cyber-cyan tracking-widest uppercase">
                  SYSTEM ARCHITECTURE LAYERS
                </h3>
                <div className="space-y-3">
                  {project.architectureLayers.map((layer, i) => (
                    <div
                      key={i}
                      className="bg-space-800/70 border border-slate-700/80 p-3.5 rounded-lg"
                    >
                      <div className="flex items-center space-x-2 text-xs font-orbitron font-bold text-cyber-cyan">
                        <span className="w-2 h-2 rounded-full bg-cyber-cyan" />
                        <span>{layer.name}</span>
                      </div>
                      <p className="text-xs text-slate-300 font-sans mt-1.5 leading-relaxed">
                        {layer.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400">
              ORBIT: {project.orbitRadius} AU
            </span>

            <div className="flex items-center space-x-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-orbitron font-semibold text-white rounded transition-colors"
                >
                  <GitFork className="w-3.5 h-3.5" />
                  <span>GITHUB REPO</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
