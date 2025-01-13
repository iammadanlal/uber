import axios from "axios";
import { useCallback, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

const CaptainLogout = () => {
	const navigate = useNavigate();

	const logout = useCallback(async () => {
		const response = await axios.get(
			import.meta.env.VITE_BASE_URI + "/captains/logout",
			{
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			}
		);
		if (response.statusText === "OK") {
			localStorage.removeItem("token");
			navigate("/captain-login");
		}
	}, [navigate]);

	useLayoutEffect(() => {
		logout();
	}, [logout]);

	return <div></div>;
};

export default CaptainLogout;
