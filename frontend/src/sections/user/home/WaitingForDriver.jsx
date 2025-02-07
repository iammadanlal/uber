import PropTypes from "prop-types";

const WaitingForDriver = ({ setWaitingForDriver, ride }) => {
	return (
		<div>
			<h5
				className="p-1 text-center absolute top-0 w-[93%]"
				onClick={() => setWaitingForDriver(false)}
			>
				<i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
			</h5>

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
					<p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
					<h1 className="text-lg font-semibold">{ride?.otp}</h1>
				</div>
			</div>

			<div className="flex gap-2 justify-between flex-col items-center">
				<div className="w-full mt-5">
					<div className="flex items-center gap-5 p-3 border-b-2">
						<i className="ri-map-pin-user-fill"></i>
						<div>
							<h3 className="text-lg font-medium">562/11-A</h3>
							<p className="text-gray-600 text-sm -mt-1">
								{ride?.pickup}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-5 border-b-2 p-3">
						<i className="text-lg ri-map-pin-fill"></i>
						<div>
							<h3 className="text-lg font-medium">562/11-A</h3>
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
		</div>
	);
};

export default WaitingForDriver;

WaitingForDriver.propTypes = {
	setWaitingForDriver: PropTypes.func.isRequired,
	ride: PropTypes.object,
};
