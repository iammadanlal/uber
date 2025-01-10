const { validationResult } = require("express-validator");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");

module.exports.registerCaptain = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { fullname, email, password, vehicle } = req.body;

	const isCaptainAlreadyExist = await captainModel.findOne({ email });
	if (isCaptainAlreadyExist) {
		return res.status(400).json({ message: "Email already exist" });
	}

	const hashedPassword = await captainModel.hashPassword(password);
	const captain = await captainService.createCaptain({
		fullname,
		email,
		password: hashedPassword,
		vehicle,
	});

	const token = captain.generateAuthToken();
	res.cookie("token", token);
	return res.status(201).json({ token, captain });
};
