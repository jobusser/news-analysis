import React, { useEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';

import { createPolygon } from './utils/countryPolygons';
import { useCountry } from '../context/countryProvider';


const CountryTerritory = React.memo(({ countryData, coordinates, globeRadius }) => {
  const { selectedCountry, setSelectedCountry, hoveredCountry, setHoveredCountry } = useCountry();
  const { camera } = useThree();

  // creation
  const polygon = useMemo(() => {
    return createPolygon(coordinates, globeRadius);
  }, [globeRadius]);

  // update effect
  useEffect(() => {
    const isSelected = (selectedCountry && selectedCountry.name === countryData.name);
    const isHovered = (hoveredCountry && hoveredCountry.name === countryData.name);

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

  }, [selectedCountry, hoveredCountry]);


  function handleSelect() {
    const sphere = polygon.children[0].geometry.boundingSphere;
    const worldSphereCenter = sphere.center.clone().applyMatrix4(polygon.children[0].matrixWorld);

    // dot product to ensure front-facing country
    if (worldSphereCenter.dot(camera.position) > 0) {
      const isSelected = (selectedCountry && selectedCountry.name === countryData.name);

      if (isSelected) {
        setSelectedCountry(null);
      } else {
        setSelectedCountry(countryData);
      }
    }
  };

  function handleMouseOver() {
    const sphere = polygon.children[0].geometry.boundingSphere;
    const worldSphereCenter = sphere.center.clone().applyMatrix4(polygon.children[0].matrixWorld);

    if (worldSphereCenter.dot(camera.position) > 0) {
      setHoveredCountry(countryData);
    }
  }

  function handleMouseOut() {
    const sphere = polygon.children[0].geometry.boundingSphere;
    const worldSphereCenter = sphere.center.clone().applyMatrix4(polygon.children[0].matrixWorld);
    if (worldSphereCenter.dot(camera.position) > 0) {
      setHoveredCountry(null);
    }

  }

  return <primitive
    object={polygon}
    onPointerOver={handleMouseOver}
    onPointerOut={handleMouseOut}
    onClick={handleSelect} />;
});

export default CountryTerritory;
