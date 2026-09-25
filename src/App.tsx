import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Sparkles } from 'lucide-react';
import type { NavigationTarget, ProjectData, SkillNode, TimelineEra } from './types';
import { PROJECTS_DATA } from './data/projects';
import { SKILL_NODES } from './data/skills';
import { SceneContainer } from './components/canvas/SceneContainer';
import { SciFiCursor } from './components/cursor/SciFiCursor';
import { BootSequence } from './components/hud/BootSequence';
import { NavigationHUD } from './components/hud/NavigationHUD';
import { ProjectModal3D } from './components/hud/ProjectModal3D';
import { SkillDetailModal } from './components/hud/SkillDetailModal';
import { MissionLogModal } from './components/hud/MissionLogModal';
import { IdentityModal } from './components/hud/IdentityModal';
import { CommunicationArray } from './components/hud/CommunicationArray';
import { TemporalTimelineHUD } from './components/hud/TemporalTimelineHUD';
import { AudioControls } from './components/hud/AudioControls';
import { sound } from './audio/soundEngine';

export function App() {
  const [hasBooted, setHasBooted] = useState(false);
  const [navTarget, setNavTarget] = useState<NavigationTarget>('cockpit');
  const [timelineEra, setTimelineEra] = useState<TimelineEra>('present');
  const [isWarping, setIsWarping] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);
  const [showAnomalyAlert, setShowAnomalyAlert] = useState(false);
  const [webGlSupported, setWebGlSupported] = useState(true);

  // Check WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlSupported(false);
      }
    } catch {
      setWebGlSupported(false);
    }
  }, []);

  const triggerWarp = useCallback(() => {
    sound.playWarp();
    setIsWarping(true);
    setTimeout(() => {
      setIsWarping(false);
    }, 1800);
  }, []);

  const handleNavigate = useCallback(
    (target: NavigationTarget) => {
      sound.playClick();
      setNavTarget(target);

      // Map planetary targets
      if (target === 'planet_vaayu') {
        setSelectedProject(PROJECTS_DATA.find((p) => p.id === 'planet_vaayu') || null);
      } else if (target === 'planet_crime_radar') {
        setSelectedProject(PROJECTS_DATA.find((p) => p.id === 'planet_crime_radar') || null);
      } else if (target === 'planet_ixora') {
        setSelectedProject(PROJECTS_DATA.find((p) => p.id === 'planet_ixora') || null);
      } else if (target === 'planet_finavria') {
        setSelectedProject(PROJECTS_DATA.find((p) => p.id === 'planet_finavria') || null);
      }
    },
    []
  );

  // Keyboard Shortcuts Handler
  useEffect(() => {
    if (!hasBooted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture when typing in inputs if any
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case 'h':
          handleNavigate('cockpit');
          break;
        case 't':
          handleNavigate('temporal_core');
          break;
        case 'p':
          handleNavigate('project_system');
          break;
        case 's':
          handleNavigate('skill_constellation');
          break;
        case 'm':
          handleNavigate('mission_log');
          break;
        case 'i':
          handleNavigate('identity');
          break;
        case 'c':
          handleNavigate('communication');
          break;
        case ' ':
          e.preventDefault();
          triggerWarp();
          break;
        case 'escape':
          setSelectedProject(null);
          setSelectedSkill(null);
          setShowAnomalyAlert(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasBooted, handleNavigate, triggerWarp]);

  // Handle Scroll to traverse between core sectors
  useEffect(() => {
    if (!hasBooted) return;

    let lastScrollTime = 0;
    const targets: NavigationTarget[] = [
      'cockpit',
      'temporal_core',
      'project_system',
      'skill_constellation',
      'mission_log',
      'identity',
      'communication'
    ];

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime < 700) return; // debounce cinematic transitions

      // If modal open, allow normal scrolling inside modal
      if (selectedProject || selectedSkill) return;

      lastScrollTime = now;
      const currentIndex = targets.indexOf(navTarget);

      if (e.deltaY > 30) {
        // Scroll Down -> Next Sector
        const nextIndex = (currentIndex + 1) % targets.length;
        handleNavigate(targets[nextIndex]);
      } else if (e.deltaY < -30) {
        // Scroll Up -> Previous Sector
        const prevIndex = (currentIndex - 1 + targets.length) % targets.length;
        handleNavigate(targets[prevIndex]);
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [hasBooted, navTarget, selectedProject, selectedSkill, handleNavigate]);

  const handleSelectProject = (project: ProjectData) => {
    setSelectedProject(project);
    setNavTarget(project.id as NavigationTarget);
  };

  const handleSelectSkill = (skill: SkillNode) => {
    setSelectedSkill(skill);
  };

  const handleSelectConnectedSkill = (skillId: string) => {
    const found = SKILL_NODES.find((s) => s.id === skillId);
    if (found) {
      setSelectedSkill(found);
    }
  };

  const handleTriggerAnomaly = () => {
    setShowAnomalyAlert(true);
  };

  if (!webGlSupported) {
    return (
      <div className="fixed inset-0 bg-space-950 flex flex-col items-center justify-center p-6 text-center text-slate-200 font-mono">
        <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />
        <h1 className="font-orbitron text-xl font-bold text-white mb-2">
          3D EXPERIENCE DEGRADED // WEBGL NOT DETECTED
        </h1>
        <p className="text-sm text-slate-400 max-w-md mb-6 font-sans">
          Switching to low-power diagnostic mode. Aaradhy Sharma's profile, projects, and mission logs remain accessible.
        </p>
        <button
          onClick={() => setWebGlSupported(true)}
          className="px-6 py-2.5 bg-cyber-cyan text-space-950 font-orbitron font-bold text-xs rounded"
        >
          RETRY GRAPHICS INITIALIZATION
        </button>
      </div>
    );
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-space-950 select-none">
      {/* Custom Sci-Fi Targeting Cursor */}
      <SciFiCursor />

      {/* Opening Cinematic Boot Sequence */}
      {!hasBooted && (
        <BootSequence
          onComplete={() => {
            setHasBooted(true);
            triggerWarp();
          }}
        />
      )}

      {/* 3D WebGL Canvas Scene */}
      <SceneContainer
        navTarget={navTarget}
        timelineEra={timelineEra}
        isWarping={isWarping}
        onSelectProject={handleSelectProject}
        onSelectSkill={handleSelectSkill}
        onSelectEra={setTimelineEra}
        onTriggerAnomaly={handleTriggerAnomaly}
        selectedProjectId={selectedProject?.id}
        selectedSkillId={selectedSkill?.id}
      />

      {/* HUD Overlay Interface (Visible after boot) */}
      {hasBooted && (
        <>
          <NavigationHUD
            currentTarget={navTarget}
            currentEra={timelineEra}
            onNavigate={handleNavigate}
            onSelectEra={setTimelineEra}
            onTriggerWarp={triggerWarp}
          />

          <AudioControls />

          {/* Temporal Core Timeline Information Panel */}
          {navTarget === 'temporal_core' && (
            <TemporalTimelineHUD
              era={timelineEra}
              onSelectEra={setTimelineEra}
            />
          )}

          {/* Interactive Modals and Holographic Inspections */}
          <ProjectModal3D
            project={selectedProject}
            onClose={() => {
              setSelectedProject(null);
              setNavTarget('project_system');
            }}
          />

          <SkillDetailModal
            skill={selectedSkill}
            onClose={() => setSelectedSkill(null)}
            onSelectConnectedSkill={handleSelectConnectedSkill}
          />

          {navTarget === 'mission_log' && (
            <MissionLogModal onClose={() => setNavTarget('cockpit')} />
          )}

          {navTarget === 'identity' && (
            <IdentityModal onClose={() => setNavTarget('cockpit')} />
          )}

          {navTarget === 'communication' && (
            <CommunicationArray onClose={() => setNavTarget('cockpit')} />
          )}

          {/* Easter Egg: Temporal Core Anomaly Sequence */}
          <AnimatePresence>
            {showAnomalyAlert && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-red-950/40 backdrop-blur-md">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="max-w-md w-full bg-space-900 border-2 border-red-500 rounded-xl p-6 shadow-2xl text-slate-100 font-mono"
                >
                  <div className="flex items-center space-x-3 text-red-400 mb-4">
                    <AlertTriangle className="w-8 h-8 animate-bounce" />
                    <div>
                      <div className="font-orbitron font-bold text-lg text-white">
                        TEMPORAL CORE INSTABILITY
                      </div>
                      <div className="text-xs text-red-400">
                        ANOMALY DETECTED // RESONANCE SPIKE
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                    Multiple rapid singularity discharges triggered a brief tachyon fluctuation. System telemetry recalibrating to safe operational frequency.
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      DAMPENERS ACTIVE
                    </span>
                    <button
                      onClick={() => {
                        sound.playConfirm();
                        setShowAnomalyAlert(false);
                      }}
                      className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white font-orbitron font-bold rounded text-xs transition-colors"
                    >
                      STABILIZE CORE
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </main>
  );
}

export default App;
