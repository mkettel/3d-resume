import { useFrame, useLoader } from '@react-three/fiber'
import { Text3D } from '@react-three/drei'


export default function TextWords() {


  const chillaxFont = './fonts/chillax-font.json'
  const latoLight = './fonts/lato-light.json'
  const latoBold = './fonts/lato-bold.json'


  return <>

{/* 3D Text */}
  <Text3D
    font={latoLight }
    // position={[-.9, -1.6, -.2]}
    // rotation={[-.2, -.5, -.1]}
    rotation={[0, -.3, 0]}
    // size={.4}
    scale={[.4, .4, .4]}
    bevelEnabled
    // bevelSize={0.01}
    // bevelSegments={10}
    curveSegments={138}
    // bevelThickness={0.01}
    // change thickness of text
    depth={0.09}
    // change depth of text
    height={0.04}
    letterSpacing={.2}
    >
      MATTHEW
    <meshBasicMaterial color={'#A4A5A3'} />
  </Text3D>

  </>
}



// FC7753 old color for text
