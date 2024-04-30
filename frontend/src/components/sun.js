import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

function Sun({ position }) {

  const group = useMemo(() => {
    const radius = 5;
    const detail = 16;

    // Sunlight - Directional light
    const sunlight = new THREE.DirectionalLight(0xfdfbd3, 5);


    // Sun glow - Halo effect
    const sunGeometry = new THREE.SphereGeometry(radius * 5, detail, detail);
    const sunMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vertexNormal;
        void main() {
          vertexNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vertexNormal;
        void main() {
          float intensity = pow(0.2 - dot(vertexNormal, vec3(0, 0, 1)), 2.0);
          gl_FragColor = vec4(1, 1, 0.9, 1) * intensity;
        }
      `,
      side: THREE.BackSide,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);

    // Group to hold sun components
    const group = new THREE.Group();
    group.add(sun);
    group.add(sunlight);

    return group;
  }, []);

  return <primitive object={group} position={position} />;
}

export default Sun;
