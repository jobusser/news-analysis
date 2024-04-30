import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

function Sun({ position }) {
  const meshRef = useRef();
  const { camera } = useThree();

  // Create the shader material
  const sunMaterial = new THREE.ShaderMaterial({
    uniforms: {
      c: { value: new THREE.Color(0xffffff) },
      p: { value: 0.13 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 c;
      uniform float p;
      varying vec2 vUv;
      void main() {
        float intensity = 1.0 - pow(length(vUv - vec2(0.5, 0.5)) * 2.0, p);
        gl_FragColor = vec4(c, intensity);
      } 
      `,
    transparent: true,
    blending: THREE.AdditiveBlending,
  });

  // Update to always face the camera
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      material={sunMaterial}
      args={[new THREE.PlaneGeometry(55, 55, 59)]}  // Adjust size as needed
    />
  );
}

export default Sun;

