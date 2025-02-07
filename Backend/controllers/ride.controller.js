const { validationResult } = require("express-validator");
const rideService = require("../services/ride.service");
const mapService = require("../services/map.service");
const rideModel = require("../models/ride.model");
const { sendMessageToSocketId } = require("../socket");

module.exports.createRide = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { pickup, destination, vehicleType } = req.body;
	try {
		const ride = await rideService.createRide({
			user: req.user._id,
			pickup,
			destination,
			vehicleType,
		});
		res.status(201).json(ride);

		const pickupCoordinates = await mapService.getAddressCoordinate(pickup);

		console.log("pickup", pickupCoordinates, typeof pickupCoordinates.lat);

		const captainsInRadius = await mapService.getCaptainsInTheRadius(
			pickupCoordinates.lat,
			pickupCoordinates.lng,
			5
		);
		console.log("ride cap", captainsInRadius);
		ride.otp = "";

		const rideWithUser = await rideModel
			.findById(ride._id)
			.populate("user");

		captainsInRadius.map((captain) => {
			sendMessageToSocketId(captain.socketId, {
				event: "new-ride",
				data: rideWithUser,
			});
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Internal server error" });
	}
};

module.exports.getFare = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { pickup, destination } = req.query;
	try {
		const fare = await rideService.getFare(pickup, destination);
		res.status(200).json(fare);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

module.exports.confirmRide = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { rideId } = req.body;
	try {
		const ride = await rideService.confirmRide(rideId, req.captain._id);
		res.status(200).json(ride);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

module.exports.startRide = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { rideId, otp } = req.query;

	try {
		const ride = await rideService.startRide({
			rideId,
			otp,
			captain: req.captain,
		});

		console.log(ride);

		sendMessageToSocketId(ride.user.socketId, {
			event: "ride-started",
			data: ride,
		});

		return res.status(200).json(ride);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

module.exports.endRide = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { rideId } = req.body;

	try {
		const ride = await rideService.endRide({
			rideId,
			captain: req.captain,
		});

		sendMessageToSocketId(ride.user.socketId, {
			event: "ride-ended",
			data: ride,
		});

		return res.status(200).json(ride);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};
