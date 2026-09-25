import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { TimelineEra } from '../../types';
import { sound } from '../../audio/soundEngine';

interface TemporalCoreProps {
  era: TimelineEra;
  onSelectEra: (era: TimelineEra) => void;
  onTriggerAnomaly?: () => void;
}

export const TemporalCore = ({ era, onSelectEra, onTriggerAnomaly }: TemporalCoreProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const middleRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const [clickCount, setClickCount] = useState(0);
  const [hoveredRing, setHoveredRing] = useState<string | null>(null);

  // Era visual styling
  const config = {
    past: {
      color: '#f59e0b',
      glow: '#d97706',
      speed: 0.6,
      name: 'PAST'
    },
    present: {
      color: '#00f0ff',
      glow: '#0284c7',
      speed: 1.2,
      name: 'PRESENT'
    },
    future: {
      color: '#10b981',
      glow: '#8b5cf6',
      speed: 1.8,
      name: 'FUTURE'
    }
  }[era];

  const handleCoreClick = () => {
    sound.playClick();
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 5) {
      sound.playAnomaly();
      if (onTriggerAnomaly) {
        onTriggerAnomaly();
      }
      setClickCount(0);
    }
  };

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = t * 0.4 * config.speed;
      outerRingRef.current.rotation.y = t * 0.6 * config.speed;
    }
    if (middleRingRef.current) {
      middleRingRef.current.rotation.y = -t * 0.7 * config.speed;
      middleRingRef.current.rotation.z = t * 0.5 * config.speed;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -t * 1.1 * config.speed;
      innerRingRef.current.rotation.x = -t * 0.8 * config.speed;
    }
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 3 * config.speed) * 0.12;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Central Singularity Reactor Core */}
      <mesh
        ref={coreRef}
        onClick={handleCoreClick}
        onPointerOver={() => {
          setHoveredRing('core');
          sound.playHover();
        }}
        onPointerOut={() => setHoveredRing(null)}
      >
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color={config.color}
          emissive={config.glow}
          emissiveIntensity={hoveredRing === 'core' ? 3.5 : 2.0}
          roughness={0.2}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>

      {/* Core Plasma Aura */}
      <mesh scale={1.35}>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshBasicMaterial
          color={config.color}
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          wireframe
        />
      </mesh>

      {/* Inner Temporal Ring (Past Sector) */}
      <mesh
        ref={innerRingRef}
        onClick={() => {
          sound.playClick();
          onSelectEra('past');
        }}
        onPointerOver={() => {
          setHoveredRing('past');
          sound.playHover();
        }}
        onPointerOut={() => setHoveredRing(null)}
      >
        <torusGeometry args={[2.0, 0.08, 16, 64]} />
        <meshStandardMaterial
          color={era === 'past' || hoveredRing === 'past' ? '#f59e0b' : '#78350f'}
          emissive="#f59e0b"
          emissiveIntensity={era === 'past' ? 1.5 : 0.4}
          roughness={0.3}
        />
      </mesh>

      {/* Middle Temporal Ring (Present Sector) */}
      <mesh
        ref={middleRingRef}
        onClick={() => {
          sound.playClick();
          onSelectEra('present');
        }}
        onPointerOver={() => {
          setHoveredRing('present');
          sound.playHover();
        }}
        onPointerOut={() => setHoveredRing(null)}
      >
        <torusGeometry args={[2.8, 0.1, 16, 64]} />
        <meshStandardMaterial
          color={era === 'present' || hoveredRing === 'present' ? '#00f0ff' : '#0369a1'}
          emissive="#00f0ff"
          emissiveIntensity={era === 'present' ? 1.8 : 0.4}
          roughness={0.3}
        />
      </mesh>

      {/* Outer Temporal Ring (Future Sector) */}
      <mesh
        ref={outerRingRef}
        onClick={() => {
          sound.playClick();
          onSelectEra('future');
        }}
        onPointerOver={() => {
          setHoveredRing('future');
          sound.playHover();
        }}
        onPointerOut={() => setHoveredRing(null)}
      >
        <torusGeometry args={[3.6, 0.12, 16, 64]} />
        <meshStandardMaterial
          color={era === 'future' || hoveredRing === 'future' ? '#10b981' : '#065f46'}
          emissive="#10b981"
          emissiveIntensity={era === 'future' ? 2.0 : 0.4}
          roughness={0.3}
        />
      </mesh>

      {/* Orbital Compass Gyro Frame */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.2, 4.3, 64]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
