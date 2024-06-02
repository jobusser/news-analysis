import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

function Sun({ position }) {
  const meshRef = useRef();
  const { camera } = useThree();

  const sunlightColor = new THREE.Color(0xfdfbf1);

  // Create the shader material
  const sunMaterial = new THREE.ShaderMaterial({
    uniforms: {
      c: { value: sunlightColor },
      p: { value: 0.15 },
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
        float d = length(vUv - vec2(0.5, 0.5));
        float intensity;
        if (d < 0.03) intensity = 1.0;
        else intensity =  1.0 - pow(length(vUv - vec2(0.5, 0.5)) * 2.0, p);
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
    <group>

      <mesh
        ref={meshRef}
        position={position}
        material={sunMaterial}
        args={[new THREE.PlaneGeometry(55, 55, 59)]}
      />

      {/* sunlight */}
      <directionalLight
        position={position}
        intensity={5}
        color={0xfdfbf1}
      />

      {/* Minimum light */}
      <ambientLight intensity={2} />

    </group>
  );
}

export default Sun;

