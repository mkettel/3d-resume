import { useFrame, useLoader } from '@react-three/fiber'
import { Backdrop, MeshReflectorMaterial, SoftShadows } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export default function Floor() {

  const [ marbleColor, marbleNormal, marbleRough, MarbleDis ] = useLoader(TextureLoader, [
    './environmentMaps/Marble020_1K-JPG/Marble020_1K_Color.jpg',
    './environmentMaps/Marble020_1K-JPG/Marble020_1K_NormalGL.jpg',
    './environmentMaps/Marble020_1K-JPG/Marble020_1K_Roughness.jpg',
    './environmentMaps/Marble020_1K-JPG/Marble020_1K_Displacement.jpg',
  ])

  return <>


    {/* make a floor for the resume */}
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow >
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
          mirror={0.7}
          resolution={1024}
          mixBlur={1}
          mixStrength={.2}
          blur={blur || [5, 5]}
          metalness={0.2}
          map={marbleColor}
          normalMap={marbleNormal}
          roughnessMap={marbleRough}
          displacementMap={MarbleDis}
          displacementScale={0.1}
          />
      </mesh>

      <SoftShadows />

      {/* <Backdrop
          floor={1} // Stretches the floor segment, 0.25 by default
          segments={20} // Mesh-resolution, 20 by default
          radius={5} // Radius of curvature, 5 by default
          smoothness={5} // Number of subdivisions, 5 by default
          scale={[15, 7, 4]}
          position={[0, -2, -10]}
        >
          <meshStandardMaterial color="#353540" metalness={.2} roughness={1} />
        </Backdrop> */}

  </>
}
