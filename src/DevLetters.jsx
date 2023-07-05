import { Text3D } from '@react-three/drei'
import { useState, useEffect } from 'react';

export default function DevLetters(props) {

  // Font for 3d Text
  const chillaxFont = './fonts/chillax-font.json'
  const latoLight = './fonts/lato-light.json'
  const latoBold = './fonts/lato-bold.json'

  // Resizing for Mobile
  const [letterScale, setLetterScale] = useState(.2);
  const [letterPosition, setLetterPosition] = useState([-2.8, -2, .3]);

  useEffect(() => {
    function handleResize() {
      const { innerWidth } = window;
      const isMobile = innerWidth <= 768; // Adjust the breakpoint for mobile devices
      const scale = isMobile ? .15 : .2; // Adjust the scale values for mobile
      const position = isMobile ? [-2.5, -2, .3] : [-2.8, -2, .3]
      setLetterScale(scale);
      setLetterPosition(position)
    }
    window.addEventListener('resize', handleResize);
  handleResize(); // Call the function initially

  return () => {
    window.removeEventListener('resize', handleResize);
  };
  }, []);


  return <>

    <Text3D
      font={latoBold}
      // lay on floor on back
      // rotation={[-Math.PI / 4, 0, 0]}
      rotation={[-Math.PI / 4, 0, 0]}
      // position={[-2.8, -2, .3]}
      position={letterPosition}
      scale={letterScale}
      letterSpacing={.15}
      height={.2}

      >
        Full Stack Developer
      <meshBasicMaterial color={'#262626'} castShadow  />
    </Text3D>
  </>
}
