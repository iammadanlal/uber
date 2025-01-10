const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({
	fullname,
	email,
	password,
	vehicle,
}) => {
	if (
		!fullname ||
		!fullname.firstName ||
		!email ||
		!password ||
		!vehicle ||
		!vehicle.color ||
		!vehicle.plate ||
		!vehicle.capacity ||
		!vehicle.type
	) {
		return res.status(400).json({ message: "All fields are required" });
	}
	const captain = captainModel.create({
		fullname,
		email,
		password,
		vehicle,
	});
	return captain;
};
