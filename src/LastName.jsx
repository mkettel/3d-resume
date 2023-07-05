import { useFrame, useLoader } from '@react-three/fiber'
import { Text3D } from '@react-three/drei'
import { useState, useEffect } from 'react'


export default function LastName() {


  const chillaxFont = './fonts/chillax-font.json'
  const latoLight = './fonts/lato-light.json'
  const latoBold = './fonts/lato-bold.json'


  // Resizing for Mobile
  const [letterScale, setLetterScale] = useState(.3);
  const [letterPosition, setLetterPosition] = useState([-3.3, -.07 , 1.3]);
  const [letterRotation, setLetterRotation] = useState([0, -.1, 0])

  useEffect(() => {
    function handleResize() {
      const { innerWidth } = window;
      const isMobile = innerWidth <= 768; // Adjust the breakpoint for mobile devices
      const scale = isMobile ? .14 : .3; // Adjust the scale values for mobile
      const position = isMobile ? [-1.7, 1.3 , .2] : [.3, 1, .3];
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
    // position={[1.5, -1.6, -1.5]}
    // position={[1.3, -1.6, -1.3]}
    rotation={letterRotation}
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
      KETTELKAMP
    <meshBasicMaterial color={'#A4A5A3'} />
  </Text3D>

  </>
}



// FC7753 old color for text
