import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import Shirt from "./Shirt";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";
import { AmbientLight } from "three";

const CanvasModel = () => {
	return (
		<Canvas>
			<AmbientLight intensity={0.5} />
			<Environment preset="city" />
			{/*<CameraRig>}
				{/*<Backdrop />*/}
			<Center>
				<Shirt />
			</Center>
			{/*</Canvas></CameraRig>*/}
		</Canvas>
	);
};

export default CanvasModel;
