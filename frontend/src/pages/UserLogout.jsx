import axios from "axios";
import { useCallback, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
	const navigate = useNavigate();

	const logout = useCallback(async () => {
		const response = await axios.get(
			import.meta.env.VITE_BASE_URI + "/users/logout",
			{
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			}
		);
		if (response.statusText === "OK") {
			localStorage.removeItem("token");
			navigate("/login");
		}
	}, [navigate]);

	useLayoutEffect(() => {
		logout();
	}, [logout]);

	return <div></div>;
};

export default UserLogout;
