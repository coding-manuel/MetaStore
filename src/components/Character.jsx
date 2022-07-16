import * as THREE from 'three';
import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { useGLTF, useAnimations } from '@react-three/drei';
import useKeyboardInput from '../hooks/useKeyboardInput';

export default function Model({ camera }) {
  const group = useRef(null);
  const { nodes, materials, animations } = useGLTF('/src/assets/models/character/model_male.glb');
  const { actions } = useAnimations(animations, group);
  const {
    moveForward, moveBackward, moveLeft, moveRight, sprint,
  } = useKeyboardInput();

  const currentPosition = new THREE.Vector3();
  const currentLookAt = new THREE.Vector3();
  const decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
  const acceleration = new THREE.Vector3(1, 0.25, 50.0);
  const velocity = new THREE.Vector3(0, 0, 0);

  const [selectedAction, setSelectedAction] = useState('idle');

  const calculateOffset = (vector) => {
    const idealLookat = vector;
    idealLookat.applyQuaternion(group.current.quaternion);
    idealLookat.add(group.current.position);
    return idealLookat;
  };

  function updateCameraTarget(delta) {
    const idealOffset = calculateOffset(new THREE.Vector3(0, 20, -30));
    const idealLookat = calculateOffset(new THREE.Vector3(0, 10, 50));

    const t = 1.0 - 0.001 ** delta;

    currentPosition.lerp(idealOffset, t);
    currentLookAt.lerp(idealLookat, t);

    camera.position.copy(currentPosition);
    camera.lookAt(currentLookAt);
  }

  const updatePosition = (delta) => {
    setSelectedAction('idle');
    const newVelocity = velocity;
    const frameDecceleration = new THREE.Vector3(
      newVelocity.x * decceleration.x,
      newVelocity.y * decceleration.y,
      newVelocity.z * decceleration.z,
    );
    frameDecceleration.multiplyScalar(delta);
    frameDecceleration.z = Math.sign(frameDecceleration.z)
      * Math.min(Math.abs(frameDecceleration.z), Math.abs(newVelocity.z));

    newVelocity.add(frameDecceleration);

    const controlObject = group.current;
    const Q = new THREE.Quaternion();
    const A = new THREE.Vector3();
    const R = controlObject.quaternion.clone();

    const acc = acceleration.clone();

    if (moveForward) {
      if (sprint) {
        acc.multiplyScalar(2.0);
        setSelectedAction('jog');
      } else {
        setSelectedAction('walk');
        newVelocity.z += acc.z * delta;
      }
    }

    if (moveBackward) {
      newVelocity.z -= acc.z * delta;
      setSelectedAction('walk_back');
    }

    if (moveLeft) {
      A.set(0, 1, 0);
      Q.setFromAxisAngle(
        A,
        4.0 * Math.PI * delta * acceleration.y,
      );
      R.multiply(Q);
    }

    if (moveRight) {
      A.set(0, 1, 0);
      Q.setFromAxisAngle(
        A,
        4.0 * -Math.PI * delta * acceleration.y,
      );
      R.multiply(Q);
    }

    controlObject.quaternion.copy(R);

    const oldPosition = new THREE.Vector3();
    oldPosition.copy(controlObject.position);

    const forward = new THREE.Vector3(0, 0, 1);
    forward.applyQuaternion(controlObject.quaternion);
    forward.normalize();

    const sideways = new THREE.Vector3(1, 0, 0);
    sideways.applyQuaternion(controlObject.quaternion);
    sideways.normalize();

    sideways.multiplyScalar(newVelocity.x * delta);
    forward.multiplyScalar(newVelocity.z * delta);

    controlObject.position.add(forward);
    controlObject.position.add(sideways);

    group.current.position.copy(controlObject.position);
    // updateCameraTarget(delta);
  };

  useFrame((state, delta) => {
    // updatePosition(delta);
  });

  useEffect(() => {
    actions[selectedAction]?.reset().fadeIn(0.5).play();
    return () => void actions[selectedAction]?.fadeOut(0.5);
  }, [selectedAction]);

  //   const [mesh, api] = useSphere(() => ({
  //     mass: 2, type: 'Dynamic', position: [0, 1, 0], ...props,
  //   }));

  return (
    <group castShadow scale={10} ref={group} dispose={null}>
      <group name="Scene">
        <group name="Model_Body">
          <primitive object={nodes.Hips} />
          <skinnedMesh
          castShadow
            name="Bind"
            geometry={nodes.Bind.geometry}
            material={materials['Wolf3D_Eye.007']}
            skeleton={nodes.Bind.skeleton}
            morphTargetDictionary={nodes.Bind.morphTargetDictionary}
            morphTargetInfluences={nodes.Bind.morphTargetInfluences}
          />
          <skinnedMesh
          castShadow
            name="EyeLeft"
            geometry={nodes.EyeLeft.geometry}
            material={materials['Wolf3D_Eye.008']}
            skeleton={nodes.EyeLeft.skeleton}
            morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
          />
          <skinnedMesh
          castShadow
            name="EyeRight"
            geometry={nodes.EyeRight.geometry}
            material={materials['Wolf3D_Eye.008']}
            skeleton={nodes.EyeRight.skeleton}
            morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
          />
          <skinnedMesh
          castShadow
            name="Hair"
            geometry={nodes.Hair.geometry}
            material={materials['Wolf3D_Hair.004']}
            skeleton={nodes.Hair.skeleton}
          />
          <skinnedMesh
          castShadow
            name="Head_1"
            geometry={nodes.Head_1.geometry}
            material={materials['Wolf3D_Skin.004']}
            skeleton={nodes.Head_1.skeleton}
            morphTargetDictionary={nodes.Head_1.morphTargetDictionary}
            morphTargetInfluences={nodes.Head_1.morphTargetInfluences}
          />
          <skinnedMesh
          castShadow
            name="Top"
            geometry={nodes.Top.geometry}
            material={materials['Wolf3D_Outfit_Top.006']}
            skeleton={nodes.Top.skeleton}
          />
          <skinnedMesh
          castShadow
            name="Shoes"
            geometry={nodes.Shoes.geometry}
            material={materials['Wolf3D_Outfit_Footwear.005']}
            skeleton={nodes.Shoes.skeleton}
          />
          <skinnedMesh
          castShadow
            name="Skin"
            geometry={nodes.Skin.geometry}
            material={materials['Wolf3D_Body.005']}
            skeleton={nodes.Skin.skeleton}
          />
          <skinnedMesh
          castShadow
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
