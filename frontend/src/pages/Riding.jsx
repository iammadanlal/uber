import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../contexts/SocketContext";

const Riding = () => {
	const location = useLocation();
	const { ride } = location.state;
	const { socket } = useContext(SocketContext);
	const navigate = useNavigate();

	socket.on("ride-ended", () => {
		navigate("/home");
	});

	return (
		<div className="h-screen">
			<Link
				to={"/home"}
				className="fixed right-2 top-2 w-10 h-10 bg-white flex items-center justify-center rounded-full"
			>
				<i className="ri-home-5-line text-lg font-medium"></i>
			</Link>
			<div className="h-1/2">
				<img
					className="h-full w-full object-cover"
					src="https://cdn.dribbble.com/users/914217/screenshots/4506553/media/7be2be6f43f64c27946d1068a602ece1.gif?resize=400x0"
					alt="uber map image"
				/>
			</div>
			<div className="h-1/2 p-4">
				<div className="flex items-center justify-between">
					<img
						src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
						alt=""
						className="h-12"
					/>
					<div className="text-right">
						<h2 className="text-lg font-medium">
							{ride?.captain.fullname.firstName}
						</h2>
						<h4 className="text-xl font-semibold -mt-1 -mb-1">
							{ride?.captain.vehicle.plate}
						</h4>
						<p className="text-sm text-gray-600">
							Maruti Suzuki Alto
						</p>
					</div>
				</div>

				<div className="flex gap-2 justify-between flex-col items-center">
					<div className="w-full mt-5">
						<div className="flex items-center gap-5 border-b-2 p-3">
							<i className="text-lg ri-map-pin-fill"></i>
							<div>
								<h3 className="text-lg font-medium">
									562/11-A
								</h3>
								<p className="text-gray-600 text-sm -mt-1">
									{ride?.destination}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-5  p-3">
							<i className="text-lg ri-currency-line"></i>
							<div>
								<h3 className="text-lg font-medium">
									₹ {ride?.fare}
								</h3>
								<p className="text-gray-600 text-sm -mt-1">
									Cash, Cash
								</p>
							</div>
						</div>
					</div>
				</div>
				<button className="w-full mt-5 bg-green-600 p-3 text-white font-semibold p-2 rounded-lg">
					Make a Payment
				</button>
			</div>
		</div>
	);
};

export default Riding;
