import React, { useRef, useState } from "react";
import { ARButton, XR, useHitTest } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";
import { Environment, Html } from "@react-three/drei";
import Character from "../components/Creator/Character";
import { Box, Button, Center, Group, Loader, Stack } from "@mantine/core";

function Experience() {
  const [select, setSelect] = useState(false);
  return (
    // <div>
    //   <ARButton />
    //   <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 2, 0] }}>
    //     <XR referenceSpace="local-floor">
    //       {select ? <Character /> : <Marker />}
    //       <ambientLight intensity={0.2} />
    //       <Html>
    //         <button onClick={() => setSelect(!select)}>chicken</button>
    //       </Html>
    //       {/* <Character /> */}
    //       <Environment preset="city" />
    //     </XR>
    //   </Canvas>
    // </div>
    <model-viewer
      style={{ height: "100vh", width: "100vw" }}
      src="/assets/models/male_model.glb"
      ar
      ar-scale="fixed"
      camera-controls
      shadow-intensity="1"
      autoplay
      exposure="1"
      xr-environment
    >
      <Group
        slot="poster"
        position="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <Loader />
      </Group>
      {/* <Stack
        slot="ar-button"
        justify="flex-end"
        sx={{ width: "100%", height: "100%" }}
      >
        <Button>View in AR</Button>
      </Stack> */}
    </model-viewer>
  );
}

export function Marker() {
  const marker = useRef();

  useHitTest((hitTestMatrix) => {
    if (marker.current) {
      hitTestMatrix.decompose(
        marker.current.position,
        marker.current.quaternion,
        marker.current.scale
      );
    }
  });
  return (
    <mesh ref={marker} visible userData={{ test: "hello" }} castShadow>
      <sphereGeometry attach="geometry" args={[0.3, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
}

export default Experience;
