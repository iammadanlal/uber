import { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const onFormInputChange = (e) => {
		const key = e.target.id;
		const value = e.target.value;
		setForm({ ...form, [key]: value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(form);
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
						Login
					</button>
				</form>
				<p className="text-center">
					New here?{" "}
					<Link to="/signup" className="text-blue-600">
						Create new Account
					</Link>
				</p>
			</div>
			<div>
				<button className="bg-[#11ff60] mb-7 rounded px-4 py-2 border w-full text-lg text-white">
					Signin as Captain
				</button>
			</div>
		</div>
	);
};

export default UserLogin;
