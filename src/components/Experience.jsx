import * as THREE from 'three';
import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, Debug } from '@react-three/cannon';
import {
  EffectComposer, SMAA, SSAO, Bloom, Noise, Vignette,
} from '@react-three/postprocessing';
import {
  Environment, PerspectiveCamera,
} from '@react-three/drei';
import Character from './Character';
import Ground from './Ground';

function Experience() {
  return (
    <Canvas dpr={[1, 2]} shadows>
      <fog attach="fog" args={['#171720', 10, 50]} />
      <color attach="background" args={['#171720']} />
      <directionalLight position={[-10, 0, -15]} intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.5} intensity={2} castShadow penumbra={1} />
      <Suspense fallback={null}>
        <EffectComposer>
          <SMAA />
          {/* <Environment near={20} far={1000} resolution={512} preset="warehouse" /> */}
          <PerspectiveCamera makeDefault position={[0, 9, 25]} />
          <Character />
          <Ground />
        </EffectComposer>
      </Suspense>
      <Environment preset="night" />
    </Canvas>
  );
}

export default Experience;
