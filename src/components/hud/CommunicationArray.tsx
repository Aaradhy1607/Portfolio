import { motion, AnimatePresence } from 'framer-motion';
import { X, Radio, Mail, ExternalLink, Send, Code, Globe, UserCheck } from 'lucide-react';
import { PROFILE_DATA } from '../../data/profile';
import { sound } from '../../audio/soundEngine';

interface CommunicationArrayProps {
  onClose: () => void;
}

export const CommunicationArray = ({ onClose }: CommunicationArrayProps) => {
  const comms = [
    {
      id: 'github',
      title: 'GITHUB NETWORK',
      handle: PROFILE_DATA.communications.github.handle,
      label: PROFILE_DATA.communications.github.label,
      url: PROFILE_DATA.communications.github.url,
      icon: Code,
      color: '#00f0ff',
      status: 'TRANSMITTING'
    },
    {
      id: 'email',
      title: 'DIRECT COMMS LINK',
      handle: PROFILE_DATA.communications.email.address,
      label: PROFILE_DATA.communications.email.label,
      url: PROFILE_DATA.communications.email.url,
      icon: Mail,
      color: '#f59e0b',
      status: 'FREQUENCY OPEN'
    },
    {
      id: 'linkedin',
      title: 'LINKEDIN PROTOCOL',
      handle: PROFILE_DATA.communications.linkedin.name,
      label: PROFILE_DATA.communications.linkedin.label,
      url: PROFILE_DATA.communications.linkedin.url,
      icon: UserCheck,
      color: '#3b82f6',
      status: 'SYNCHRONIZED'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative max-w-xl w-full bg-space-900 border border-cyber-cyan/40 rounded-xl p-6 sm:p-8 shadow-cyan-glow text-slate-200 font-sans"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald">
                <Radio className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h2 className="font-orbitron font-bold text-xl sm:text-2xl text-white tracking-wider">
                  COMMUNICATION ARRAY
                </h2>
                <div className="text-xs font-mono text-slate-400 mt-0.5">
                  SUB-SPACE TRANSMISSION TERMINAL
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

          {/* Communication Channels */}
          <div className="space-y-4">
            {comms.map((ch) => {
              const Icon = ch.icon;
              return (
                <div
                  key={ch.id}
                  className="bg-space-800/70 border border-slate-700/80 hover:border-cyber-cyan/60 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="p-2.5 rounded-lg bg-space-950 border"
                      style={{ borderColor: ch.color, color: ch.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">{ch.title}</div>
                      <div className="font-orbitron font-bold text-sm sm:text-base text-white mt-0.5">
                        {ch.handle}
                      </div>
                      <div className="text-[10px] font-mono text-cyber-cyan mt-0.5">
                        {ch.status}
                      </div>
                    </div>
                  </div>

                  <a
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                    className="px-4 py-2 bg-slate-800 hover:bg-cyber-cyan hover:text-space-950 text-white text-xs font-orbitron font-bold tracking-wider rounded transition-all flex items-center justify-center space-x-2 border border-slate-700 hover:border-cyber-cyan shadow-sm"
                  >
                    <span>ESTABLISH CONNECTION</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })}
          </div>

          {/* Transmission Status Footer */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center space-x-2">
              <Send className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>FREQUENCY: ENCRYPTED // READY</span>
            </div>
            <div className="flex items-center space-x-1 text-cyber-emerald text-[11px]">
              <Globe className="w-3.5 h-3.5" />
              <span>ALL CHANNELS ACTIVE</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
