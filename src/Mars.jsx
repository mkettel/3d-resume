import React, { useRef, useState } from 'react'
import { Decal } from '@react-three/drei'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useFrame, useLoader } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'




export default function Mars() {

  const stickerBall = useRef() // sticker ball

  useFrame(() => {
    stickerBall.current.rotation.y += 0.01
    stickerBall.current.rotation.x += 0.01
    // rotate around the scene like a planet
    stickerBall.current.position.y = Math.sin(Date.now() * 0.00005) * 20
    stickerBall.current.position.x = Math.cos(Date.now() * 0.00005) * 30
  })

  const [ threeIcon, reactIcon, jsIcon ] = useLoader(TextureLoader, [
    './environmentMaps/threejs-icon.png',
    './environmentMaps/react-sticker.png',
    './environmentMaps/js-icon.png'
  ])

  return <>
    <ambientLight intensity={.1} />

    <EffectComposer>
      <Bloom mipmapBlur />
    </EffectComposer>


    <mesh
    ref={stickerBall}
    position={[35, 5, -30]}
    rotation={[0, 0, 0]}
    scale={[.5, .5, .5]}
    >
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshStandardMaterial toneMapped={false} color="white" emissive="orange" emissiveIntensity={1.7} />
      <Decal position={[0, .5, 1 ]} rotation={[0, 0, 0]} scale={[1.2, 1.2, 1.2]} map={threeIcon} map-anisotropy={16} />
      <Decal position={[-.2, .5, -1 ]} rotation={[0, 0, 0]} scale={[1, 1, 1]} map={reactIcon} map-anisotropy={16} />
    </mesh>

  </>
}
