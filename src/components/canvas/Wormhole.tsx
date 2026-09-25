import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WormholeProps {
  active: boolean;
}

export const Wormhole = ({ active }: WormholeProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const ringCount = 30;

  const rings = useMemo(() => {
    return Array.from({ length: ringCount }).map((_, i) => ({
      z: -i * 15,
      scale: 1 + Math.sin(i * 0.3) * 0.4,
      rotation: i * 0.2
    }));
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current || !active) return;
    meshRef.current.rotation.z += delta * 2.5;

    // Shift rings forward
    meshRef.current.children.forEach((child) => {
      child.position.z += delta * 120;
      if (child.position.z > 30) {
        child.position.z = -ringCount * 15 + 30;
      }
    });
  });

  if (!active) return null;

  return (
    <group ref={meshRef}>
      {rings.map((ring, index) => (
        <group key={index} position={[0, 0, ring.z]}>
          {/* Glowing Polygon Ring */}
          <mesh rotation={[0, 0, ring.rotation]}>
            <torusGeometry args={[8 * ring.scale, 0.15, 8, 32]} />
            <meshBasicMaterial
              color={index % 2 === 0 ? "#00f0ff" : "#8b5cf6"}
              transparent
              opacity={0.7}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* Inner Temporal Energy Accents */}
          <mesh rotation={[0, 0, -ring.rotation]}>
            <ringGeometry args={[7 * ring.scale, 7.2 * ring.scale, 6]} />
            <meshBasicMaterial
              color="#38bdf8"
              transparent
              opacity={0.4}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};
