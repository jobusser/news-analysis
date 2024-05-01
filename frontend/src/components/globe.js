import { useRef, } from "react";
import { TextureLoader } from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import * as THREE from 'three';

import CountryLayer from "./countryLayer";
import Starfield from "./starfield";
import Atmosphere from "./atmosphere";
import Sun from "./sun";
import { rotationAroundSun, rotationAroundAxis } from './utils/rotations.js'

import EarthMap from "../assets/maps/blue-marble-oct.jpg"
import EarthNormalMap from "../assets/maps/8k_earth_normal_map.jpg"

function Globe({ radius = 1, widthSegments = 256, heightSegments = 256 }) {

  // TODO: change map based on time of year
  const [earthMap, earthNormalMap] = useLoader(
    TextureLoader,
    [EarthMap, EarthNormalMap]
  );

  const ref = useRef();

  useFrame((state, delta, frame) => {
    ref.current.rotation.y += delta * 0.004;
  });

  const date = new Date();

  const rotateAroundSun = rotationAroundSun(date);
  const rotateAroundAxis = rotationAroundAxis(date);

  return (
    <group rotation-y={Math.PI / 2 - rotateAroundSun} rotation-z={23.4 * Math.PI / 180}>
      <group ref={ref} rotation-y={Math.PI + rotateAroundAxis}>
        {/* Earth at day with bumps */}
        <mesh >
          <sphereGeometry args={[radius, widthSegments, heightSegments]} />
          <meshStandardMaterial map={earthMap} bumpMap={earthNormalMap} bumpScale={3} metalness={0.2} roughness={0.8} />
        </mesh>

        < Atmosphere globeRadius={radius} widthSegments={widthSegments} heightSegments={heightSegments} />

        {/* Country polygons */}
        <CountryLayer globeRadius={radius} />

      </group>
    </ group>

  );
}
export default Globe;

