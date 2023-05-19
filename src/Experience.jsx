import { useFrame, useLoader } from '@react-three/fiber'
import { Float, Stage, OrbitControls, Environment, Sky, SoftShadows, Text, SpotLightShadow, SpotLight, Text3D } from '@react-three/drei'
import { useRef, useState } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import Floor from './Floor.jsx'
import TextWords from './TextWords.jsx'

export default function Experience()
{
    const [clicked, setClicked] = useState(false);
    const resumePlane = useRef()
    const camera = useRef()
    const float = useRef()

    const vec = new THREE.Vector3()

    // camera position for resume
    const xPosition = 0
    const yPosition = 0
    const zPosition = 4.7

    // move camera to resume
    useFrame(state =>
    {
      if (clicked) {
        // state.camera.lookAt(resumePlane.current.position)
        state.camera.position.lerp(vec.set(xPosition, yPosition, zPosition), 0.04)
        state.camera.updateProjectionMatrix()
        // move the name vertical against the resume
        float.current.position.lerp(vec.set(.25, 0, 0), 0.04)
        float.current.scale.lerp(vec.set(.75, .75, .75), 0.04)
      } else {
        state.camera.position.lerp(vec.set(-3.1, -.1, 6.3), 0.03)
        state.camera.updateProjectionMatrix()
        float.current.position.lerp(vec.set(0, 0, 0), 0.04)
        float.current.scale.lerp(vec.set(1, 1, 1), 0.04)
      }
      return null;

    })

    // on click, move camera to face resume
    const resumeClick = (e) => {
      console.log('clicked')

    }

    // File paths
    const [ resume, newResume, darkResume ] = useLoader(TextureLoader, [
      './environmentMaps/bold-resume-img.png',
      './environmentMaps/new-resume.png',
      './environmentMaps/dark-resume.png'
    ])

    // Font for 3d Text
    const fontUrl = './fonts/chillax-font.json'


    return <>


        {/* <Perf position="top-left" /> */}

        <OrbitControls makeDefault />

        {/* light for the backside */}
        <directionalLight position={ [ -1, -2, -3 ] } intensity={ .3 } />
        <spotLight intensity={2.5} position={[10, 6, 10]} penumbra={1} angle={0.4} color={'#EFF2EF'} />


        {/* Resume Plane */}
        <mesh ref={resumePlane} onClick={() => setClicked(prevClicked => !prevClicked)} scale={1.3} position={[-1.3, -.05, .1]} rotation={[0, 0, 0]} castShadow >
            <planeGeometry args={[2.5, 3.5, 2]}/>
            <boxGeometry args={[2.3, 3, .05]}/>
            <meshStandardMaterial map={ darkResume } side={THREE.DoubleSide} metalness={1} roughness={3} color={'white'} />
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

      {/* Adding my name text */}
      <Float ref={float} size={.5} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} >
        <TextWords />
      </Float>

      {/* Adding the Floor */}
      <Floor />

    </>
}
