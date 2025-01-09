const mongoose = require("mongoose");

function connectToDB() {
	mongoose.connect(process.env.DB_URL);

	const db = mongoose.connection;

	db.on("error", (error) => {
		console.error(error);
	});

	db.once("open", () => {
		console.log("Connected to database");
	});
}

module.exports = connectToDB;
