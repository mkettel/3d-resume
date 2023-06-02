import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Planet() {
  const stickerBall = useRef(); // sticker ball

  useFrame(() => {
    stickerBall.current.rotation.y += 0.01;
    stickerBall.current.rotation.x += 0.01;
    // rotate around the scene like a planet
    stickerBall.current.position.y = Math.sin(Date.now() * 0.00005) * 20;
    stickerBall.current.position.x = Math.cos(Date.now() * 0.00005) * 30;
  });

  return (
    <>
      <mesh
        ref={stickerBall}
        position={[35, 5, -30]}
        rotation={[0, 0, 0]}
        scale={[0.4, 0.4, 0.4]}
      >
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color={"red"}
          roughness={1.5}
          metalness={0.3}
          specular={1}
          emissive={"red"}
          emissiveIntensity={2}
        />
      </mesh>
    </>
  );
}
