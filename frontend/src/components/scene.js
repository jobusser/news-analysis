import { useRef, } from "react";
import { TextureLoader } from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";


import CountryLayer from "./countryLayer";
import Starfield from "./starfield";
import Atmosphere from "./atmosphere";
import Sun from "./sun";
import Globe from "./globe";
import { rotationAroundSun, rotationAroundAxis } from './utils/rotations.js'

import EarthMap from "../assets/maps/blue-marble-oct.jpg"
import EarthNormalMap from "../assets/maps/8k_earth_normal_map.jpg"


function Scene() {
  const controlsRef = useRef();

  return (
    <>
      <Sun position={[0, 0, 100]} />

      <Globe />

      <Starfield
        radius={300}
        depth={150}
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

