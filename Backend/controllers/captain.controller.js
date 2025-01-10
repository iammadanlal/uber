const { validationResult } = require("express-validator");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const blackListTokenModel = require("../models/blackListToken.model");

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
	const { password: _, ...captainWithoutPassword } = await captain.toObject();
	const token = captain.generateAuthToken();
	res.cookie("token", token);
	return res.status(201).json({ token, captain: captainWithoutPassword });
};

module.exports.loginCaptain = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { email, password } = req.body;

	const captain = await captainModel.findOne({ email }).select("+password");

	if (!captain) {
		return res.status(401).json({ message: "Invalid email or password" });
	}

	const isMatch = await captain.comparePassword(password);

	if (!isMatch) {
		return res.status(400).json({ message: "Invalid email or password" });
	}

	const { password: _, ...captainWithoutPassword } = await captain.toObject();

	const token = captain.generateAuthToken();
	res.cookie("token", token);

	res.status(200).json({ token, captain: captainWithoutPassword });
};

module.exports.getCaptainProfile = async (req, res) => {
	return res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res) => {
	res.clearCookie("token");
	const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
	await blackListTokenModel.create({ token });
	res.status(200).json({ message: "Logout successfully" });
};
