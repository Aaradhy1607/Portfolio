import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PROJECTS_DATA } from '../../data/projects';
import type { ProjectData } from '../../types';
import { sound } from '../../audio/soundEngine';

interface ProjectPlanetsProps {
  onSelectProject: (project: ProjectData) => void;
  activeProjectId?: string | null;
}

export const ProjectPlanets = ({ onSelectProject, activeProjectId }: ProjectPlanetsProps) => {
  const systemRef = useRef<THREE.Group>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

  useFrame((_, delta) => {
    if (!systemRef.current) return;
    // Slow overall orbital rotation
    systemRef.current.rotation.y += delta * 0.04;
  });

  return (
    <group ref={systemRef} position={[0, 0, -35]}>
      {/* Central Stellar Core of the Project Planetary System */}
      <mesh>
        <sphereGeometry args={[3.2, 32, 32]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#38bdf8"
          emissiveIntensity={3.0}
        />
      </mesh>

      {/* Stellar Corona Glow */}
      <mesh scale={1.25}>
        <sphereGeometry args={[3.2, 16, 16]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          wireframe
        />
      </mesh>
      <pointLight color="#00f0ff" intensity={4.5} distance={120} />

      {/* Render Individual Project Planets and Orbits */}
      {PROJECTS_DATA.map((project, index) => {
        return (
          <PlanetInstance
            key={project.id}
            project={project}
            index={index}
            isHovered={hoveredPlanet === project.id}
            isSelected={activeProjectId === project.id}
            onHover={(id) => {
              setHoveredPlanet(id);
              if (id) sound.playHover();
            }}
            onSelect={() => {
              sound.playClick();
              onSelectProject(project);
            }}
          />
        );
      })}
    </group>
  );
};

interface PlanetInstanceProps {
  project: ProjectData;
  index: number;
  isHovered: boolean;
  isSelected: boolean;
  onHover: (id: string | null) => void;
  onSelect: () => void;
}

const PlanetInstance = ({
  project,
  index,
  isHovered,
  isSelected,
  onHover,
  onSelect
}: PlanetInstanceProps) => {
  const planetPivotRef = useRef<THREE.Group>(null);
  const planetMeshRef = useRef<THREE.Mesh>(null);
  const radarSweepRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    // Individual planetary orbit progression
    if (planetPivotRef.current) {
      planetPivotRef.current.rotation.y += delta * project.orbitSpeed;
    }
    // Planet self-rotation
    if (planetMeshRef.current) {
      planetMeshRef.current.rotation.y += delta * 0.8;
      planetMeshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    // Special radar sweep for Crime Radar
    if (radarSweepRef.current) {
      radarSweepRef.current.rotation.z += delta * 2.5;
    }
    // Orbit rings spin
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.4;
    }
  });

  const initialAngle = (index * (Math.PI * 2)) / 4;

  return (
    <group>
      {/* Orbital Trail Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[project.orbitRadius - 0.05, project.orbitRadius + 0.05, 64]} />
        <meshBasicMaterial
          color={isHovered || isSelected ? project.color : "#1e293b"}
          transparent
          opacity={isHovered || isSelected ? 0.7 : 0.3}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbiting Planet Pivot */}
      <group ref={planetPivotRef} rotation={[0, initialAngle, 0]}>
        <group position={[project.orbitRadius, 0, 0]}>
          {/* Main Planet Sphere */}
          <mesh
            ref={planetMeshRef}
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              onHover(project.id);
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              onHover(null);
            }}
            scale={isHovered || isSelected ? 1.25 : 1.0}
          >
            <sphereGeometry args={[project.radius, 32, 32]} />
            <meshStandardMaterial
              color={project.color}
              emissive={project.glowColor}
              emissiveIntensity={isHovered || isSelected ? 2.5 : 0.9}
              roughness={0.3}
              metalness={0.6}
            />
          </mesh>

          {/* Planet-Specific Atmosphere and Visual Elements */}
          {project.planetType === 'storm_gas' && (
            // VAAYU: Atmospheric Storm Bands & Forecast Rings
            <group>
              <mesh scale={1.3}>
                <sphereGeometry args={[project.radius, 16, 16]} />
                <meshBasicMaterial
                  color="#38bdf8"
                  transparent
                  opacity={0.3}
                  wireframe
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
              <mesh ref={ringRef} rotation={[0.4, 0.2, 0]}>
                <ringGeometry args={[project.radius * 1.6, project.radius * 2.1, 32]} />
                <meshBasicMaterial
                  color="#00f0ff"
                  transparent
                  opacity={0.5}
                  side={THREE.DoubleSide}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            </group>
          )}

          {project.planetType === 'cyber_surveillance' && (
            // CRIME RADAR: Wireframe Grid & Radar Sweep Beam
            <group ref={radarSweepRef}>
              <mesh scale={1.25}>
                <sphereGeometry args={[project.radius, 12, 12]} />
                <meshBasicMaterial
                  color="#f43f5e"
                  transparent
                  opacity={0.4}
                  wireframe
                />
              </mesh>
              <mesh rotation={[0, 0, 0]}>
                <ringGeometry args={[0.2, project.radius * 2.2, 8, 1, 0, Math.PI / 4]} />
                <meshBasicMaterial
                  color="#f43f5e"
                  transparent
                  opacity={0.7}
                  side={THREE.DoubleSide}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            </group>
          )}

          {project.planetType === 'edtech_knowledge' && (
            // IXORA: Crystalline Knowledge Nodes
            <group>
              <mesh scale={1.35}>
                <icosahedronGeometry args={[project.radius, 1]} />
                <meshBasicMaterial
                  color="#c084fc"
                  transparent
                  opacity={0.35}
                  wireframe
                />
              </mesh>
              {[-1.5, 1.5].map((off, i) => (
                <mesh key={i} position={[off * 1.5, Math.sin(off) * 1.2, off * 0.8]}>
                  <boxGeometry args={[0.4, 0.4, 0.4]} />
                  <meshBasicMaterial color="#a855f7" />
                </mesh>
              ))}
            </group>
          )}

          {project.planetType === 'fintech_matrix' && (
            // FINAVRIA: Currency & Matrix Financial Vector Rings
            <group>
              <mesh rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[project.radius * 1.8, 0.06, 8, 32]} />
                <meshBasicMaterial color="#10b981" />
              </mesh>
              <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
                <torusGeometry args={[project.radius * 2.1, 0.05, 8, 32]} />
                <meshBasicMaterial color="#34d399" transparent opacity={0.6} />
              </mesh>
            </group>
          )}

          {/* Holographic Planet Tag */}
          <group position={[0, project.radius + 1.2, 0]}>
            <pointLight
              color={project.color}
              intensity={isHovered ? 2.5 : 1.0}
              distance={6}
            />
          </group>
        </group>
      </group>
    </group>
  );
};
