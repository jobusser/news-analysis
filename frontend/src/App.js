import React from "react";
import { Canvas } from "@react-three/fiber";

import "./App.css";
import { CountryProvider } from './components/countryProvider';
import Scene from "./components/globeScene";

export default function App() {
  return (
    <div className="App">
      <CountryProvider>
        <Canvas>
          <Scene />
        </Canvas>
      </CountryProvider>
    </div>
  );
}
