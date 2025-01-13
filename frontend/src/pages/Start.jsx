import { Link } from "react-router-dom";

const Start = () => {
	return (
		<div>
			<div className="bg-cover bg-[url('./assets/home_bg.jpeg')] h-screen pt-8 flex justify-between flex-col w-full bg-red-400">
				<img
					className="w-16 ml-8"
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
					alt="uber logo"
				/>
				<div className="bg-white py-4 px-4 pb-7">
					<h2 className="font-bold text-3xl">
						Get Started with Uber
					</h2>
					<Link
						to={"/login"}
						className="block text-center w-full bg-black text-white py-3 rounded mt-5"
					>
						Continue
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Start;
