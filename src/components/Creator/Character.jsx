import React, { useRef, useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { useGLTF, useAnimations, useHelper } from "@react-three/drei";
import { TextureLoader } from "three";
import useCharacterStore from "../../store/characterStore";
import { XR, ARButton, useHitTest } from "@react-three/xr";

export default function Model({ addShoe }) {
  const group = useRef(null);
  const { nodes, materials, animations } = useGLTF(
    "/assets/models/male_model.glb"
  );

  const shapeKeys = useCharacterStore((state) => state.shapeKeys);
  const topTexture = useCharacterStore((state) => state.texture.top);
  const materialData = useCharacterStore((state) => state.material);

  const { actions } = useAnimations(animations, group);

  const [selectedAction, setSelectedAction] = useState(
    "Armature.001|mixamo.com|Layer0"
  );

  useHitTest((hitTestMatrix) => {
    if (group.current) {
      hitTestMatrix.decompose(
        group.current.position,
        group.current.quaternion,
        group.current.scale
      );
    }
  });

  useEffect(() => {
    actions[selectedAction]?.reset().fadeIn(0.5).play();
    return () => void actions[selectedAction]?.fadeOut(0.5);
  }, [selectedAction]);

  const material = useRef(null);

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
            material={materials["Body-Shade-Brown-01"]}
            skeleton={nodes.Body.skeleton}
            morphTargetDictionary={nodes.Body.morphTargetDictionary}
            morphTargetInfluences={nodes.Body.morphTargetInfluences}
          />
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
          <skinnedMesh
            name="Hair"
            geometry={nodes.Hair.geometry}
            material={materials["Hair-Black-01"]}
            skeleton={nodes.Hair.skeleton}
          />
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
              ref={material}
              // map={tpTexture}
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
            material={materials["Head-Shade-Brown-01"]}
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
