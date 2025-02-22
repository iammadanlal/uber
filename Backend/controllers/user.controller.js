const blackListTokenModel = require("../models/blackListToken.model");
const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { fullname, email, password } = req.body;

	const isUserAlreadyExist = await userModel.findOne({ email });
	if (isUserAlreadyExist) {
		return res.status(400).json({ message: "Email already exist" });
	}

	const hashedPassword = await userModel.hashPassword(password);

	const user = await userService.createUser({
		fullname,
		email,
		password: hashedPassword,
	});
	const { password: _, ...userWithoutPassword } = await user.toObject();
	const token = user.generateAuthToken();

	res.cookie("token", token);

	res.status(201).json({ token, user: userWithoutPassword });
};

module.exports.loginUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { email, password } = req.body;

	const user = await userModel.findOne({ email }).select("+password");

	if (!user) {
		return res.status(401).json({ message: "Invalid email or password" });
	}

	const isMatch = await user.comparePassword(password);

	if (!isMatch) {
		return res.status(400).json({ message: "Invalid email or password" });
	}
	const { password: _, ...userWithoutPassword } = await user.toObject();

	const token = user.generateAuthToken();
	res.cookie("token", token);

	res.status(200).json({ token, user });
};

module.exports.getUserProfile = async (req, res) => {
	res.status(200).send(req.user);
};

module.exports.logoutUser = async (req, res) => {
	res.clearCookie("token");
	const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
	await blackListTokenModel.create({ token });
	res.status(200).json({ message: "Logged out successfully" });
};
