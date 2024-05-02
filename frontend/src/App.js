import React from "react";
import { Canvas } from "@react-three/fiber";

import "./App.css";
import { CountryProvider } from './components/context/countryProvider';
import Scene from "./components/scene/scene";
import Tooltip from './components/ui/tooltip';
import UI from "./components/ui/UI";

export default function App() {
  return (
    <div className="App">
      <CountryProvider>

        <Canvas camera={{ position: [2.525, 1.81196, -3.916745] }}>
          <Scene />
        </Canvas>

        <Tooltip />

        < UI />

      </CountryProvider>
    </div>
  );
}
