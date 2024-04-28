import React, { useState, useMemo } from 'react';
import { createPolygon } from './utils';
import * as THREE from 'three';

const Country = React.memo(({ feature, globeRadius }) => {
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
    onPointerOut={() => onHover(false)} />;
});

export default Country;

