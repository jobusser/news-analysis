import * as THREE from 'three'
import earcut from "earcut";
import { shaderMaterial } from '@react-three/drei'

export function convertCoordsTo3D(lat, lon, radius = 1) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export function createPolygon(polygonCoords, globeRadius) {
  const vertices = [];
  const holes = [];

  // NOTE: GeoJSON coordinate structure available at https://en.wikipedia.org/wiki/GeoJSON#TopoJSON_Schema 
  polygonCoords.forEach((ring, index) => {
    if (index > 0) {
      // Start index of this hole
      holes.push(vertices.length / 3);
    }
    ring.forEach(([lon, lat]) => {
      const vertex = convertCoordsTo3D(lat, lon, globeRadius);
      vertices.push(vertex.x, vertex.y, vertex.z); // Flatten 
    });
  });

  // Create polygon
  const indices = earcut(vertices, holes, 3);
  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(indices);
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8,
    visible: false
  });

  return new THREE.Mesh(geometry, material);
}

export const AtmosphereShaderMaterial = shaderMaterial(
  // Uniforms
  {
    time: 0,
    color: new THREE.Color(0.2, 0.0, 0.1),
    glowColor: new THREE.Color(0.1, 0.5, 0.9), // Light blue color for the atmosphere
    viewVector: new THREE.Vector3(0, 0, 1) // The direction the camera is looking from
  },
  //TODO: check out video on how to pass fragment shader globeTexture, and then finish tutorial
  // Vertex shader
  /*glsl*/`
      void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  /*glsl*/`
      uniform sampler2D globeTexture;
      varying vec2 vertexUV;

      void main() {
      gl_FragColor = texture2D(globeTexture, vertexUV);
    }
  `
);
