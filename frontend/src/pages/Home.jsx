import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

const Home = () => {
	const panelRef = useRef(null);
	const panelCloseRef = useRef(null);
	const [form, setForm] = useState({
		pickup: "",
		destination: "",
	});
	const [panelOpen, setPanelOpen] = useState(false);

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

	const onFormInputChange = (e) => {
		const key = e.target.id;
		const value = e.target.value;
		setForm({ ...form, [key]: value });
	};

	return (
		<div className="relative h-screen">
			<div>
				<img
					className="w-16 absolute top-5 left-5"
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
					alt="uber logo"
				/>
			</div>
			<div>
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
				<div ref={panelRef} className="h-0 bg-white p-5"></div>
			</div>
		</div>
	);
};

export default Home;
