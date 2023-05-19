import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Stars } from '@react-three/drei'


const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        camera={ {
            fov: 50,
            near: 0.1,
            far: 200,
            position: [ -2.1, -.1, 5.3 ]
        } }
    >
        <Stars saturation={1} radius={60} />
        <Experience />
    </Canvas>
)
