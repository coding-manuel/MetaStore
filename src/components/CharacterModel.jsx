import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export default function Model({ ...props }) {
  const group = useRef(null);
  const { nodes, materials, animations } = useGLTF('/src/assets/models/character/model_male.glb');
  const { actions } = useAnimations(animations, group);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Model_Body">
          <primitive object={nodes.Hips} />
          <skinnedMesh
            name="Bind"
            geometry={nodes.Bind.geometry}
            material={materials['Wolf3D_Eye.007']}
            skeleton={nodes.Bind.skeleton}
            morphTargetDictionary={nodes.Bind.morphTargetDictionary}
            morphTargetInfluences={nodes.Bind.morphTargetInfluences}
          />
          <skinnedMesh
            name="EyeLeft"
            geometry={nodes.EyeLeft.geometry}
            material={materials['Wolf3D_Eye.008']}
            skeleton={nodes.EyeLeft.skeleton}
            morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
          />
          <skinnedMesh
            name="EyeRight"
            geometry={nodes.EyeRight.geometry}
            material={materials['Wolf3D_Eye.008']}
            skeleton={nodes.EyeRight.skeleton}
            morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
          />
          <skinnedMesh
            name="Hair"
            geometry={nodes.Hair.geometry}
            material={materials['Wolf3D_Hair.004']}
            skeleton={nodes.Hair.skeleton}
          />
          <skinnedMesh
            name="Head_1"
            geometry={nodes.Head_1.geometry}
            material={materials['Wolf3D_Skin.004']}
            skeleton={nodes.Head_1.skeleton}
            morphTargetDictionary={nodes.Head_1.morphTargetDictionary}
            morphTargetInfluences={nodes.Head_1.morphTargetInfluences}
          />
          <skinnedMesh
            name="Top"
            geometry={nodes.Top.geometry}
            material={materials['Wolf3D_Outfit_Top.006']}
            skeleton={nodes.Top.skeleton}
          />
          <skinnedMesh
            name="Shoes"
            geometry={nodes.Shoes.geometry}
            material={materials['Wolf3D_Outfit_Footwear.005']}
            skeleton={nodes.Shoes.skeleton}
          />
          <skinnedMesh
            name="Skin"
            geometry={nodes.Skin.geometry}
            material={materials['Wolf3D_Body.005']}
            skeleton={nodes.Skin.skeleton}
          />
          <skinnedMesh
            name="Bottom"
            geometry={nodes.Bottom.geometry}
            material={materials['Wolf3D_Outfit_Bottom.010']}
            skeleton={nodes.Bottom.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/src/assets/models/character/model_male.glb');
