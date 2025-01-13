import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CaptainProtectedRoute = ({ children }) => {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const [isLoading, setLoading] = useState(true);

	const verifyToken = useCallback(async () => {
		setLoading(true);
		const response = await axios.get(
			import.meta.env.VITE_BASE_URI + "/captains/profile",
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		);
		if (response.statusText === "OK") {
			setLoading(false);
			return;
		}
		navigate("/captain-login");
	}, [navigate, token]);

	useEffect(() => {
		if (!token) {
			navigate("/captain-login");
		}
		verifyToken();
	}, [token, navigate, verifyToken]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return <>{children}</>;
};

export default CaptainProtectedRoute;
