const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
	io = socketIo(server, {
		cors: {
			origin: "*",
			methods: ["GET", "POST"],
		},
	});

	io.on("connection", (socket) => {
		console.log(`Client connected: ${socket.id}`);

		socket.on("join", async (data) => {
			if (data.userType === "user") {
				await userModel.findByIdAndUpdate(data.userId, {
					socketId: socket.id,
				});
			} else if (data.userType === "captain") {
				await captainModel.findByIdAndUpdate(data.userId, {
					socketId: socket.id,
				});
			}
		});

		socket.on("update-location-captain", async (data) => {
			const { userId, location } = data;
			if (!location || !location.lat || !location.lng) {
				return socket.emit("error", "Invalid location");
			}
			await captainModel.findByIdAndUpdate(userId, {
				location: {
					type: "Point",
					coordinates: [location.lng, location.lat],
				},
			});
		});

		socket.on("disconnect", () => {
			console.log(`Client disconnected: ${socket.id}`);
		});
	});
}

const sendMessageToSocketId = (socketId, messageObject) => {
	if (!io) {
		console.log("Socket is not initialized");
		return;
	}
	io.to(socketId).emit(messageObject.event, messageObject.data);
};

module.exports = { initializeSocket, sendMessageToSocketId };
