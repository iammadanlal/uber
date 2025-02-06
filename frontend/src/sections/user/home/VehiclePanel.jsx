import PropTypes from "prop-types";

const VehiclePanel = (props) => {
	return (
		<div>
			<h5
				className="p-1 text-center absolute top-0 w-[93%]"
				onClick={() => props.setVehiclePanel(false)}
			>
				<i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
			</h5>
			<h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
			<div
				className="flex items-center justify-between border-2 border-black rounded-xl w-full p-3 my-2"
				onClick={() => {
					props.setConfirmRidePanel(true);
					props.setVehicleType("car");
				}}
			>
				<img
					className="h-12"
					src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367538/assets/31/ad21b7-595c-42e8-ac53-53966b4a5fee/original/Final_Black.png"
					alt="car logo"
				/>
				<div className="ml-2 w-1/2">
					<h4 className="font-medium text-base">
						UberGo{" "}
						<span>
							<i className="ri-user-3-fill"></i>4
						</span>
					</h4>
					<h5 className="font-medium text-sm">2 mins away</h5>
					<p className="font-normal text-xs text-gray-600">
						Affordable, compact rides
					</p>
				</div>
				<h2 className="text-2xl font-semibold">₹{props.fare.car}</h2>
			</div>
			<div
				className="flex items-center justify-between border-2 border-black rounded-xl w-full p-3 my-2"
				onClick={() => {
					props.setConfirmRidePanel(true);
					props.setVehicleType("moto");
				}}
			>
				<img
					className="h-12"
					src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
					alt="moto logo"
				/>
				<div className="ml-2 w-1/2">
					<h4 className="font-medium text-base">
						UberMoto{" "}
						<span>
							<i className="ri-user-3-fill"></i>4
						</span>
					</h4>
					<h5 className="font-medium text-sm">2 mins away</h5>
					<p className="font-normal text-xs text-gray-600">
						Affordable, compact rides
					</p>
				</div>
				<h2 className="text-2xl font-semibold">₹{props.fare.moto}</h2>
			</div>
			<div
				className="flex items-center justify-between border-2 border-black rounded-xl w-full p-3 my-2"
				onClick={() => {
					props.setConfirmRidePanel(true);
					props.setVehicleType("auto");
				}}
			>
				<img
					className="h-12"
					src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
					alt="auto logo"
				/>
				<div className="ml-2 w-1/2">
					<h4 className="font-medium text-base">
						UberAuto{" "}
						<span>
							<i className="ri-user-3-fill"></i>4
						</span>
					</h4>
					<h5 className="font-medium text-sm">2 mins away</h5>
					<p className="font-normal text-xs text-gray-600">
						Affordable, compact rides
					</p>
				</div>
				<h2 className="text-2xl font-semibold">₹{props.fare.auto}</h2>
			</div>
		</div>
	);
};

export default VehiclePanel;

VehiclePanel.propTypes = {
	setVehiclePanel: PropTypes.func.isRequired,
	setConfirmRidePanel: PropTypes.func.isRequired,
	setVehicleType: PropTypes.func.isRequired,
	fare: PropTypes.object.isRequired,
};
