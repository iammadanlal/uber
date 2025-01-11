import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import CaptainLogin from "./pages/CaptainLogin";

const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<UserLogin />} />
				<Route path="/captain-login" element={<CaptainLogin />} />
			</Routes>
		</div>
	);
};

export default App;
