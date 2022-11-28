import React, { useRef, useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";
import { TextureLoader, Color } from "three";
import useCharacterStore from "../../store/characterStore";

export default function Model() {
  const { nodes, materials, animations } = useGLTF(
    "/assets/models/male_model.glb"
  );

  const shapeKeys = useCharacterStore((state) => state.shapeKeys);
  const materialData = useCharacterStore((state) => state.material);
  const textureData = useCharacterStore((state) => state.texture);

  const topTex = useLoader(TextureLoader, textureData.top);
  const skinTex = useLoader(
    TextureLoader,
    `/assets/skin_shades/skintone_${textureData.skin}.png`
  );
  const faceTex = useLoader(
    TextureLoader,
    `/assets/skin_shades/face_${textureData.face}.png`
  );

  const group = useRef(null);
  const hairRef = useRef(null);
  const topRef = useRef(null);
  const faceRef = useRef(null);
  const skinRef = useRef(null);
  const xd = useAnimations(animations);

  const [selectedAction, setSelectedAction] = useState(
    "Armature.001|mixamo.com|Layer0_Male Body.002"
  );

  useEffect(() => {
    console.log(nodes, materials, materialData);
    // actions[selectedAction]?.reset().fadeIn(0.5).play();
    // return () => void actions[selectedAction]?.fadeOut(0.5);
  }, [selectedAction]);

  useEffect(() => {
    topTex.flipY = false;
  }, [topTex]);

  useEffect(() => {
    faceTex.flipY = false;
  }, [faceTex]);

  useEffect(() => {
    skinTex.flipY = false;
  }, [skinTex]);

  useEffect(() => {
    hairLoader(hairRef, textureData.hair);
  }, [textureData.hair]);

  const hairLoader = (ref, color) => {
    // const x = useLoader(TextureLoader, "/assets/hairAlpha.png");
    // ref.current.map = x;
    ref.current.color = new Color(color);
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
            skeleton={nodes.Body.skeleton}
            morphTargetDictionary={nodes.Body.morphTargetDictionary}
            morphTargetInfluences={nodes.Body.morphTargetInfluences}
          >
            <meshStandardMaterial
              ref={skinRef}
              map={skinTex}
              normalMap={materials["Skin-03"].normalMap}
            ></meshStandardMaterial>
          </skinnedMesh>
          <skinnedMesh
            name="Bottom"
            geometry={nodes.Bottom.geometry}
            material={materials["Bottom-Jeans-Blue-01"]}
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
            material={materials.Eye}
            skeleton={nodes.EyeLeft.skeleton}
            morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
          />
          <skinnedMesh
            name="EyeRight"
            geometry={nodes.EyeRight.geometry}
            material={materials.Eye}
            skeleton={nodes.EyeRight.skeleton}
            morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
          />
          {materialData.glasses !== "none" && (
            <skinnedMesh
              name={materialData.glasses}
              geometry={nodes[materialData.glasses].geometry}
              material={materials[materialData.glasses]}
              skeleton={nodes[materialData.glasses].skeleton}
            />
          )}
          <skinnedMesh
            name={materialData.hairMesh}
            geometry={nodes[materialData.hairMesh].geometry}
            skeleton={nodes["Hair-02"].skeleton}
          >
            <meshStandardMaterial
              ref={hairRef}
              normalMap={materials[materialData.hairColor].normalMap}
            ></meshStandardMaterial>
          </skinnedMesh>
          <skinnedMesh
            name="Top"
            geometry={nodes.Top.geometry}
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
              map={topTex}
              ref={topRef}
            ></meshStandardMaterial>
          </skinnedMesh>
          <skinnedMesh
            name="Teeth"
            geometry={nodes.Teeth.geometry}
            material={materials.Teeth}
            skeleton={nodes.Teeth.skeleton}
            morphTargetDictionary={nodes.Teeth.morphTargetDictionary}
            morphTargetInfluences={nodes.Teeth.morphTargetInfluences}
          />
          <skinnedMesh
            name={materialData.shoe}
            geometry={nodes[materialData.shoe].geometry}
            material={materials[materialData.shoe]}
            skeleton={nodes[materialData.shoe].skeleton}
          />
          <skinnedMesh
            name="Head_1"
            geometry={nodes.Head_1.geometry}
            skeleton={nodes.Head_1.skeleton}
            morphTargetDictionary={nodes.Head_1.morphTargetDictionary}
            morphTargetInfluences={nodes.Head_1.morphTargetInfluences}
          >
            <meshStandardMaterial
              map={faceTex}
              ref={faceRef}
            ></meshStandardMaterial>
          </skinnedMesh>
        </group>
      </group>
    </group>
  );
}
