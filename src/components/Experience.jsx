import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  EffectComposer, SMAA
} from '@react-three/postprocessing';
import {
  Environment, OrbitControls, PerspectiveCamera,
} from '@react-three/drei';
import Character from './Character';
import Ground from './Ground';

function Experience() {
  return (
    <Canvas dpr={[1, 2]} shadows>
      <color attach="background" args={['#171720']} />
      <directionalLight position={[-10, 0, -15]} intensity={0.4} />
      <directionalLight position={[10, 10, 50]} intensity={0.4} />
      <OrbitControls />
      <Suspense fallback={null}>
        <EffectComposer>
          <PerspectiveCamera makeDefault position={[0, 10, 30]} />
          <Character />
          <Ground />
        </EffectComposer>
      </Suspense>
      <Environment preset="night" />
    </Canvas>
  );
}

export default Experience;
