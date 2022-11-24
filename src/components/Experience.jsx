import React, { Suspense, useRef, useEffect } from "react";
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
import Character from "./Character";

function Experience() {
  function Loader() {
    const { progress } = useProgress();
    return (
      <Html center>
        <MantineLoader />
      </Html>
    );
  }
  return (
    <Canvas dpr={[1, 2]} shadows>
      <ambientLight intensity={0.2} />

      <OrbitControls
        minPolarAngle={Math.PI / 2.3}
        maxPolarAngle={Math.PI / 2.3}
      />
      <Suspense fallback={<Loader />}>
        <EffectComposer>
          <PerspectiveCamera makeDefault fov={50} position={[0, 20, 13]} />
          <Character />
          <mesh position={[0, -10, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[200, 200]} position={[0, 0, 0]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={1024}
              mixBlur={1}
              mixStrength={10}
              roughness={10}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#1a1a1a"
              metalness={0.5}
            />
          </mesh>
        </EffectComposer>
      </Suspense>
      <Environment preset="city" />
    </Canvas>
  );
}

export default Experience;
