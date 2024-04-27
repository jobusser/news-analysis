import React from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/globeScene";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  );
}
