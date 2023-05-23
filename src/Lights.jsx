import { Float } from '@react-three/drei'
import { useRef } from 'react'

export default function Lights() {


  const spotlight = useRef() // spotlight for resume


  return <>

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

  </>
}
