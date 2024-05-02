import * as THREE from 'three'


// NOTE: The below is adapted from a 'Chirs Courses' tutorial found at
// https://www.youtube.com/watch?v=vM8M4QloVL0&t=2901s 

function Atmosphere({ globeRadius, widthSegments, heightSegments }) {
  return (
    <mesh
      args={[new THREE.SphereGeometry(globeRadius * 1.1, widthSegments, heightSegments)]}
      material={new THREE.ShaderMaterial({
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
            float intensity = pow(0.6 - dot(vertexNormal, vec3(0, 0, 1)), 2.0);
            gl_FragColor = vec4(0.3, 0.6, 1, 1) * intensity;
          }
        `,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true
      })}
    />
  );
}

export default Atmosphere;
