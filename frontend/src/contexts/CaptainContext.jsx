import React, { useState } from "react";

export const CaptainContext = React.createContext();

const CaptainProvider = ({ children }) => {
	const [captain, setCaptain] = useState({});
	return (
		<CaptainContext.Provider value={{ captain, setCaptain }}>
			{children}
		</CaptainContext.Provider>
	);
};

export default CaptainProvider;
