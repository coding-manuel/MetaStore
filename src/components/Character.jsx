import React, { useRef, useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { useGLTF, useAnimations, useHelper } from "@react-three/drei";
import { TextureLoader } from "three";
import useCharacterStore from "../store/characterStore";

export default function Model() {
  const group = useRef(null);
  const { nodes, materials, animations } = useGLTF(
    "/assets/models/male_model.glb"
  );

  const { actions } = useAnimations(animations, group);

  const [selectedAction, setSelectedAction] = useState("idle");

  useEffect(() => {
    actions[selectedAction]?.reset().fadeIn(0.5).play();
    return () => void actions[selectedAction]?.fadeOut(0.5);
  }, [selectedAction]);

  const shapeKeys = useCharacterStore((state) => state.shapeKeys);

  const material = useRef(null);

  const topTexture = useCharacterStore((state) => state.texture.top);

  const [tpTexture, setTpTexture] = useState(
    useLoader(TextureLoader, topTexture)
  );

  useEffect(() => {
    customLoader();
  }, [topTexture]);

  const customLoader = () => {
    const x = useLoader(TextureLoader, topTexture);
    x.flipY = false;
    // setTpTexture(x);
    material.current.map = x;
    // console.log(material.current);
  };

  return (
    <group
      castShadow
      scale={10}
      position={[0, -10, 0]}
      ref={group}
      dispose={null}
    >
      <group name="Scene">
        <group name="Male_Body">
          <primitive object={nodes.Hips} />
          <skinnedMesh
            name="Body"
            geometry={nodes.Body.geometry}
            material={materials["Wolf3D_Body.001"]}
            skeleton={nodes.Body.skeleton}
            morphTargetDictionary={nodes.Bottom.morphTargetDictionary}
            morphTargetInfluences={[shapeKeys.hands]}
          />
          <skinnedMesh
            name="Bottom"
            geometry={nodes.Bottom.geometry}
            material={materials["Wolf3D_Outfit_Bottom.001"]}
            skeleton={nodes.Bottom.skeleton}
            morphTargetDictionary={nodes.Bottom.morphTargetDictionary}
            morphTargetInfluences={[
              shapeKeys.stomach,
              shapeKeys.waist,
              shapeKeys.butt,
              shapeKeys.thighs,
              shapeKeys.calves,
            ]}
          />
          <skinnedMesh
            name="EyeLeft"
            geometry={nodes.EyeLeft.geometry}
            material={materials["Wolf3D_Eye.001"]}
            skeleton={nodes.EyeLeft.skeleton}
            morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
          />
          <skinnedMesh
            name="EyeRight"
            geometry={nodes.EyeRight.geometry}
            material={materials["Wolf3D_Eye.001"]}
            skeleton={nodes.EyeRight.skeleton}
            morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
          />
          <skinnedMesh
            name="Hair"
            geometry={nodes.Hair.geometry}
            material={materials["Wolf3D_Hair.001"]}
            skeleton={nodes.Hair.skeleton}
          />
          <skinnedMesh
            name="Top"
            geometry={nodes.Top.geometry}
            material={materials["Wolf3D_Outfit_Top.001"]}
            skeleton={nodes.Top.skeleton}
            morphTargetDictionary={nodes.Top.morphTargetDictionary}
            morphTargetInfluences={[
              shapeKeys.stomach,
              shapeKeys.waist,
              shapeKeys.chest,
              shapeKeys.butt,
            ]}
          >
            <meshStandardMaterial
              ref={material}
              // map={tpTexture}
            ></meshStandardMaterial>
          </skinnedMesh>
          <skinnedMesh
            name="Teeth"
            geometry={nodes.Teeth.geometry}
            material={materials["Wolf3D_Teeth.001"]}
            skeleton={nodes.Teeth.skeleton}
            morphTargetDictionary={nodes.Teeth.morphTargetDictionary}
            morphTargetInfluences={nodes.Teeth.morphTargetInfluences}
          />
          <skinnedMesh
            name="Shoes"
            geometry={nodes.Shoes.geometry}
            material={materials["Wolf3D_Outfit_Footwear.001"]}
            skeleton={nodes.Shoes.skeleton}
          />
          <skinnedMesh
            name="Head_1"
            geometry={nodes.Head_1.geometry}
            material={materials["Wolf3D_Skin.001"]}
            skeleton={nodes.Head_1.skeleton}
            morphTargetDictionary={nodes.Head_1.morphTargetDictionary}
            morphTargetInfluences={nodes.Head_1.morphTargetInfluences}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/assets/models/male_model.glb");
