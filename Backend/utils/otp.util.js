const crypto = require("crypto");

module.exports.generateOtp = (n) => {
	return crypto.randomInt(Math.pow(10, n - 1), Math.pow(10, n)).toString();
};
