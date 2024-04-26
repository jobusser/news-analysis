import { useLoader, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";

import EarthDayMap from "../assets/maps/8k_earth_daymap.jpg"
import EarthNightMap from "../assets/maps/8k_earth_nightmap.jpg"
import EarthSpecularMap from "../assets/maps/8k_earth_specular_map.jpg"
import EarthNormalMap from "../assets/maps/8k_earth_normal_map.jpg"
import { AdditiveBlending, IcosahedronGeometry, TextureLoader } from "three";

function Globe({ radius = 2, widthSegments = 256, heightSegments = 256 }) {

  const [dayMap, nightMap, specularMap, normalMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNightMap, EarthSpecularMap, EarthNormalMap]
  );

  const ref = useRef();

  useFrame((state, delta, frame) => {
    ref.current.rotation.y += delta * 0.004;
  });

  return (
    <group ref={ref} >
      <mesh >
        <sphereGeometry args={[radius, widthSegments, heightSegments]} />
        <meshPhongMaterial map={dayMap} bumpMap={normalMap} bumpScale={3} specularMap={specularMap} />
      </mesh>

      <mesh>
        <sphereGeometry args={[radius, widthSegments, heightSegments]} />
        <meshPhongMaterial map={nightMap} blending={AdditiveBlending} />
      </mesh>


    </group>

  );
}
function Scene() {

  return (
    <>
      <directionalLight
        position={[-2, -0.5, 0]}
        intensity={1}
        color={'white'}
      />
      <ambientLight intensity={0.5} />
      <Globe />
      <OrbitControls enableZoom={true} enablePan={false} rotateSpeed={0.4} minZoom={1} maxZoom={5} />
    </>
  )
};

export default Scene;
