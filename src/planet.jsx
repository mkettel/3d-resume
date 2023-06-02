import React, { useRef, useState } from 'react'
import { Decal } from '@react-three/drei'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useFrame, useLoader } from '@react-three/fiber'




export default function Planet() {

  const stickerBall = useRef() // sticker ball
  const pointLight = useRef() // point light for sticker ball

//   // useState for texture in case i want to make a button to switch textures
//   const [texture, setTexture] = useState(darkResume);

//   // Click on resume make function
//  function changeTexture() {
//     if (texture === darkResume) {
//       setTexture(resume)
//     } else {
//       // resumePlane.current.material.map = resume
//       setTexture(darkResume)
//     }
//   }

// light for the planet ball



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


    <mesh ref={stickerBall} position={[35, 5, -30]} rotation={[0, 0, 0]} scale={[.5, .5, .5]}  >
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshStandardMaterial color={'red'} roughness={1.5} metalness={.3} specular={1} emissive={'red'} emissiveIntensity={2}/>
      {/* <Decal position={[0, .5, 1 ]} rotation={[0, 0, 0]} scale={[1.2, 1.2, 1.2]} map={threeIcon} map-anisotropy={16} />
      <Decal position={[-.2, .5, -1 ]} rotation={[0, 0, 0]} scale={[1, 1, 1]} map={reactIcon} map-anisotropy={16} />
      <Decal position={[.2, -.5, 1.1 ]} rotation={[0, 0, 0]} scale={[.7, .7, .7]} map={jsIcon} map-anisotropy={16} /> */}
    </mesh>

  </>
}
