import { useRef, } from "react";
import { AdditiveBlending, TextureLoader } from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

import CountryLayer from "./countryLayer";

import EarthDayMap from "../assets/maps/8k_earth_daymap.jpg"
import EarthNightMap from "../assets/maps/8k_earth_nightmap.jpg"
import EarthNormalMap from "../assets/maps/8k_earth_normal_map.jpg"

function Globe({ radius = 1, widthSegments = 256, heightSegments = 256 }) {

  const [dayMap, nightMap, normalMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNightMap, EarthNormalMap]
  );

  const ref = useRef();

  useFrame((state, delta, frame) => {
    ref.current.rotation.y += delta * 0.004;
  });

  return (
    <group ref={ref} rotation-z={-23.4 * Math.PI / 180} >

      {/* Earth at day with bumps */}
      <mesh >
        <sphereGeometry args={[radius, widthSegments, heightSegments]} />
        <meshStandardMaterial map={dayMap} bumpMap={normalMap} bumpScale={3} metalness={0.2} roughness={0.8} />
      </mesh>

      {/* night map with additive blending for lights */}
      <mesh>
        <sphereGeometry args={[radius, widthSegments, heightSegments]} />
        <meshStandardMaterial map={nightMap} blending={AdditiveBlending} />
      </mesh>

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
      <ambientLight intensity={0.5} />

      <Globe />

      <Stars
        radius={300}
        depth={60}
        count={5000}
        factor={7}
        saturation={0}
        fade={true}
      />

      {/* TODO: Limit and adjust movement */}
      <OrbitControls ref={controlsRef} target={[0, 0, 0]} position={[0, 0, 5]} enableZoom={true} enablePan={false} rotateSpeed={0.4} minZoom={1} maxZoom={5} />
    </>
  )
};

export default Scene;
