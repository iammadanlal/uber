import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./contexts/UserContext";
import CaptainProvider from "./contexts/CaptainContext.jsx";
import SocketProvider from "./contexts/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<CaptainProvider>
			<UserProvider>
				<SocketProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</SocketProvider>
			</UserProvider>
		</CaptainProvider>
	</StrictMode>
);
