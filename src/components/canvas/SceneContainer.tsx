import { Canvas } from '@react-three/fiber';
import { CameraController } from './CameraController';
import { StarField } from './StarField';
import { Nebula } from './Nebula';
import { Wormhole } from './Wormhole';
import { SpaceshipCockpit } from './SpaceshipCockpit';
import { ProjectPlanets } from './ProjectPlanets';
import { SkillConstellation } from './SkillConstellation';
import type { NavigationTarget, ProjectData, SkillNode, TimelineEra } from '../../types';

interface SceneContainerProps {
  navTarget: NavigationTarget;
  timelineEra: TimelineEra;
  isWarping: boolean;
  onSelectProject: (project: ProjectData) => void;
  onSelectSkill: (skill: SkillNode) => void;
  onSelectEra: (era: TimelineEra) => void;
  onTriggerAnomaly?: () => void;
  selectedProjectId?: string | null;
  selectedSkillId?: string | null;
}

export const SceneContainer = ({
  navTarget,
  timelineEra,
  isWarping,
  onSelectProject,
  onSelectSkill,
  onSelectEra,
  onTriggerAnomaly,
  selectedProjectId,
  selectedSkillId
}: SceneContainerProps) => {
  const showCockpit = navTarget === 'cockpit' || navTarget === 'identity' || navTarget === 'temporal_core' || navTarget === 'communication' || navTarget === 'mission_log';
  const showSkillConstellation = navTarget === 'skill_constellation';
  const showProjectPlanets = navTarget === 'project_system' || navTarget.startsWith('planet_') || navTarget === 'universe';

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={["#02040a"]} />

        {/* Global Cinematic Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 20, 15]} intensity={1.2} color="#e0f2fe" />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#818cf8" />

        {/* Smooth Camera Controller */}
        <CameraController target={navTarget} isWarping={isWarping} />

        {/* Procedural Deep Space Cosmos */}
        <StarField isWarping={isWarping} />
        <Nebula era={timelineEra} />
        <Wormhole active={isWarping} />

        {/* Spaceship Bridge & Temporal Core Hub */}
        <SpaceshipCockpit
          era={timelineEra}
          onSelectEra={onSelectEra}
          onTriggerAnomaly={onTriggerAnomaly}
          visible={showCockpit}
        />

        {/* Project Planetary System */}
        {showProjectPlanets && (
          <ProjectPlanets
            onSelectProject={onSelectProject}
            activeProjectId={selectedProjectId}
          />
        )}

        {/* 3D Skill Constellation Graph */}
        <SkillConstellation
          onSelectSkill={onSelectSkill}
          activeSkillId={selectedSkillId}
          visible={showSkillConstellation}
        />
      </Canvas>
    </div>
  );
};
