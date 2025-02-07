import PropTypes from "prop-types";

const RidePopUp = (props) => {
	return (
		<div>
			<h5
				className="p-1 text-center absolute top-0 w-[93%]"
				onClick={() => props.setIsNewRideAvailable(false)}
			>
				<i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
			</h5>
			<h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>
			<div className="flex items-center justify-between  mt-4">
				<div className="flex gap-3 items-center">
					<img
						className="rounded-full h-10 w-10 object-cover"
						src="https://static.vecteezy.com/system/resources/thumbnails/041/646/466/small/ai-generated-portrait-of-handsome-young-man-png.png"
						alt="captain photo"
					/>
					<h2 className="text-lg font-medium">{`${props.ride?.user.fullname.firstname} ${props.ride?.user.fullname.lastname}`}</h2>
				</div>
				<h5 className="text-lg font-semibold">2.2 KM</h5>
			</div>
			<div className="flex gap-2 justify-between flex-col items-center">
				<div className="w-full mt-5">
					<div className="flex items-center gap-5 border-b-2 p-3">
						<i className="text-lg ri-map-pin-fill"></i>
						<div>
							<h3 className="text-lg font-medium">562/11-A</h3>
							<p className="text-gray-600 text-sm -mt-1">
								{props.ride?.pickup}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-5 border-b-2 p-3">
						<i className="text-lg ri-map-pin-fill"></i>
						<div>
							<h3 className="text-lg font-medium">562/11-A</h3>
							<p className="text-gray-600 text-sm -mt-1">
								{props.ride?.destination}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-5  p-3">
						<i className="text-lg ri-currency-line"></i>
						<div>
							<h3 className="text-lg font-medium">
								₹{props.ride?.fare}
							</h3>
							<p className="text-gray-600 text-sm -mt-1">
								Cash, Cash
							</p>
						</div>
					</div>
				</div>
				<button
					onClick={() => {
						props.confirmRide();
						props.setConfirmRidePanel(true);
					}}
					className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg"
				>
					Confirm
				</button>
				<button
					onClick={() => {
						props.setIsNewRideAvailable(false);
					}}
					className="w-full mt-5 bg-gray-200 text-black font-semibold p-2 rounded-lg"
				>
					Ignore
				</button>
			</div>
		</div>
	);
};

RidePopUp.propTypes = {
	setIsNewRideAvailable: PropTypes.func.isRequired,
	setConfirmRidePanel: PropTypes.func.isRequired,
	confirmRide: PropTypes.func.isRequired,
	ride: PropTypes.object,
};

export default RidePopUp;
