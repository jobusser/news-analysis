import React, { useState, useMemo } from 'react';
import { createPolygon } from './utils';
import { useCountry } from './countryProvider';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

const Country = React.memo(({ feature, globeRadius }) => {
  const { selectCountry, selectedCountry } = useCountry();
  const { camera } = useThree();

  const group = useMemo(() => {

    const localGroup = new THREE.Group();
    const { coordinates, type } = feature.geometry;
    const meshCreator = type === 'Polygon' ? [coordinates] : coordinates;

    meshCreator.forEach(coords => {
      const mesh = createPolygon(coords, globeRadius);
      localGroup.add(mesh);
    });

    localGroup.userData = { name: feature.properties.name };
    return localGroup;
  }, [feature, globeRadius]);

  const isSelected = (selectedCountry == feature.properties.name);

  const handleSelect = (event) => {
    // dot product to ensure front-facing country
    const samplePosition = group.children[0].geometry.boundingSphere.center;

    if (samplePosition.dot(camera.position) > 0) {
      selectCountry(feature.properties.name);
    }
  };
  const [color, setColor] = useState('#ff0000');

  // Change mesh color on hover
  const onHover = (hovered) => {
    group.children.forEach(mesh => {
      mesh.material.color.set(hovered ? '#ffff00' : color);
      mesh.material.needsUpdate = true;
    });
  };

  return <primitive
    object={group}
    onPointerOver={() => onHover(true)}
    onPointerOut={() => onHover(false)}
    onClick={handleSelect} />;
});

export default Country;

