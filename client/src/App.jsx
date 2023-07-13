import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";

function App() {
	return (
		<main className="app transition-all ease-in">
			<div className="head-text">
				<Home />
				<Canvas />
				<Customizer />
			</div>
		</main>
	);
}

export default App;
