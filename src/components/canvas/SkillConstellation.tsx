import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SKILL_NODES } from '../../data/skills';
import type { SkillNode } from '../../types';
import { sound } from '../../audio/soundEngine';

interface SkillConstellationProps {
  onSelectSkill: (skill: SkillNode) => void;
  activeSkillId?: string | null;
  visible?: boolean;
}

export const SkillConstellation = ({
  onSelectSkill,
  activeSkillId,
  visible = true
}: SkillConstellationProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Compute 3D line connections between connected skills
  const lineSegments = useMemo(() => {
    const nodeMap = new Map<string, SkillNode>();
    SKILL_NODES.forEach((n) => nodeMap.set(n.id, n));

    const positions: number[] = [];
    const colors: number[] = [];

    SKILL_NODES.forEach((node) => {
      node.connectedTo.forEach((targetId) => {
        const targetNode = nodeMap.get(targetId);
        if (targetNode) {
          positions.push(...node.position);
          positions.push(...targetNode.position);

          const c1 = new THREE.Color(node.color);
          const c2 = new THREE.Color(targetNode.color);
          colors.push(c1.r, c1.g, c1.b);
          colors.push(c2.r, c2.g, c2.b);
        }
      });
    });

    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors)
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.03;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={[0, 0, -20]}>
      {/* Dynamic Constellation Connection Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[lineSegments.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineSegments.colors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Individual Interactive Skill Nodes */}
      {SKILL_NODES.map((node) => {
        const isHovered = hoveredNodeId === node.id;
        const isSelected = activeSkillId === node.id;
        const isConnected =
          hoveredNodeId &&
          (node.connectedTo.includes(hoveredNodeId) ||
            SKILL_NODES.find((n) => n.id === hoveredNodeId)?.connectedTo.includes(node.id));

        return (
          <group key={node.id} position={node.position}>
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                sound.playClick();
                onSelectSkill(node);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredNodeId(node.id);
                sound.playHover();
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredNodeId(null);
              }}
              scale={isHovered || isSelected ? 1.6 : isConnected ? 1.3 : 1.0}
            >
              <sphereGeometry args={[0.35, 16, 16]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={isHovered || isSelected ? 3.0 : isConnected ? 2.0 : 1.0}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            {/* Glowing Aura Ring */}
            {(isHovered || isSelected || isConnected) && (
              <mesh>
                <ringGeometry args={[0.45, 0.55, 16]} />
                <meshBasicMaterial
                  color={node.color}
                  transparent
                  opacity={0.8}
                  side={THREE.DoubleSide}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
};
