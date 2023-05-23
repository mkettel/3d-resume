import { useFrame, useLoader } from '@react-three/fiber'
import { Decal, SoftShadows, BakeShadows, Float, OrbitControls, Text, Text3D } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import Floor from './Floor.jsx'
import TextWords from './TextWords.jsx'
import Lights from './Lights.jsx'
import LastName from './LastName.jsx'


export default function Experience()
{
    // States
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);

    // Refs
    const resumePlane = useRef()
    const float = useRef() // floating 3D text
    const stickerBall = useRef() // sticker ball
    const lastName = useRef() // last name 3d text

    const vec = new THREE.Vector3()

    // camera position for resume
    // const xPosition = 0
    // const yPosition = 0
    // const zPosition = 4.7

    const xPosition = -1
    const yPosition = -5
    const zPosition = 4.7

    const lookAtPos = new THREE.Vector3()




    // move camera to resume
    useFrame(state =>
    {
      // lookAtPos.x = Math.sin(state.clock.getElapsedTime() * 0.5)


      if (clicked) {

        state.camera.position.lerp(vec.set(-1.35, 0, 4.7), 0.04)
        state.camera.lookAt(resumePlane.current.position.x, resumePlane.current.position.y, resumePlane.current.position.z)
        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 50, 0.04)
        state.camera.updateProjectionMatrix()
        float.current.position.lerp(vec.set(0, 0, -1.3), 0.03)
        float.current.scale.lerp(vec.set(.85, .85, .85), 0.03)

        lastName.current.scale.lerp(vec.set(.85, .85, .85), 0.03)
        lastName.current.position.lerp(vec.set(0, 0, -1.5), 0.03)
      } else {
        state.camera.lookAt(resumePlane.current.position.x, resumePlane.current.position.y, resumePlane.current.position.z)
        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 60, 0.04)
        state.camera.position.lerp(vec.set(-3.1, -.1, 6.3), 0.03)
        state.camera.updateProjectionMatrix()
        float.current.position.lerp(vec.set(-1, -1.6, -1), 0.03)
        float.current.scale.lerp(vec.set(1.2, 1.2, 1.2), 0.03)

        lastName.current.scale.lerp(vec.set(1.2, 1.2, 1.2), 0.03)
        lastName.current.position.lerp(vec.set(0, 0, 0), 0.03)
      }
      return null;

    })

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

    // useState for texture in case i want to make a button to switch textures
    const [texture, setTexture] = useState(darkResume);

    // Click on resume make function
   function changeTexture() {
      if (texture === darkResume) {
        setTexture(resume)
      } else {
        // resumePlane.current.material.map = resume
        setTexture(darkResume)
      }
    }

    // Font for 3d Text
    const chillaxFont = './fonts/chillax-font.json'
    const latoLight = './fonts/lato-light.json'
    const latoBold = './fonts/lato-bold.json'


    return <>

        {/* <Perf position="top-left" /> */}

        {/* <BakeShadows /> */}
        <SoftShadows frustum={ 1.25 } size={ 0.005 } near={ 9.5 } samples={ 17 } rings={ 11 } />
        <OrbitControls makeDefault />

        {/* Lights */}
        <Lights />

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
            <meshStandardMaterial map={ texture } side={THREE.DoubleSide} metalness={1} roughness={3} color={'transparent'} />
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

      {/* Full Stack Dev Letters */}
      <Text3D
        font={latoBold}
        // lay on floor on back
        rotation={[-Math.PI / 4, 0, 0]}
        position={[-2.8, -2, .3]}
        scale={[.2, .2, .2]}
        letterSpacing={.15}
        >
          Full Stack Developer
        <meshBasicMaterial color={'#262626'} castShadow  />
      </Text3D>
      {/* color: 262626 */}
      {/* rotation={[-Math.PI / 4, 0, 0]} */}

      {/* Sphere Under Name */}
      {/* <mesh ref={stickerBall} position={[2, -1.4, 1]} onClick={changeTexture} rotation={[0, 0, 0]} scale={[.4, .4, .4]}  >
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial color={'blue'} roughness={1.5} metalness={.3}  />
        <Decal position={[-.55, .5, 1.2 ]} rotation={[0, 0, 0]} scale={[1.2, 1.2, 1.2]} map={threeIcon} map-anisotropy={16} />
        <Decal position={[Math.PI / 3.7, .8, -1 ]} rotation={[0, 0, 0]} scale={[1, 1, 1]} map={reactIcon} map-anisotropy={16} />
        <Decal position={[1, -.2, 1 ]} rotation={[0, 0, 0]} scale={[.9, .9, .9]} map={jsIcon} map-anisotropy={16} />
      </mesh> */}


      {/* Adding my name text */}
      <Float ref={float} speed={.001} rotationIntensity={.05} floatIntensity={.1} floatingRange={[-.9, 0]} position={[-6.5, -1.8, -1]} scale={.8}  >
        <TextWords />
      </Float>

      <Float ref={lastName} speed={.001} rotationIntensity={.05} floatIntensity={.1} floatingRange={[-.9, 0]} position={[1.3, -1.8, -1]} scale={.8} >
        <LastName />
      </Float>

      {/* Adding the Floor */}
      <Floor />

    </>
}

// Changes:
// changed color of name text and made thinner diff font
// changed font of full stack dev letters
// raised the resume plane
