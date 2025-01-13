import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import CaptainLogin from "./pages/CaptainLogin";
import UserSignup from "./pages/UserSignup";
import CaptainSignup from "./pages/CaptainSignup";
import Start from "./pages/Start";
import ProtectedRoute from "./sections/routes/ProtectedRoute";
import UserLogout from "./pages/UserLogout";
import CaptainProtectedRoute from "./sections/routes/CaptainProtectedRoute";
import CaptainLogout from "./pages/CaptainLogout";
import CaptainHome from "./pages/CaptainHome";

const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Start />} />
				<Route path="/login" element={<UserLogin />} />
				<Route path="/signup" element={<UserSignup />} />
				<Route path="/captain-login" element={<CaptainLogin />} />
				<Route path="/captain-signup" element={<CaptainSignup />} />
				<Route
					path="/home"
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/user/logout"
					element={
						<ProtectedRoute>
							<UserLogout />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/captain-home"
					element={
						<CaptainProtectedRoute>
							<CaptainHome />
						</CaptainProtectedRoute>
					}
				/>
				<Route
					path="/captain/logout"
					element={
						<CaptainProtectedRoute>
							<CaptainLogout />
						</CaptainProtectedRoute>
					}
				/>
			</Routes>
		</div>
	);
};

export default App;
