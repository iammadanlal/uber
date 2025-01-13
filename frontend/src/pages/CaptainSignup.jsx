import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainContext } from "../contexts/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
	const navigate = useNavigate();
	const { setCaptain } = useContext(CaptainContext);

	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [vehicle, setVehicle] = useState({
		color: "",
		plate: "",
		type: "car",
		capacity: 1,
	});
	const onFormInputChange = (e) => {
		const key = e.target.id;
		const value = e.target.value;
		setForm({ ...form, [key]: value });
	};
	const onVehicleInputChange = (e) => {
		const key = e.target.id;
		const value = e.target.value;
		setVehicle({ ...vehicle, [key]: value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { firstName, lastName, ...rest } = form;
		const newCaptain = {
			fullname: {
				firstName,
				lastName,
			},
			...rest,
			vehicle,
		};
		const response = await axios.post(
			import.meta.env.VITE_BASE_URI + "/captains/register",
			newCaptain
		);
		if (response.status === 201) {
			setCaptain(response.data.captain);
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
					<h3 className="text-lg font-medium mb-2">
						Vehicle Information
					</h3>
					<div className="flex gap-4 mb-5">
						<input
							className="bg-[#eee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
							type="text"
							required
							placeholder="Color"
							value={vehicle.color}
							onChange={onVehicleInputChange}
							id="color"
						/>
						<input
							className="bg-[#eee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
							type="text"
							required
							placeholder="Plate"
							value={vehicle.plate}
							onChange={onVehicleInputChange}
							id="plate"
						/>
					</div>
					<div className="flex gap-4 mb-5">
						<input
							className="bg-[#eee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
							type="text"
							required
							placeholder="Capacity"
							value={vehicle.capacity}
							onChange={onVehicleInputChange}
							id="capacity"
						/>
						<select
							className="bg-[#eee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
							required
							placeholder="Type"
							value={vehicle.type}
							onChange={onVehicleInputChange}
							id="type"
						>
							<option value="car">Car</option>
							<option value="motorcycle">Motorcycle</option>
							<option value="auto">Auto</option>
						</select>
					</div>
					<button
						type="submit"
						className="bg-[#000] mb-7 rounded px-4 py-2 border w-full text-lg text-white"
					>
						Signup
					</button>
				</form>
				<p className="text-center">
					Already have an account?{" "}
					<Link to="/captain-login" className="text-blue-600">
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

export default CaptainSignup;
