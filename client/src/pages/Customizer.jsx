import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import config from "../config/config";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
	AiPicker,
	ColorPicker,
	CustomButton,
	FilePicker,
	Tab,
} from "../components";

const Customizer = () => {
	const snap = useSnapshot(state);

	const [file, setFile] = useState("");

	const [prompt, setPrompt] = useState("");
	const [generatingImg, setGeneratingImg] = useState(false);

	const [activEditorTab, setActiveEditorTab] = useState("");
	const [activeFilterTab, setActiveFilterTab] = useState({
		logoShirt: true,
		stylishShirt: false,
	});

	// show tab content deepeending on the tab
	const generateTabContent = () => {
		switch (activEditorTab) {
			case "colorpicker":
				return <ColorPicker />;
			case "filepicker":
				return (
					<FilePicker
						file={file}
						setFile={setFile}
						readFile={readFile}
					/>
				);
			case "aipicker":
				return <AiPicker />;

			default:
				null;
		}
	};

	const handleDecals = (type, result) => {
		const decalType = DecalTypes[types];

		state[decalType.stateProperty] = result;

		if (!activeFilterTab[decalType.FilterTab]) {
			handleActiveFilterTab(decalType.FilterTab);
		}
	};

	const handleActiveFilterTab = (tabname) => {
		switch (tabname) {
			case "logoShirt":
				state.isLogoTexture = !activeFilterTab[tabname];
				break;
			case "stylishShirt":
				state.isFullTexture = !activeFilterTab[tabname];
			default:
				state.isFullTexture = true;
				state.isLogoTexture = false;
		}
	};

	const readFile = (type) => {
		reader(file).then((result) => {
			handleDecals(type, result);
			setActiveEditorTab("");
		});
	};

	return (
		<AnimatePresence>
			{!snap.intro && (
				<>
					<motion.div
						key="custom"
						className="absolute top-0 left-0 z-10"
						{...slideAnimation("left")}
					>
						<div className="flex items-center min-h-screen">
							<div className="editortabs-container tabs">
								{EditorTabs.map((tab) => (
									<Tab
										key={tab.name}
										tab={tab}
										handleClick={() => setActiveEditorTab(tab.name)}
									/>
								))}

								{generateTabContent()}
							</div>
						</div>
					</motion.div>

					<motion.div
						className="absolute z-10 top-5 right-5"
						{...fadeAnimation}
					>
						<CustomButton
							type="filled"
							title="Go Back"
							handleClick={() => (state.intro = true)}
							customStyles="w-fit px-4 py-2.5 font-bold text-sm"
						/>
					</motion.div>

					<motion.div
						className="filtertabs-container"
						{...slideAnimation("up")}
					>
						{FilterTabs.map((tab) => (
							<Tab
								key={tab.name}
								tab={tab}
								isFilterTab
								isActivetab=""
								handleClick={() => {}}
							/>
						))}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default Customizer;
