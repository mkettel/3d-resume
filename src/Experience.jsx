import { useFrame, useLoader } from '@react-three/fiber'
import { Decal, SoftShadows, BakeShadows, Float, OrbitControls, Environment, Text, SpotLightShadow, SpotLight, Text3D } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import Floor from './Floor.jsx'
import TextWords from './TextWords.jsx'


export default function Experience()
{
    // States
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);

    // Refs
    const resumePlane = useRef()
    const float = useRef() // floating 3D text
    const spotlight = useRef() // spotlight for resume
    const stickerBall = useRef() // sticker ball

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

    // useFrame(() => {
    //   stickerBall.current.rotation.y += 0.005
    //   stickerBall.current.rotation.x += 0.005
    // })


    // Hover is pointer on resume
    useEffect(() => {
      document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])


    // File paths
    const [ resume, newResume, darkResume, threeIcon, reactIcon, jsIcon ] = useLoader(TextureLoader, [
      './environmentMaps/bold-resume-img.png',
      './environmentMaps/new-resume.png',
      './environmentMaps/dark-resume.png',
      './environmentMaps/threejs-icon.png',
      './environmentMaps/react-sticker.png',
      './environmentMaps/js-icon.png'
    ])

    // Font for 3d Text
    const chillaxFont = './fonts/chillax-font.json'


    return <>


        <BakeShadows />
        <SoftShadows frustum={ 1.25 } size={ 0.005 } near={ 9.5 } samples={ 17 } rings={ 11 } />
        {/* <Perf position="top-left" /> */}

        <OrbitControls makeDefault />


        {/* Lights */}
        {/* <directionalLight position={ [ -2, -1, -3 ] } intensity={ .3 } /> */}
        <Float ref={spotlight} speed={2} rotationIntensity={1.2} position={[-1, 0, -1]} floatingRange={[1, 2]}>
          <spotLight
          intensity={2.5}
          position={[9, 6, 8]}
          penumbra={.5}
          angle={.4}
          color={'#EFF2EF'}
          castShadow
          shadow-mapSize={ [ 1024, 1024 ] }
          shadow-camera-near={ 10 }
          shadow-camera-far={ 50 }
          shadow-camera-top={ 5 }
          shadow-camera-right={ 5 }
          shadow-camera-bottom={ - 5 }
          shadow-camera-left={ - 5 }
          />
        </Float>

        {/* Resume Plane */}
        <mesh
        ref={resumePlane}
        onClick={() => setClicked(prevClicked => !prevClicked)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={1.3}
        position={[-1.3, -.05, .1]}
        rotation={[0, 0, 0]}
        castShadow >
            <planeGeometry args={[2.5, 3.5, 2]}/>
            <boxGeometry args={[2.3, 3, .05]}/>
            <meshStandardMaterial map={ darkResume } side={THREE.DoubleSide} metalness={1} roughness={3} color={'white'} />
        </mesh>


        {/* Name 2d */}
        {/* <Text
            color={'white'}
            fontSize={.18}
            maxWidth={7}
            lineHeight={1}
            letterSpacing={0.08}
            textAlign={'center'}
            font={'./fonts/Roboto-Bold.ttf'}
            anchorX={'center'}
            anchorY={'middle'}
            position={[-2.9, 1.4, .3]}
            rotation={[0, .1, Math.PI / 2]}
            >

        </Text> */}


      <Text3D
        font={chillaxFont}
        // lay on floor on back
        rotation={[-Math.PI / 4, 0, 0]}
        position={[-2.7, -2, .3]}
        scale={[.2, .2, .2]}
        >
          Full Stack Developer
        <meshBasicMaterial color={'#262626'} castShadow  />
      </Text3D>

      {/* Sphere Under Name */}
      {/* <mesh ref={stickerBall} position={[1, 1.65, -2]} rotation={[0, 0, 0]} scale={[.4, .4, .4]}  >
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial color={'blue'} roughness={1.5} metalness={.3}  />
        <Decal position={[-.55, .5, 1.2 ]} rotation={[0, 0, 0]} scale={[1.2, 1.2, 1.2]} map={threeIcon} map-anisotropy={16} />
        <Decal position={[Math.PI / 3.7, .8, -1 ]} rotation={[0, 0, 0]} scale={[1, 1, 1]} map={reactIcon} map-anisotropy={16} />
        <Decal position={[1, -.2, 1.3 ]} rotation={[0, 0, 0]} scale={[.9, .9, .9]} map={jsIcon} map-anisotropy={16} />
      </mesh> */}


      {/* Adding my name text */}
      <Float ref={float} speed={1} rotationIntensity={.5} floatIntensity={1} floatingRange={[-.1, 0]}  >
        <TextWords />
      </Float>

      {/* Adding the Floor */}
      <Floor />

    </>
}
