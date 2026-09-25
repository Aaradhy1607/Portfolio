import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { NavigationTarget } from '../../types';

interface CameraControllerProps {
  target: NavigationTarget;
  isWarping: boolean;
}

export const CameraController = ({ target, isWarping }: CameraControllerProps) => {
  const { camera, pointer } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // Defined camera positions and targets for each experience sector
  const cameraConfigs: Record<NavigationTarget, { pos: [number, number, number]; lookAt: [number, number, number] }> = {
    cockpit: { pos: [0, 0, 8], lookAt: [0, 0, 0] },
    universe: { pos: [0, 12, 35], lookAt: [0, 0, -25] },
    identity: { pos: [0, 0, 6.5], lookAt: [0, 0, 0] },
    temporal_core: { pos: [0, 0, 4.5], lookAt: [0, -0.5, 0] },
    project_system: { pos: [0, 20, 22], lookAt: [0, 0, -35] },
    planet_vaayu: { pos: [10, 4, -15], lookAt: [18, 0, -35] },
    planet_crime_radar: { pos: [18, 4, -15], lookAt: [28, 0, -35] },
    planet_ixora: { pos: [26, 4, -15], lookAt: [38, 0, -35] },
    planet_finavria: { pos: [34, 4, -15], lookAt: [48, 0, -35] },
    skill_constellation: { pos: [0, 0, 4], lookAt: [0, 0, -20] },
    mission_log: { pos: [-4, 2, 7], lookAt: [0, 0, 0] },
    communication: { pos: [3, 1, 7], lookAt: [0, 0, 0] },
  };

  useFrame((_, delta) => {
    const config = cameraConfigs[target] || cameraConfigs.cockpit;

    // Gentle mouse parallax drift
    const parallaxX = pointer.x * 0.8;
    const parallaxY = pointer.y * 0.6;

    const targetPos = new THREE.Vector3(
      config.pos[0] + parallaxX,
      config.pos[1] + parallaxY,
      isWarping ? config.pos[2] - 15 : config.pos[2]
    );

    const targetLookAt = new THREE.Vector3(
      config.lookAt[0],
      config.lookAt[1],
      config.lookAt[2]
    );

    // Smooth lerp camera movement (no abrupt snapping)
    camera.position.lerp(targetPos, delta * 2.8);
    currentLookAt.current.lerp(targetLookAt, delta * 3.2);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
