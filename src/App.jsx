import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Stars, View, Bounds, PerspectiveCamera } from '@react-three/drei'
import { useRef, useState, useEffect, Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react';
import Placeholder from './Placeholder'


export default function App() {

  const ref = useRef()
  const view = useRef()

  // Create Loading Animation for when page is loading
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 4700)
    return () => clearTimeout(timeout)
  }, [])

  return <>

    {loading ? (
      <div className="loadingContainer">
        <div className="loadingAnimation">
          <p><span id='1' className='loadLetter'>M</span><span id="2" className='loadLetter'>K</span></p>
        </div>
      </div>
    ) : (
      <div ref={ref} className="container">
      <div className="view" ref={view} />
      <Canvas eventSource={ref} className='canvas' shadows >
          <View index={1} track={view} >
            <PerspectiveCamera makeDefault fov={50} near={0.1} far={200} position={[-3.1, -.1, 6.3]} />
              <Stars saturation={0} radius={60} speed={1.5} fade />
              <Suspense fallback={<Placeholder position={[-1.3, -.05, .1]} />}>
                <Experience />
              </Suspense>
          </View>
      </Canvas>
      </div>
    )}
    <Analytics />
  </>
}
