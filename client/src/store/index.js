import { proxy } from "valtio";

const state = proxy({
	intro: true,
	color: "#EEFBD48",
	isLogoTexturee: true,
	isFullTexturee: true,
	logoDecal: "./threejs.png",
	fullDecal: "./threejs.png",
});

export default state;
