import { createContext, useEffect } from "react";
import { io } from "socket.io-client";
import PropTypes from "prop-types";

export const SocketContext = createContext();

const socket = io(import.meta.env.VITE_BASE_URI);

const SocketProvider = ({ children }) => {
	useEffect(() => {
		socket.on("connect", () => {
			console.log("Connected to server");
		});
		socket.on("disconnect", () => {
			console.log("Disconnected to server");
		});
	}, []);

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;

SocketProvider.propTypes = {
	children: PropTypes.node,
};
