import React from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/globeScene";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Canvas>
        < Suspense fallback={null} >
          <Scene />
        </ Suspense >
      </Canvas>
    </div>
  );
}
