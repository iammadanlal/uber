import React, { useState } from "react";

const UserContext = React.createContext({});

export default function UserProvider({ children }) {
	const [user, setUser] = useState({
		email: "",
		fullname: {
			firstName: "",
			lastName: "",
		},
	});
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}
