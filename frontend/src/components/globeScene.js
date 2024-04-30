import { useRef, } from "react";
import { TextureLoader } from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { extend } from '@react-three/fiber'

import { AtmosphereShaderMaterial } from './utils/shaderMaterials';
import CountryLayer from "./countryLayer";
import Starfield from "./starfield";
import Atmosphere from "./atmosphere";

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

  extend({ AtmosphereShaderMaterial });

  return (
    <group ref={ref} rotation-z={-23.4 * Math.PI / 180} >

      {/* Earth at day with bumps */}
      <mesh >
        <sphereGeometry args={[radius, widthSegments, heightSegments]} />
        <meshStandardMaterial map={earthMap} bumpMap={earthNormalMap} bumpScale={3} metalness={0.2} roughness={0.8} />
      </mesh>

      < Atmosphere globeRadius={radius} widthSegments={widthSegments} heightSegments={heightSegments} />

      {/* Country polygons */}
      <CountryLayer globeRadius={1.0} />

    </group>

  );
}
function Scene() {
  const controlsRef = useRef();

  return (
    <>
      {/* sunlight */}
      {/* TODO: when backend comes in, cacluate actual sun position */}
      <directionalLight
        position={[1, 0, 0]}
        intensity={1}
        color={'white'}
      />

      {/* Minimum light */}
      {/* TODO: Play with darkness once polygon layer and skins finalised */}
      <ambientLight intensity={0.7} />

      <Globe />

      <Starfield
        radius={300}
        depth={90}
        count={5000}
        factor={7}
        saturation={0}
        fade={true}
        speed={1}
        noise={9}
      />

      {/* TODO: Limit and adjust movement */}
      <OrbitControls ref={controlsRef} target={[0, 0, 0]} position={[0, 0, 5]} enableZoom={true} enablePan={false} rotateSpeed={0.4} minZoom={1} maxZoom={5} />
    </>
  )
};

export default Scene;
