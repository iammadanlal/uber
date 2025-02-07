import React, { useState } from "react";
import PropTypes from "prop-types";

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

CaptainProvider.propTypes = {
	children: PropTypes.node,
};
