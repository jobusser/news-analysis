import { useRef, useMemo } from "react";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";

import CountryLayer from "./countryLayer";
import Atmosphere from "./atmosphere";
import { rotationAroundSun, rotationAroundAxis } from './utils/rotations.js'

import { monthTextures } from "./utils/earthTextures";

function Globe({ radius = 1, widthSegments = 256, heightSegments = 256 }) {

  // earth texture and positioning based on date
  const date = new Date();
  const rotateAroundSun = useMemo(() => rotationAroundSun(date), [date]);
  const rotateAroundAxis = useMemo(() => rotationAroundAxis(date), [date]);

  const [earthMap, earthNormalMap] = useLoader(
    TextureLoader,
    useMemo(() => [monthTextures[date.getMonth()], "/maps/8k_earth_normal_map.jpg"], [date.getMonth()])
  );

  return (
    <group rotation-y={Math.PI / 2 - rotateAroundSun} rotation-z={23.4 * Math.PI / 180}>
      <group rotation-y={Math.PI + rotateAroundAxis}>

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

