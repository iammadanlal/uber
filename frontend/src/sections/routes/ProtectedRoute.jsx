import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const ProtectedRoute = ({ children }) => {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const [isLoading, setLoading] = useState(true);

	const { setUser } = useContext(UserContext);

	const verifyToken = useCallback(async () => {
		try {
			setLoading(true);
			const response = await axios.get(
				import.meta.env.VITE_BASE_URI + "/users/profile",
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);
			if (response.statusText === "OK" && response.data) {
				setUser(response.data);
				setLoading(false);
				return;
			}
			localStorage.removeItem("token");
			navigate("/login");
		} catch (err) {
			console.error(err?.message);
			localStorage.removeItem("token");
			navigate("/login");
		}
	}, [navigate, token]);

	useEffect(() => {
		if (!token) {
			navigate("/login");
		}
		verifyToken();
	}, [token, navigate, verifyToken]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
