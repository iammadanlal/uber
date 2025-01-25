import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../sections/user/home/LocationSearchPanel";

const Home = () => {
	const panelRef = useRef(null);
	const panelCloseRef = useRef(null);
	const vehiclePenalRef = useRef(null);
	const [form, setForm] = useState({
		pickup: "",
		destination: "",
	});
	const [panelOpen, setPanelOpen] = useState(false);
	const [vehiclePanel, setVehiclePanel] = useState(false);

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
				className="fixed z-10 bottom-0 px-3 py-10 pt-14 bg-white w-full translate-y-full"
			>
				<h5
					className="p-1 text-center absolute top-0 w-[93%]"
					onClick={() => setVehiclePanel(false)}
				>
					<i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
				</h5>
				<h3 className="text-2xl font-semibold mb-5">
					Choose a Vehicle
				</h3>
				<div className="flex items-center justify-between border-2 border-black rounded-xl w-full p-3 my-2">
					<img
						className="h-12"
						src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367538/assets/31/ad21b7-595c-42e8-ac53-53966b4a5fee/original/Final_Black.png"
						alt="car logo"
					/>
					<div className="ml-2 w-1/2">
						<h4 className="font-medium text-base">
							UberGo{" "}
							<span>
								<i className="ri-user-3-fill"></i>4
							</span>
						</h4>
						<h5 className="font-medium text-sm">2 mins away</h5>
						<p className="font-normal text-xs text-gray-600">
							Affordable, compact rides
						</p>
					</div>
					<h2 className="text-2xl font-semibold">$193.20</h2>
				</div>
				<div className="flex items-center justify-between border-2 border-black rounded-xl w-full p-3 my-2">
					<img
						className="h-12"
						src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
						alt="car logo"
					/>
					<div className="ml-2 w-1/2">
						<h4 className="font-medium text-base">
							UberMoto{" "}
							<span>
								<i className="ri-user-3-fill"></i>4
							</span>
						</h4>
						<h5 className="font-medium text-sm">2 mins away</h5>
						<p className="font-normal text-xs text-gray-600">
							Affordable, compact rides
						</p>
					</div>
					<h2 className="text-2xl font-semibold">$63.20</h2>
				</div>
				<div className="flex items-center justify-between border-2 border-black rounded-xl w-full p-3 my-2">
					<img
						className="h-12"
						src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
						alt="car logo"
					/>
					<div className="ml-2 w-1/2">
						<h4 className="font-medium text-base">
							UberAuto{" "}
							<span>
								<i className="ri-user-3-fill"></i>4
							</span>
						</h4>
						<h5 className="font-medium text-sm">2 mins away</h5>
						<p className="font-normal text-xs text-gray-600">
							Affordable, compact rides
						</p>
					</div>
					<h2 className="text-2xl font-semibold">$93.20</h2>
				</div>
			</div>
		</div>
	);
};

export default Home;
