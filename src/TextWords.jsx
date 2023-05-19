import { useFrame, useLoader } from '@react-three/fiber'
import { Text3D } from '@react-three/drei'


export default function TextWords() {


  const fontUrl = './fonts/chillax-font.json'


  return <>

{/* 3D Text */}
  <Text3D
    font={fontUrl}
    position={[.4, -1, .1]}
    rotation={[-.2, -.5, -.1]}
    scale={[.29, .29, .29]}
    >
      Matt Kettelkamp
    <meshBasicMaterial color={'#C6AD94'}  />
  </Text3D>




  </>
}
