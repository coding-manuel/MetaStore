import React, { useRef, useState } from "react"
import { ARButton, XR, useHitTest } from "@react-three/xr"
import { Canvas } from "@react-three/fiber"
import { Environment, Html } from "@react-three/drei"
import Character from "../components/Creator/Character"
import {
  Container,
  Box,
  Button,
  Center,
  Group,
  Loader,
  Stack,
} from "@mantine/core"
import "./ar.css"

function Experience() {
  const [select, setSelect] = useState(false)
  return (
    <Container>
      <div>
        <ARButton />
        <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 2, 0] }}>
          <XR referenceSpace="local-floor">
            {select ? <Character /> : <Marker />}
            <ambientLight intensity={0.2} />
            <Character />
            <Environment preset="city" />
          </XR>
        </Canvas>
      </div>
      <Box sx={{ width: "100%", height: 500 }}>
        <model-viewer
          src="/assets/models/male_model_final.glb"
          ar
          camera-controls
          touch-action="pan-y"
          alt="A 3D model of an astronaut"
          xr-environment
          width={500}
        ></model-viewer>
      </Box>
    </Container>
  )
}

export function Marker() {
  const marker = useRef()

  useHitTest((hitTestMatrix) => {
    if (marker.current) {
      hitTestMatrix.decompose(
        marker.current.position,
        marker.current.quaternion,
        marker.current.scale
      )
    }
  })
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
  )
}

export default Experience
