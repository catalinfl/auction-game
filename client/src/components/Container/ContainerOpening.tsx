import { Canvas } from "@react-three/fiber"
import { Model } from "../../models/Scene1"

const ContainerOpening = () => {

  return (
    <Canvas className="ContainerCanvas">
        <ambientLight intensity={0.5} />
        <Model position={[0, -150, -600]} />
    </Canvas>
    )
}

export default ContainerOpening