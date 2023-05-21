import { useFrame, useLoader } from '@react-three/fiber'
import { Text3D } from '@react-three/drei'


export default function TextWords() {


  const chillaxFont = './fonts/chillax-font.json'


  return <>

{/* 3D Text */}
  <Text3D
    font={chillaxFont}
    position={[.4, -.5, .1]}
    rotation={[-.2, -.5, -.1]}
    scale={[.29, .29, .29]}
    bevelEnabled
    bevelSize={0.01}
    bevelSegments={10}
    curveSegments={128}
    bevelThickness={0.01}
    >
      Matt Kettelkamp
    <meshBasicMaterial color={'#C6AD94'} />
  </Text3D>




  </>
}
