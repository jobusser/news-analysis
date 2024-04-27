import React, { useEffect, useState } from "react";
import * as THREE from 'three'
import earcut from "earcut";
import countriesData from '../assets/data/countries.geo.json';


function convertCoordsTo3D(lat, lon, radius = 1) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function createPolygon(polygonCoords, globeRadius) {
  const vertices = [];
  const holes = [];

  // Process each polygon (first is the outer, others are holes)
  polygonCoords.forEach((ring, index) => {
    if (index > 0) {
      // Record the start index of this hole
      holes.push(vertices.length / 3);
    }
    ring.forEach(([lon, lat]) => {
      const vertex = convertCoordsTo3D(lat, lon, globeRadius);
      vertices.push(vertex.x, vertex.y, vertex.z); // Flatten the vertices array
    });
  });

  // Triangulate the polygon using earcut
  const indices = earcut(vertices, holes, 3);

  // Create THREE.js geometry
  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(indices);
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  // Create material and mesh
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
  return new THREE.Mesh(geometry, material);
}

function createCountry(feature, globeRadius = 1) {
  const group = new THREE.Group();

  const { type, properties, geometry } = feature;
  const { coordinates } = geometry;

  if (geometry.type === 'Polygon') {
    const polygonMesh = createPolygon(coordinates, globeRadius);
    group.add(polygonMesh);

  } else if (geometry.type === 'MultiPolygon') {
    coordinates.forEach(polygonCoords => {
      const polygonMesh = createPolygon(polygonCoords, globeRadius);
      group.add(polygonMesh);
    });
  }

  group.userData = {
    name: properties.name,
  };

  console.log("Created Group/Country", group.userData);
  return group;

}

function CountryLayer({ globeRadius }) {
  console.log(typeof globeRadius);
  const [countries, setCountries] = useState(new THREE.Group());

  useEffect(() => {
    console.log("useEffect entered");

    console.log("HEREEE", globeRadius);
    globeRadius = globeRadius * 1.05;
    console.log("HEREEE", globeRadius);

    const group = new THREE.Group(); // Create a group to hold all countries

    console.log("countriesData", countriesData);

    countriesData.features.forEach(feature => {
      const country = createCountry(feature, globeRadius);
      group.add(country);
    });

    setCountries(group); // Store the group in the component's state
  }, []);

  console.log(countries);
  return <primitive object={countries} />;
}






export default CountryLayer;
