import { useFrame, useLoader } from '@react-three/fiber'
import { Text3D } from '@react-three/drei'
import { useState, useEffect } from 'react'


export default function TextWords() {


  const chillaxFont = './fonts/chillax-font.json'
  const latoLight = './fonts/lato-light.json'
  const latoBold = './fonts/lato-bold.json'

  // Resizing for Mobile
  const [letterScale, setLetterScale] = useState(.3);
  const [letterPosition, setLetterPosition] = useState([-1.1, -.3, 1.3]);
  const [letterRotation, setLetterRotation] = useState([0, -.1, 0])

  useEffect(() => {
    function handleResize() {
      const { innerWidth } = window;
      const isMobile = innerWidth <= 768; // Adjust the breakpoint for mobile devices
      const scale = isMobile ? .15 : .3; // Adjust the scale values for mobile
      const position = isMobile ? [-4.7, -.8, 1.3] : [-1.1, -.3, 1.3];
      const rotation = isMobile ? [0, 0, 0] : [0, -.1, 0];
      setLetterScale(scale);
      setLetterPosition(position);
      setLetterRotation(rotation);
    }
    window.addEventListener('resize', handleResize);
  handleResize(); // Call the function initially

  return () => {
    window.removeEventListener('resize', handleResize);
  };
  }, []);


  return <>

{/* 3D Text */}
  <Text3D
    font={latoLight }
    position={letterPosition}
    // position={[-.9, -1.6, -.2]}
    // rotation={[-.2, -.5, -.1]}
    rotation={letterRotation}
    // size={.4}
    scale={letterScale}
    bevelEnabled
    // bevelSize={0.01}
    // bevelSegments={10}
    curveSegments={138}
    // bevelThickness={0.01}
    // change thickness of text
    depth={0.09}
    // change depth of text
    height={0.09}
    letterSpacing={.2}
    >
      MATTHEW
    <meshBasicMaterial color={'#A4A5A3'} />
  </Text3D>

  </>
}
