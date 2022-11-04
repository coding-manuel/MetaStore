import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Room = () => {
  const gltf = useLoader(GLTFLoader, "src/assets/models/room.glb");
  return <primitive scale={[2, 2, 2]} object={gltf.scene} />;
};

export default Room;
