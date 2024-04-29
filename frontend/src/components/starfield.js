import { Stars } from "@react-three/drei";
import React from "react";

// TODO: add shooting stars

function Starfield({ radius = 300, depth = 90, count = 5000, factor = 7, saturation = 0, fade = true, speed = 1, noise = 9 }) {
  return (
    <>
      <Stars
        radius={radius}
        depth={depth}
        count={count}
        factor={factor}
        saturation={saturation}
        fade={fade}
        speed={speed}
        noise={noise}
      />
    </>
  )
};

export default Starfield;
