import React, { Suspense, useRef, useEffect, useState } from "react";
import {
  ZapparCanvas,
  InstantTracker,
  ZapparCamera,
} from "@zappar/zappar-react-three-fiber";
import { Loader as MantineLoader } from "@mantine/core";
import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import {
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
  PerspectiveCamera,
  Html,
  useProgress,
} from "@react-three/drei";
import Character from "../Components/Character";

function Experience() {
  let [placementMode, setPlacementMode] = useState(true);
  function Loader() {
    const { progress } = useProgress();
    return (
      <Html center>
        <MantineLoader />
      </Html>
    );
  }
  return (
    <div style={{ height: "90vh" }}>
      <ZapparCanvas dpr={[1, 2]} shadows>
        <ambientLight intensity={0.2} />

        <ZapparCamera />
        <InstantTracker
          placementMode={placementMode}
          placementCameraOffset={[0, 0, -5]}
        >
          <Suspense fallback={<Loader />}>{/* <Character /> */}</Suspense>
        </InstantTracker>
        <Environment preset="city" />
      </ZapparCanvas>
      <button
        id="zappar-placement-ui"
        onClick={() => {
          setPlacementMode((currentPlacementMode) => !currentPlacementMode);
        }}
        tabIndex={0}
      >
        Tap here to
        {placementMode ? " place " : " pick up "}
        the object
      </button>
    </div>
  );
}

export default Experience;
