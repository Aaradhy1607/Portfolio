import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { TimelineEra } from '../../types';

interface NebulaProps {
  era: TimelineEra;
}

export const Nebula = ({ era }: NebulaProps) => {
  const groupRef = useRef<THREE.Group>(null);

  // Dynamic nebula palette by era
  const colors = {
    past: {
      primary: '#d97706', // amber
      secondary: '#78350f', // deep warm bronze
      glow: '#b45309'
    },
    present: {
      primary: '#3b82f6', // electric blue
      secondary: '#8b5cf6', // deep violet
      glow: '#00f0ff' // cyan
    },
    future: {
      primary: '#10b981', // emerald
      secondary: '#4c1d95', // deep ultraviolet void
      glow: '#06b6d4' // teal
    }
  }[era];

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.02;
    groupRef.current.rotation.z += delta * 0.01;
  });

  return (
    <group ref={groupRef} position={[0, 0, -50]}>
      {/* Primary Atmospheric Nebula Cloud 1 */}
      <mesh position={[-40, 20, -100]}>
        <sphereGeometry args={[70, 16, 16]} />
        <meshBasicMaterial
          color={colors.primary}
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Secondary Cosmic Core Cloud 2 */}
      <mesh position={[50, -30, -120]}>
        <sphereGeometry args={[90, 16, 16]} />
        <meshBasicMaterial
          color={colors.secondary}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Tertiary Accent Glow */}
      <mesh position={[0, 50, -150]}>
        <sphereGeometry args={[110, 16, 16]} />
        <meshBasicMaterial
          color={colors.glow}
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
