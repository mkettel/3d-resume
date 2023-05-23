import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Stars, View, Bounds, PerspectiveCamera } from '@react-three/drei'
import { useRef } from 'react'


export default function App() {

  const ref = useRef()
  const view = useRef()

  return <>

    <div ref={ref} className="container">
      <div className="view" ref={view} />
      <Canvas eventSource={ref} className='canvas' shadows >
          <View index={1} track={view} >
            <PerspectiveCamera makeDefault fov={50} near={0.1} far={200} position={[-3.1, -.1, 6.3]} />
              <Stars saturation={0} radius={60} speed={1.5} fade />
              <Experience />
          </View>
      </Canvas>
    </div>
  </>
}
