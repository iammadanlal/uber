const { baseFare, perKmFare, perMinFare } = require("../constants/default");
const { generateOtp } = require("../utils/otp.util");
const mapService = require("./map.service");
const rideModel = require("../models/ride.model");

const getFare = async (pickup, destination) => {
	if (!pickup || !destination) {
		throw new Error("pickup and destination are required");
	}

	const distanceTime = await mapService.getDistanceTime(pickup, destination);

	const fare = {
		auto: Math.round(
			baseFare.auto +
				(distanceTime.distance.value / 1000) * perKmFare.auto +
				(distanceTime.duration.value / 60) * perMinFare.auto
		),
		car: Math.round(
			baseFare.car +
				(distanceTime.distance.value / 1000) * perKmFare.car +
				(distanceTime.duration.value / 60) * perMinFare.car
		),
		moto: Math.round(
			baseFare.moto +
				(distanceTime.distance.value / 1000) * perKmFare.moto +
				(distanceTime.duration.value / 60) * perMinFare.moto
		),
	};

	return fare;
};

module.exports.getFare = getFare;

module.exports.createRide = async ({
	user,
	pickup,
	destination,
	vehicleType,
}) => {
	if (!user || !pickup || !destination || !vehicleType) {
		throw new Error("All fields are required");
	}

	const fare = await getFare(pickup, destination);

	console.log(fare);

	const ride = rideModel.create({
		user,
		pickup,
		destination,
		otp: generateOtp(6),
		fare: fare[vehicleType],
	});

	return ride;
};

module.exports.confirmRide = async (rideId, captainId) => {
	if (!rideId || !captainId) {
		throw new Error("All fields are required");
	}

	await rideModel.findOneAndUpdate(
		{
			_id: rideId,
		},
		{
			captain: captainId,
			status: "accepted",
		}
	);

	const ride = await rideModel
		.findById(rideId)
		.populate("user")
		.populate("captain")
		.select("+otp");

	if (!ride) {
		throw new Error("Ride not found");
	}

	return ride;
};

module.exports.startRide = async ({ rideId, otp, captain }) => {
	if (!rideId || !otp) {
		throw new Error("Ride id and OTP are required");
	}

	const ride = await rideModel
		.findOne({
			_id: rideId,
		})
		.populate("user")
		.populate("captain")
		.select("+otp");

	if (!ride) {
		throw new Error("Ride not found");
	}

	if (ride.status !== "accepted") {
		throw new Error("Ride not accepted");
	}

	if (ride.otp !== otp) {
		throw new Error("Invalid OTP");
	}

	await rideModel.findOneAndUpdate(
		{
			_id: rideId,
		},
		{
			status: "ongoing",
		}
	);

	return ride;
};

module.exports.endRide = async ({ rideId, captain }) => {
	if (!rideId) {
		throw new Error("Ride id is required");
	}

	const ride = await rideModel
		.findOne({
			_id: rideId,
			captain: captain._id,
		})
		.populate("user")
		.populate("captain")
		.select("+otp");

	if (!ride) {
		throw new Error("Ride not found");
	}

	if (ride.status !== "ongoing") {
		throw new Error("Ride not ongoing");
	}

	await rideModel.findOneAndUpdate(
		{
			_id: rideId,
		},
		{
			status: "completed",
		}
	);

	return ride;
};
