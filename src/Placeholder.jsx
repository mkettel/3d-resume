

export default function Placeholder(props) {


  return <>

    <mesh {...props} >
      <boxGeometry args={[2, 3.5, .5, 2, 2, 2]} />
      <meshBasicMaterial wireframe color={'white'} />
    </mesh>

  </>
}
