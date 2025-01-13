import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const UserSignup = () => {
	const navigate = useNavigate();
	const { setUser } = useContext(UserContext);
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const onFormInputChange = (e) => {
		const key = e.target.id;
		const value = e.target.value;
		setForm({ ...form, [key]: value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { firstName, lastName, ...rest } = form;
		const newUser = {
			fullname: {
				firstname: firstName,
				lastname: lastName,
			},
			...rest,
		};
		const response = await axios.post(
			import.meta.env.VITE_BASE_URI + "/users/register",
			newUser
		);
		if (response.status === 201) {
			setUser(response.data.user);
			localStorage.setItem("token", response.data.token);
			navigate("/home");
		}
	};

	return (
		<div className="p-7 h-screen flex flex-col justify-between">
			<div>
				<img
					alt="uber logo"
					className="w-16 mb-10"
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
				/>
				<form onSubmit={handleSubmit}>
					<h3 className="text-lg font-medium mb-2">
						What's your name
					</h3>
					<div className="flex gap-4 mb-5">
						<input
							className="bg-[#eee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
							type="text"
							required
							placeholder="First name"
							value={form.firstName}
							onChange={onFormInputChange}
							id="firstName"
						/>
						<input
							className="bg-[#eee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
							type="text"
							required
							placeholder="Last name"
							value={form.lastName}
							onChange={onFormInputChange}
							id="lastName"
						/>
					</div>

					<h3 className="text-lg font-medium mb-2">
						What's your email
					</h3>
					<input
						className="bg-[#eee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
						type="email"
						required
						placeholder="email@example.com"
						value={form.email}
						onChange={onFormInputChange}
						name=""
						id="email"
					/>
					<h3 className="text-lg font-medium mb-2">Enter Password</h3>
					<input
						className="bg-[#eee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
						type="password"
						placeholder="password"
						required
						value={form.password}
						onChange={onFormInputChange}
						name=""
						id="password"
					/>
					<button
						type="submit"
						className="bg-[#000] mb-7 rounded px-4 py-2 border w-full text-lg text-white"
					>
						Signup
					</button>
				</form>
				<p className="text-center">
					Already have an account?{" "}
					<Link to="/login" className="text-blue-600">
						Login here
					</Link>
				</p>
			</div>
			<div>
				<p className="text-xs">
					By signing up, you agree to our Terms, Privacy Policy and
					Cookies Policy
				</p>
			</div>
		</div>
	);
};

export default UserSignup;
