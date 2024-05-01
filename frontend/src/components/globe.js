import { useRef, useMemo } from "react";
import { TextureLoader } from "three";
import { useLoader, useFrame } from "@react-three/fiber";

import CountryLayer from "./countryLayer";
import Atmosphere from "./atmosphere";
import { rotationAroundSun, rotationAroundAxis } from './utils/rotations.js'

import { monthTextures } from "./utils/earthTextures";

function Globe({ radius = 1, widthSegments = 256, heightSegments = 256 }) {

  const date = new Date();

  const [earthMap, earthNormalMap] = useLoader(
    TextureLoader,
    useMemo(() => [monthTextures[date.getMonth()], "/maps/8k_earth_normal_map.jpg"], [date.getMonth()])
  );

  const ref = useRef();


  const rotateAroundSun = useMemo(() => rotationAroundSun(date), [date]);
  const rotateAroundAxis = useMemo(() => rotationAroundAxis(date), [date]);

  return (
    <group rotation-y={Math.PI / 2 - rotateAroundSun} rotation-z={23.4 * Math.PI / 180}>
      <group ref={ref} rotation-y={Math.PI + rotateAroundAxis}>
        {/* Earth at day with bumps */}
        <mesh >
          <sphereGeometry args={[radius, widthSegments, heightSegments]} />
          <meshStandardMaterial map={earthMap} bumpMap={earthNormalMap} bumpScale={3} metalness={0.4} roughness={1} />
        </mesh>

        < Atmosphere globeRadius={radius} widthSegments={widthSegments} heightSegments={heightSegments} />

        {/* Country polygons */}
        <CountryLayer globeRadius={radius} />

      </group>
    </ group>

  );
}
export default Globe;

