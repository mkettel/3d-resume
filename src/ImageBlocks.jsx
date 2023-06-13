import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useRef, useState, useEffect } from 'react'
import { Image, Text} from '@react-three/drei'



export default function ImageBlocks() {

  const [ dirtbike, nightAgung ] = useLoader(TextureLoader, [
    './environmentMaps/dirtbike.jpg',
    './environmentMaps/night_agung.jpg'
  ])

  const cubeOne = useRef()


  return <>

    {/* Image One */}
    <mesh
      position={[2, -1.05, .5]}
      // ref={cubeOne}
      >
      {/* <sphereGeometry args={[.2, 32]} /> */}
      <boxGeometry args={[2.1, 1.8, .2]} />
      <meshStandardMaterial toneMapped={false} fog={false} />
      <Image raycast={() => null} ref={cubeOne} scale={[2, 1.4, 1]} position={[0, .1, 0.15]} url={'./environmentMaps/dirtbike.jpg'} />
    </mesh>

    {/* Image Two */}
    <group>
      <mesh
        position={[-4, -1.05, .5]}
        rotation={[0, 0, 0]}
        >
        {/* <sphereGeometry args={[.2, 32]} /> */}
        <boxGeometry args={[2.1, 1.8, .2]} />
        <meshStandardMaterial toneMapped={false} fog={false} />
        <Image raycast={() => null}  scale={[2, 1.4, 1]} position={[0, .1, 0.15]}url={'./environmentMaps/night_agung.jpg'} />
      </mesh>
      <Text maxWidth={0.1} anchorX="right" anchorY="bottom" position={[2.9, -1.9, .7]} fontSize={0.15} color={'black'}>
        Bali
      </Text>
    </group>


  </>
}


// Figure out how to make them actual images and not just textures on top of the blocks
