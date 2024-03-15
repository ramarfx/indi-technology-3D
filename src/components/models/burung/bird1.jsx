import { useAnimations, useGLTF } from "@react-three/drei";
import burung from "../../../assets/3D/burung/burung1.glb";
import adjusctScale from "../../../constant/adjustScale";
import { useEffect, useRef } from "react";

const Bird1 = ({position = [0, 0, 0]}) => {
  const birdRef = useRef();
  const { scene, animations, nodes } = useGLTF(burung);
  const { actions, names } = useAnimations(animations, birdRef);

  useEffect(() => {
    names.forEach((name) => {
      actions[name].play();
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    })
  }, [actions, names]);

  return (
    <group castShadow receiveShadow>
      <group ref={birdRef}>
        <primitive object={scene} key={nodes} position={position} scale={adjusctScale()} />
      </group>
    </group>
  );
};

export default Bird1;
