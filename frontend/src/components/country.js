import React, { useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

import { createPolygon } from './utils';
import { useCountry } from './countryProvider';


const Country = React.memo(({ feature, globeRadius }) => {
  const { selectCountry, selectedCountry } = useCountry();
  const { camera } = useThree();

  // creation
  const group = useMemo(() => {
    const localGroup = new THREE.Group();
    const { coordinates, type } = feature.geometry;
    const geometries = type === 'Polygon' ? [coordinates] : coordinates;

    geometries.forEach(coords => {
      const mesh = createPolygon(coords, globeRadius);
      localGroup.add(mesh);

    });

    localGroup.userData = {
      name: feature.properties.name,
      nameLong: feature.properties.namelong,
      abbrev: feature.properties.abbrev,
      iso_a2: feature.properties.iso_a2,
      iso_a3: feature.properties.iso_a3,
      continent: feature.properties.continent,
      sovereignt: feature.properties.sovereignt,
    };
    return localGroup;

  }, [feature, globeRadius]);

  const isSelected = (selectedCountry && selectedCountry.name == group.userData.name);
  const [isHovered, setIsHovered] = useState(false);

  function handleSelect() {
    // dot product to ensure front-facing country
    if (group.children[0].geometry.boundingSphere.center.dot(camera.position) > 0) {
      if (isSelected) {
        selectCountry(null);
      } else {
        selectCountry(group.userData);
      }
    }
  };

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  useEffect(() => {
    group.children.forEach(mesh => {
      mesh.material.visible = true; // Always make the material visible when hovered or selected
      if (isSelected) {
        mesh.material.color.set('#ff0000'); // Red when selected
      } else if (isHovered) {
        mesh.material.color.set('#ffff00'); // Yellow when hovered
      } else {
        mesh.material.visible = false; // Invisible otherwise
      }
      mesh.material.needsUpdate = true;
    });
  }, [isSelected, isHovered, group.children]);

  return <primitive
    object={group}
    onPointerOver={handleMouseOver}
    onPointerOut={handleMouseOut}
    onClick={handleSelect} />;
});

export default Country;

