const userModel = require("../models/user.model");

module.exports.createUser = async ({ fullname, email, password }) => {
	if (!fullname || !fullname.firstname || !email || !password) {
		throw new Error("All fields are required");
	}
	const user = userModel.create({
		fullname,
		email,
		password,
	});
	return user;
};
