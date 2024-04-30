import * as THREE from 'three'
import earcut from "earcut";

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
