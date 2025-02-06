import PropTypes from "prop-types";

const LookingForDriver = (props) => {
	return (
		<div>
			<h5
				className="p-1 text-center absolute top-0 w-[93%]"
				onClick={() => props.setVehicleForRide(false)}
			>
				<i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
			</h5>
			<h3 className="text-2xl font-semibold mb-5">
				Looking for a Driver
			</h3>
			<div className="flex justify-between items-center flex-col gap-2">
				<img
					className="h-20"
					src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367538/assets/31/ad21b7-595c-42e8-ac53-53966b4a5fee/original/Final_Black.png"
					alt="car logo"
				/>
				<div className="w-full">
					<div className="flex items-center gap-5 border-b-2 p-3">
						<i className="text-lg ri-map-pin-fill"></i>
						<div>
							<h3 className="text-lg font-medium">562/11-A</h3>
							<p className="text-gray-600 text-sm -mt-1">
								{props.pickup}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-5 border-b-2 p-3">
						<i className="text-lg ri-map-pin-fill"></i>
						<div>
							<h3 className="text-lg font-medium">562/11-A</h3>
							<p className="text-gray-600 text-sm -mt-1">
								{props.destination}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-5  p-3">
						<i className="text-lg ri-currency-line"></i>
						<div>
							<h3 className="text-lg font-medium">
								₹{props.fare[props.vehicleType]}
							</h3>
							<p className="text-gray-600 text-sm -mt-1">
								Cash, Cash
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LookingForDriver;

LookingForDriver.propTypes = {
	setVehicleForRide: PropTypes.func,
	fare: PropTypes.object,
	pickup: PropTypes.string,
	destination: PropTypes.string,
	vehicleType: PropTypes.string,
};
