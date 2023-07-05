import { useFrame, useLoader } from '@react-three/fiber'
import { Decal, SoftShadows, BakeShadows, Float, OrbitControls, Text, Text3D} from '@react-three/drei'
import { useRef, useState, useEffect, Suspense } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import Floor from './Floor.jsx'
import TextWords from './TextWords.jsx'
import Lights from './Lights.jsx'
import LastName from './LastName.jsx'
import Mars from './Mars.jsx'
import DevLetters from './DevLetters.jsx'


export default function Experience()

{
    // States
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [orbitControls, setOrbitControls] = useState(true);

    // Refs
    const resumePlane = useRef()
    const float = useRef() // floating 3D text
    const lastName = useRef() // last name 3d text

    const vec = new THREE.Vector3()

    // Resizing for Mobile
    const [imageScale, setImageScale] = useState(1.3)
    const [imagePosition, setImagePosition] = useState([-1.3, -.05, .1])

    useEffect(() => {
      function handleResize() {
        const { innerWidth } = window;
        const isMobile = innerWidth <= 768; // Adjust the breakpoint for mobile devices
        const scale = isMobile ? 1 : 1.3; // Adjust the scale values for mobile
        const position = isMobile ? [-1.3, -.5, .1] : [-1.3, -.05, .1]
        setImageScale(scale);
        setImagePosition(position);
      }
      window.addEventListener('resize', handleResize);
    handleResize(); // Call the function initially

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    }, []);



    // move camera to resume
    // Look into wouter for world position
    useFrame(state =>
    {
      if (clicked) {

        state.camera.position.lerp(vec.set(-1.35, 0, 4.7), 0.04)
        state.camera.lookAt(resumePlane.current.position.x, resumePlane.current.position.y, resumePlane.current.position.z)
        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 52, 0.04)
        state.camera.updateProjectionMatrix()
        // float.current.position.lerp(vec.set(0, 0, -1.5), 0.03)
        // float.current.scale.lerp(vec.set(.9, .9, .9), 0.03)

        // lastName.current.scale.lerp(vec.set(.9, .9, .9), 0.03)
        // lastName.current.position.lerp(vec.set(0, 0, -1.5), 0.03)
      } else {
        state.camera.lookAt(resumePlane.current.position.x, resumePlane.current.position.y, resumePlane.current.position.z)
        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 60, 0.04)
        // state.camera.position.lerp(vec.set(-3.1, -.1, 6.3), 0.03) // allows camera to move freely if not clicked
        state.camera.updateProjectionMatrix()
        // float.current.position.lerp(vec.set(0, 0, 0), 0.03)
        // float.current.scale.lerp(vec.set(1.2, 1.2, 1.2), 0.03)

        // lastName.current.scale.lerp(vec.set(1.2, 1.2, 1.2), 0.03)
        // lastName.current.position.lerp(vec.set(0, 0, 0), 0.03)
      }
      return null;
    })

    // Hover is pointer on resume
    useEffect(() => {
      document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])


    // File paths
    const [ resume, newResume, darkResume, threeIcon, reactIcon, jsIcon, dirtbike ] = useLoader(TextureLoader, [
      './environmentMaps/bold-resume-img.png',
      './environmentMaps/new-resume.png',
      './environmentMaps/dark-resume.png',
      './environmentMaps/threejs-icon.png',
      './environmentMaps/react-sticker.png',
      './environmentMaps/js-icon.png',
      './environmentMaps/dirtbike.jpg'
    ])

    const [texture, setTexture] = useState(darkResume);


    return <>

        {/* <Perf position="top-middle" /> */}

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
          scale={imageScale}
          position={imagePosition}
          rotation={[0, 0, 0]}
          castShadow >
              <planeGeometry args={[2.5, 3.5, 2]}/>
              <boxGeometry args={[2.3, 3, .05]}/>
              <meshStandardMaterial map={ texture } side={THREE.DoubleSide} metalness={1} roughness={3} color={'white'} />
          </mesh>



      {/* Full Stack Dev Letters */}
      <DevLetters />

      {/* Planet */}
      <Mars />

      {/* Adding my name text */}
      <Float ref={float} speed={.001} rotationIntensity={.05} floatIntensity={.1} floatingRange={[-.9, 0]} position={[1.3, 1.8, -1]} scale={.8}  >
        <TextWords />
      </Float>

      <Float ref={lastName} speed={.001} rotationIntensity={.05} floatIntensity={.1} floatingRange={[-.9, 0]} position={[1.3, 1.2, -1]} scale={.8} >
        <LastName />
      </Float>

      {/* Adding the Floor */}
      <Floor />

    </>
}
