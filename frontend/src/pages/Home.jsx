import { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../sections/user/home/LocationSearchPanel";
import VehiclePanel from "../sections/user/home/VehiclePanel";
import ConfirmRidePanel from "../sections/user/home/ConfirmRide";
import LookingForDriver from "../sections/user/home/LookingForDriver";
import WaitingForDriver from "../sections/user/home/WaitingForDriver";
import axios from "axios";
import { SocketContext } from "../contexts/SocketContext";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();

	const panelRef = useRef(null);
	const panelCloseRef = useRef(null);
	const vehiclePenalRef = useRef(null);
	const confirmRidePanelRef = useRef(null);
	const isVehicleForRideRef = useRef(null);
	const waitingForDriverRef = useRef(null);
	const [panelOpen, setPanelOpen] = useState(false);
	const [vehiclePanel, setVehiclePanel] = useState(false);
	const [confirmRidePanel, setConfirmRidePanel] = useState(false);
	const [isVehicleForRide, setVehicleForRide] = useState(false);
	const [waitingForDriver, setWaitingForDriver] = useState(false);

	const [pickup, setPickup] = useState("");
	const [destination, setDestination] = useState("");
	const [pickupSuggestions, setPickupSuggestions] = useState([]);
	const [destinationSuggestions, setDestinationSuggestions] = useState([]);
	const [fare, setFare] = useState({});
	const [vehicleType, setVehicleType] = useState(null);
	const [activeField, setActiveField] = useState("pickup");
	const [ride, setRide] = useState(null);

	const { socket } = useContext(SocketContext);
	const { user } = useContext(UserContext);

	useEffect(() => {
		socket.emit("join", {
			userId: user._id,
			userType: "user",
		});
		socket.on("ride-confirmed", (ride) => {
			setWaitingForDriver(true);
			setVehicleForRide(false);
			setRide(ride);
		});

		socket.on("ride-started", (ride) => {
			setWaitingForDriver(false);
			navigate("/riding", { state: { ride } });
		});
	}, [user, socket, navigate]);

	const getSuggestions = async (input) => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BASE_URI}/maps/get-suggestions`,
				{
					params: { input },
					headers: {
						Authorization:
							"Bearer " + localStorage.getItem("token"),
					},
				}
			);
			return response.data;
		} catch (err) {
			console.error(err);
			return [];
		}
	};

	const handlePickupChange = async (e) => {
		setPickup(e.target.value);
		if (e.target.value.length < 3) return;
		const suggestions = await getSuggestions(e.target.value);
		if (suggestions.length) {
			setPickupSuggestions(suggestions);
		}
	};

	const handleDestinationChange = async (e) => {
		setDestination(e.target.value);
		if (e.target.value.length < 3) return;
		const suggestions = await getSuggestions(e.target.value);
		if (suggestions.length) {
			setDestinationSuggestions(suggestions);
		}
	};

	useGSAP(() => {
		if (panelOpen) {
			gsap.to(panelRef.current, {
				height: "70%",
			});
			gsap.to(panelCloseRef.current, {
				opacity: 1,
			});
		} else {
			gsap.to(panelRef.current, {
				height: "0%",
			});
			gsap.to(panelCloseRef.current, {
				opacity: 0,
			});
		}
	}, [panelOpen]);

	useGSAP(() => {
		if (vehiclePanel) {
			gsap.to(vehiclePenalRef.current, {
				transform: "translateY(0)",
			});
		} else {
			gsap.to(vehiclePenalRef.current, {
				transform: "translateY(100%)",
			});
		}
	}, [vehiclePanel]);

	useGSAP(() => {
		if (confirmRidePanel) {
			gsap.to(confirmRidePanelRef.current, {
				transform: "translateY(0)",
			});
		} else {
			gsap.to(confirmRidePanelRef.current, {
				transform: "translateY(100%)",
			});
		}
	}, [confirmRidePanel]);

	useGSAP(() => {
		if (isVehicleForRide) {
			gsap.to(isVehicleForRideRef.current, {
				transform: "translateY(0)",
			});
		} else {
			gsap.to(isVehicleForRideRef.current, {
				transform: "translateY(100%)",
			});
		}
	}, [isVehicleForRide]);

	useGSAP(() => {
		if (waitingForDriver) {
			gsap.to(waitingForDriverRef.current, {
				transform: "translateY(0)",
			});
		} else {
			gsap.to(waitingForDriverRef.current, {
				transform: "translateY(100%)",
			});
		}
	}, [waitingForDriver]);

	async function findTrip(e) {
		e.preventDefault();
		setVehiclePanel(true);
		setPanelOpen(false);

		const response = await axios.get(
			`${import.meta.env.VITE_BASE_URI}/rides/get-fare`,
			{
				params: { pickup, destination },
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			}
		);

		setFare(response.data);
	}

	async function createRide() {
		const response = await axios.post(
			`${import.meta.env.VITE_BASE_URI}/rides/create`,
			{
				pickup,
				destination,
				vehicleType,
			},
			{
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			}
		);
	}

	return (
		<div className="relative h-screen overflow-hidden">
			<div>
				<img
					className="w-16 absolute top-5 left-5"
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
					alt="uber logo"
				/>
			</div>
			<div className="h-screen w-screen">
				<img
					className="h-screen w-full object-cover"
					src="https://cdn.dribbble.com/users/914217/screenshots/4506553/media/7be2be6f43f64c27946d1068a602ece1.gif?resize=400x0"
					alt="uber map image"
				/>
			</div>
			<div className="absolute top-0 w-full h-screen flex flex-col justify-end">
				<div className="h-[30%] bg-white p-5">
					<h5
						ref={panelCloseRef}
						className="text-2xl right-5 top-5 absolute opacity-0 hover:cursor-pointer hover:bg-slate-400 py-1 px-2 rounded-full"
						onClick={() => setPanelOpen(false)}
					>
						<i className="ri-arrow-down-wide-line"></i>
					</h5>
					<h3 className="text-2xl font-semibold">Find a trip</h3>
					<form onSubmit={findTrip}>
						<input
							className="rounded-lg bg-[#eee] px-12 py-3 w-full mb-4 mt-3"
							type="text"
							placeholder="Add a pick-up location"
							value={pickup}
							onChange={handlePickupChange}
							id="pickup"
							onFocus={() => {
								setPanelOpen(true);
								setActiveField("pickup");
							}}
						/>
						<input
							className="rounded-lg bg-[#eee] px-12 py-3 w-full"
							type="text"
							placeholder="Enter your destination"
							value={destination}
							onChange={handleDestinationChange}
							id="destination"
							onFocus={() => {
								setPanelOpen(true);
								setActiveField("destination");
							}}
						/>
						<button
							type="submit"
							className="bg-black text-white rounded-lg px-4 py-2 w-full mt-3"
							onClick={findTrip}
						>
							Find Trip
						</button>
					</form>
				</div>
				<div ref={panelRef} className="h-0 bg-white p-5">
					<LocationSearchPanel
						suggestions={
							activeField === "pickup"
								? pickupSuggestions
								: destinationSuggestions
						}
						setSuggestion={
							activeField === "pickup"
								? setPickup
								: setDestination
						}
					/>
				</div>
			</div>
			<div
				ref={vehiclePenalRef}
				className="fixed z-10 bottom-0 px-3 py-10 pt-12 bg-white w-full translate-y-full"
			>
				<VehiclePanel
					fare={fare}
					setVehicleType={setVehicleType}
					setVehiclePanel={setVehiclePanel}
					setConfirmRidePanel={setConfirmRidePanel}
				/>
			</div>
			<div
				ref={confirmRidePanelRef}
				className="fixed z-10 bottom-0 px-3 py-6 pt-12 bg-white w-full translate-y-full"
			>
				<ConfirmRidePanel
					fare={fare}
					createRide={createRide}
					pickup={pickup}
					destination={destination}
					vehicleType={vehicleType}
					setConfirmRidePanel={setConfirmRidePanel}
					setVehicleForRide={setVehicleForRide}
				/>
			</div>
			<div
				ref={isVehicleForRideRef}
				className="fixed z-10 bottom-0 px-3 py-6 pt-12 bg-white w-full translate-y-full"
			>
				<LookingForDriver
					fare={fare}
					pickup={pickup}
					destination={destination}
					vehicleType={vehicleType}
					setVehicleForRide={setVehicleForRide}
				/>
			</div>
			<div
				ref={waitingForDriverRef}
				className="fixed z-10 bottom-0 px-3 py-6 pt-12 bg-white w-full translate-y-full"
			>
				<WaitingForDriver
					ride={ride}
					setWaitingForDriver={setWaitingForDriver}
				/>
			</div>
		</div>
	);
};

export default Home;
