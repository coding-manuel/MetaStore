import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import {EffectComposer, SMAA} from '@react-three/postprocessing';
import {
  Environment, OrbitControls, PerspectiveCamera
} from '@react-three/drei';
import Character from './Character';

function Experience() {
  return (
    <Canvas dpr={[1, 2]} shadows>
      <color attach="background" args={["black"]} />
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />
      <OrbitControls  minPolarAngle={Math.PI / 2.3} maxPolarAngle={Math.PI / 2.3} />
      <Suspense fallback={null}>
        <EffectComposer>
          <PerspectiveCamera makeDefault fov={50} position={[0, 20, 13]} />
          <Character />
        </EffectComposer>
      </Suspense>
      <Environment preset="city" />
    </Canvas>
  );
}

export default Experience;
