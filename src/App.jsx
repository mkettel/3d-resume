import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Stars, View, Bounds, PerspectiveCamera } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react';


export default function App() {

  const ref = useRef()
  const view = useRef()

  // Create Loading Animation for when page is loading
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3500)
    return () => clearTimeout(timeout)
  }, [])

  return <>

    {loading ? (
      <div className="loadingContainer">
        <div className="loadingAnimation">
          <p><span id='1' className='loadLetter'>M</span><span id="2" className='loadLetter'>K</span></p>
          {/* <video autoPlay loop muted>
            <source src={'./loaders/donut-load.mp4'} type="video/mp4" />
          </video> */}
        </div>
      </div>
    ) : (
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
    )}
    <Analytics />
  </>
}
