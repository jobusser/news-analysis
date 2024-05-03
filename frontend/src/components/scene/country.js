import React, { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

import { createPolygon } from './utils/countryPolygons';
import { useCountry } from '../context/countryProvider';


const Country = React.memo(({ feature, globeRadius }) => {
  const { selectedCountry, setSelectedCountry, hoveredCountry, setHoveredCountry } = useCountry();
  const { camera } = useThree();

  // creation
  const group = useMemo(() => {
    const localGroup = new THREE.Group();
    const { coordinates, type } = feature.geometry;
    const geometries = type === 'Polygon' ? [coordinates] : coordinates;

    geometries.forEach(coords => {
      const polygon = createPolygon(coords, globeRadius);
      localGroup.add(polygon);

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

  const isSelected = (selectedCountry && selectedCountry.name === group.userData.name);
  const isHovered = (hoveredCountry && hoveredCountry.name === group.userData.name);

  function handleSelect() {
    // dot product to ensure front-facing country
    if (group.children[0].children[0].geometry.boundingSphere.center.dot(camera.position) > 0) {
      if (isSelected) {
        setSelectedCountry(null);
      } else {
        setSelectedCountry(group.userData);
      }
    }
  };

  function handleMouseOver() {
    group.children[0].children[0].geometry.computeBoundingSphere();
    if (group.children[0].children[0].geometry.boundingSphere.center.dot(camera.position) > 0) {
      setHoveredCountry(group.userData);
    }
  }

  function handleMouseOut() {
    if (isHovered) {
      setHoveredCountry(null);
    }
  }

  useEffect(() => {
    group.children.forEach(polygon => {
      if (isSelected) {
        polygon.children[0].material.visible = true;
        polygon.children[0].material.color.set('#ff0000');
        polygon.children[0].material.opacity = 0.5;

      } else if (isHovered) {
        polygon.children[0].material.visible = true;
        polygon.children[0].material.color.set('#ffff00');
        polygon.children[0].material.opacity = 0.3;

      } else {
        polygon.children[0].material.visible = false;
      }
      polygon.children[0].material.needsUpdate = true;
    });
  }, [isSelected, isHovered, group.children]);

  return <primitive
    object={group}
    onPointerOver={handleMouseOver}
    onPointerOut={handleMouseOut}
    onClick={handleSelect} />;
});

export default Country;

