import { Canvas } from "@react-three/fiber"
import { Model } from "../../models/Scene"
import { OrbitControls } from "@react-three/drei"

const ContainerOpening = () => {

  return (
    <Canvas className="ContainerCanvas" style={{ width: "40vw", height: "30vh", position: "absolute"}}>
        {/* <OrbitControls /> */}
        <ambientLight intensity={0.5} />
        <Model position={[-100, -200, -300]} />
    </Canvas>
    )
}

export default ContainerOpening