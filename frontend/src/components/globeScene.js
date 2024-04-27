import { useLoader, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { OrbitControls, Stars } from "@react-three/drei";

import EarthDayMap from "../assets/maps/8k_earth_daymap.jpg"
import EarthNightMap from "../assets/maps/8k_earth_nightmap.jpg"
import EarthSpecularMap from "../assets/maps/8k_earth_specular_map.jpg"
import EarthNormalMap from "../assets/maps/8k_earth_normal_map.jpg"
import { AdditiveBlending, IcosahedronGeometry, TextureLoader } from "three";
import Country from "./country";

function Globe({ radius = 0.51, widthSegments = 256, heightSegments = 256 }) {

  const [dayMap, nightMap, specularMap, normalMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNightMap, EarthSpecularMap, EarthNormalMap]
  );

  const ref = useRef();

  useFrame((state, delta, frame) => {
    {/* 
  ref.current.rotation.y += delta * 0.004;
  */}
  });

  return (
    <group ref={ref} >
      <mesh >
        <sphereGeometry args={[radius, widthSegments, heightSegments]} />
        <meshStandardMaterial map={dayMap} bumpMap={normalMap} bumpScale={3} metalness={0.2} roughness={0.8} />
      </mesh>

      <mesh>
        <sphereGeometry args={[radius, widthSegments, heightSegments]} />
        <meshStandardMaterial map={nightMap} blending={AdditiveBlending} />
      </mesh>

      <Country />


    </group>

  );
}
function Scene() {
  const controlsRef = useRef();

  useFrame(() => {
    {/*
    console.log("Camera position:", controlsRef.current.object.position);
  */}
  });

  return (
    <>
      <directionalLight
        position={[-2, -0.5, 0]}
        intensity={1}
        color={'white'}
      />
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


      <OrbitControls ref={controlsRef} target={[0, 0, 0]} position={[0, 0, 5]} enableZoom={true} enablePan={false} rotateSpeed={0.4} minZoom={1} maxZoom={5} />
    </>
  )
};

export default Scene;
