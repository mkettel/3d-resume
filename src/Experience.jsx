import { useFrame, useLoader } from '@react-three/fiber'
import { Float, Stage, OrbitControls, Environment, Sky, SoftShadows, Text, SpotLightShadow, SpotLight, Text3D } from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import Floor from './Floor.jsx'
import TextWords from './TextWords.jsx'

export default function Experience()
{
    const resumePlane = useRef()

    useFrame((state, delta) =>
    {
        // cube.current.rotation.y += delta * 0.2
        // resumePlane.current.rotation.y += delta * 0.02
    })

    // File paths
    const [ resume ] = useLoader(TextureLoader, [
      './environmentMaps/bold-resume-img.png'
    ])

    // Font for 3d Text
    const fontUrl = './fonts/chillax-font.json'


    return <>


        {/* <Perf position="top-left" /> */}

        <OrbitControls makeDefault />

        {/* <directionalLight position={ [ 1, 2, 3 ] } intensity={ 2 } castShadow /> */}
        {/* light for the backside */}
        <directionalLight position={ [ -1, -2, -3 ] } intensity={ .3 } />
        <spotLight intensity={2.5} position={[10, 6, 10]} penumbra={1} angle={0.4} color={'#EFF2EF'} />

        {/* Resume Plane */}
        <mesh ref={resumePlane} scale={1.3} position={[-1.3, -.2, .1]} rotation={[0, 0, 0]} castShadow >
            <planeGeometry args={[2.5, 3, 2]}/>
            <boxGeometry args={[2.3, 3, .05]}/>
            <meshStandardMaterial map={ resume } side={THREE.DoubleSide} metalness={1} roughness={3} color={'white'} />
        </mesh>




        {/* Name 2d */}
        {/* <Text
            color={'white'}
            fontSize={.4}
            maxWidth={7}
            lineHeight={1}
            letterSpacing={0.02}
            textAlign={'center'}
            font={'./fonts/Roboto-Bold.ttf'}
            anchorX={'center'}
            anchorY={'middle'}
            position={[2.1, -1.8, .9]}
            rotation={[-.2, -.5, -.1]}
            >
            Matthew Kettelkamp
        </Text> */}


      <Text3D
        font={fontUrl}
        // lay on floor on back
        rotation={[-Math.PI / 3, 0, 0]}
        position={[-2.7, -2.0, .3]}
        scale={[.2, .2, .2]}
        >
          Full Stack Developer
        <meshBasicMaterial color={'#262626'}  />
      </Text3D>

      <Float size={1} position={[0, 0, 0]} >
        <TextWords />
      </Float>

      <Floor />

    </>
}
