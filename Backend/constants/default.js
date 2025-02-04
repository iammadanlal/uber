// default fares

const baseFare = {
	auto: 30,
	car: 50,
	moto: 20,
};

const perKmFare = {
	auto: 10,
	car: 15,
	moto: 8,
};

const perMinFare = {
	auto: 2,
	car: 3,
	moto: 1.5,
};

module.exports = {
	baseFare,
	perKmFare,
	perMinFare,
};
