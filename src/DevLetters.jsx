import { Text3D } from '@react-three/drei'

export default function DevLetters() {

  // Font for 3d Text
  const chillaxFont = './fonts/chillax-font.json'
  const latoLight = './fonts/lato-light.json'
  const latoBold = './fonts/lato-bold.json'


  return <>

    <Text3D
      font={latoBold}
      // lay on floor on back
      // rotation={[-Math.PI / 4, 0, 0]}
      rotation={[-Math.PI / 4, 0, 0]}
      // position={[-2.8, -2, .3]}
      position={[-2.8, -2, .3]}
      scale={[.2, .2, .2]}
      letterSpacing={.15}
      height={.2}

      >
        Full Stack Developer
      <meshBasicMaterial color={'#262626'} castShadow  />
    </Text3D>
  </>
}
