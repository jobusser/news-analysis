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
  const flatVertices = [];
  const holes = [];

  // NOTE: GeoJSON coordinate structure available at https://en.wikipedia.org/wiki/GeoJSON#TopoJSON_Schema 
  polygonCoords.forEach((ring, index) => {
    if (index > 0) {
      // Start index of this hole
      holes.push(flatVertices.length / 3);
    }
    ring.forEach(([lon, lat]) => {
      const vertex = convertCoordsTo3D(lat, lon, globeRadius);
      flatVertices.push(vertex.x, vertex.y, vertex.z);
    });
  });

  // Create polygon
  const indices = earcut(flatVertices, holes, 3);
  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(indices);
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(flatVertices, 3));

  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.4,
    visible: false
  });


  geometry.computeBoundingSphere();
  const boundingSphere = geometry.boundingSphere;
  const centerSphereGeometry = new THREE.SphereGeometry(0.02, 32, 32); // Small size
  const centerSphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const centerSphere = new THREE.Mesh(centerSphereGeometry, centerSphereMaterial);
  centerSphere.position.copy(boundingSphere.center);

  const group = new THREE.Group();
  group.add(new THREE.Mesh(geometry, material));
  group.add(centerSphere)

  return group;
}
