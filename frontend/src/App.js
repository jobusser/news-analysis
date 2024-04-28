import React from "react";
import { Canvas } from "@react-three/fiber";
import { CountryProvider } from './components/countryProvider';
import Scene from "./components/globeScene";
import "./App.css";


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
