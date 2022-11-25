import React, { useState } from "react";
import { VRButton, ARButton, XR, Controllers, Hands } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Character from "../Components/Creator/Character";

function Experience() {
  return (
    <div style={{ height: "90vh" }}>
      <ARButton />
      <Canvas dpr={[1, 2]} shadows>
        <XR referenceSpace="local">
          <Controllers />
          <ambientLight intensity={0.2} />

          <Character />
          <Environment preset="city" />
        </XR>
      </Canvas>
    </div>
  );
}

export default Experience;
