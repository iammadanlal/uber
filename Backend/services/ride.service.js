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
		fareL: fare[vehicleType],
	});

	return ride;
};
