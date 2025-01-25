import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../sections/user/home/LocationSearchPanel";
import VehiclePanel from "../sections/user/home/VehiclePanel";
import ConfirmRidePanel from "../sections/user/home/ConfirmRide";
import LookingForDriver from "../sections/user/home/LookingForDriver";
import WaitingForDriver from "../sections/user/home/WaitingForDriver";

const Home = () => {
	const panelRef = useRef(null);
	const panelCloseRef = useRef(null);
	const vehiclePenalRef = useRef(null);
	const confirmRidePanelRef = useRef(null);
	const isVehicleForRideRef = useRef(null);
	const waitingForDriverRef = useRef(null);
	const [form, setForm] = useState({
		pickup: "",
		destination: "",
	});
	const [panelOpen, setPanelOpen] = useState(false);
	const [vehiclePanel, setVehiclePanel] = useState(false);
	const [confirmRidePanel, setConfirmRidePanel] = useState(false);
	const [isVehicleForRide, setVehicleForRide] = useState(false);
	const [waitingForDriver, setWaitingForDriver] = useState(false);

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

	const onFormInputChange = (e) => {
		const key = e.target.id;
		const value = e.target.value;
		setForm({ ...form, [key]: value });
	};

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
					<form>
						<input
							className="rounded-lg bg-[#eee] px-12 py-3 w-full mb-4 mt-3"
							type="text"
							placeholder="Add a pick-up location"
							value={form.pickup}
							onChange={onFormInputChange}
							id="pickup"
							onFocus={() => setPanelOpen(true)}
						/>
						<input
							className="rounded-lg bg-[#eee] px-12 py-3 w-full"
							type="text"
							placeholder="Enter your destination"
							value={form.destination}
							onChange={onFormInputChange}
							id="destination"
							onFocus={() => setPanelOpen(true)}
						/>
					</form>
				</div>
				<div ref={panelRef} className="h-0 bg-white p-5">
					<LocationSearchPanel
						setPanelOpen={setPanelOpen}
						setVehiclePanel={setVehiclePanel}
					/>
				</div>
			</div>
			<div
				ref={vehiclePenalRef}
				className="fixed z-10 bottom-0 px-3 py-10 pt-12 bg-white w-full translate-y-full"
			>
				<VehiclePanel
					setVehiclePanel={setVehiclePanel}
					setConfirmRidePanel={setConfirmRidePanel}
				/>
			</div>
			<div
				ref={confirmRidePanelRef}
				className="fixed z-10 bottom-0 px-3 py-6 pt-12 bg-white w-full translate-y-full"
			>
				<ConfirmRidePanel
					setConfirmRidePanel={setConfirmRidePanel}
					setVehicleForRide={setVehicleForRide}
				/>
			</div>
			<div
				ref={isVehicleForRideRef}
				className="fixed z-10 bottom-0 px-3 py-6 pt-12 bg-white w-full translate-y-full"
			>
				<LookingForDriver setVehicleForRide={setVehicleForRide} />
			</div>
			<div
				ref={waitingForDriverRef}
				className="fixed z-10 bottom-0 px-3 py-6 pt-12 bg-white w-full translate-y-full"
			>
				<WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
			</div>
		</div>
	);
};

export default Home;
