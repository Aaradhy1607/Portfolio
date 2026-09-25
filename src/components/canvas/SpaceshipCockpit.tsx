import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { TimelineEra } from '../../types';
import { TemporalCore } from './TemporalCore';

interface SpaceshipCockpitProps {
  era: TimelineEra;
  onSelectEra: (era: TimelineEra) => void;
  onTriggerAnomaly?: () => void;
  visible?: boolean;
}

export const SpaceshipCockpit = ({
  era,
  onSelectEra,
  onTriggerAnomaly,
  visible = true
}: SpaceshipCockpitProps) => {
  const cockpitRef = useRef<THREE.Group>(null);
  const consoleLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (consoleLightRef.current) {
      consoleLightRef.current.intensity = 1.5 + Math.sin(t * 4) * 0.3;
    }
  });

  if (!visible) return null;

  return (
    <group ref={cockpitRef} position={[0, 0, 0]}>
      {/* Central Temporal Core System */}
      <TemporalCore
        era={era}
        onSelectEra={onSelectEra}
        onTriggerAnomaly={onTriggerAnomaly}
      />

      {/* Cockpit Floor Platform */}
      <mesh position={[0, -4.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[14, 16, 0.6, 32]} />
        <meshStandardMaterial
          color="#050b14"
          roughness={0.4}
          metalness={0.9}
        />
      </mesh>

      {/* Hexagonal Glowing Deck Grid */}
      <mesh position={[0, -4.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2, 13.5, 6]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.25}
          wireframe
        />
      </mesh>

      {/* Bridge Console Arc */}
      <mesh position={[0, -3.2, 5]} rotation={[0.4, 0, 0]}>
        <cylinderGeometry args={[7, 7.5, 1.2, 32, 1, true, -Math.PI / 3, (2 * Math.PI) / 3]} />
        <meshStandardMaterial
          color="#0a1526"
          roughness={0.3}
          metalness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Console Hologram Telemetry Strips */}
      <mesh position={[0, -2.6, 5.2]} rotation={[0.4, 0, 0]}>
        <torusGeometry args={[6.8, 0.05, 8, 32, Math.PI / 2]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* Overhead Canopy Ribs / Struts */}
      <group position={[0, 5, 0]}>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[12, 0.15, 8, 32, Math.PI]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 4]}>
          <torusGeometry args={[12, 0.15, 8, 32, Math.PI]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[12, 0.15, 8, 32, Math.PI]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Glowing Conduit Lines */}
      {[-4, -2, 2, 4].map((x, i) => (
        <mesh key={i} position={[x, -4.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.08, 12]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#00f0ff" : "#8b5cf6"}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Internal Atmospheric Dynamic Lights */}
      <pointLight
        ref={consoleLightRef}
        position={[0, -2, 3]}
        color={era === 'past' ? '#f59e0b' : era === 'future' ? '#10b981' : '#00f0ff'}
        distance={15}
      />
      <pointLight
        position={[0, 4, 0]}
        color="#38bdf8"
        intensity={0.8}
        distance={20}
      />
    </group>
  );
};
