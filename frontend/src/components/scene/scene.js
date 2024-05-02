import { useRef, } from "react";
import * as THREE from 'three';
import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import Starfield from "./starfield";
import Sun from "./sun";
import Globe from "./globe";

function Scene() {
  const controlsRef = useRef();


  const { camera } = useThree();

  useFrame(() => {
    if (controlsRef.current) {
      // Compute the direction vector from the camera to the origin
      const direction = new THREE.Vector3().subVectors(new THREE.Vector3(0, 0, 0), camera.position).normalize();

      // Compute the right vector by taking the cross product of direction and the up vector
      const right = new THREE.Vector3().crossVectors(direction, new THREE.Vector3(0, 1, 0)).normalize();

      // Scale the right vector to 2 units
      right.multiplyScalar(2);

      // Compute the new target position by adding the right vector to the origin
      const targetPosition = new THREE.Vector3().addVectors(new THREE.Vector3(0, 0, 0), right);

      // Update the target of the camera
      controlsRef.current.target.copy(targetPosition);
      controlsRef.current.update(); // Update the orbit controls to reflect the change
    }
  });

  return (
    <>
      <Sun position={[0, 0, 100]} />

      <Globe />

      <Starfield
        radius={300}
        depth={150}
        count={5000}
        factor={7}
        saturation={0}
        fade={true}
        speed={1}
        noise={9}
      />

      {/* TODO: Limit and adjust movement */}
      <OrbitControls
        ref={controlsRef}
        target={[0, 0, 0]}
        position={[0, 0, -5]}
        enableZoom={true}
        enablePan={false}
        rotateSpeed={0.2}
        minDistance={2.0}
        maxDistance={10}
        minZoom={1}
        maxZoom={1}
      />
    </>
  )
};

export default Scene;

