import { Link } from "react-router-dom";
import CaptainDetails from "./CaptainDetails";
import RidePopUp from "../sections/captain/home/RidePopUp";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../sections/captain/home/ConfirmRidePopup";

const CaptainHome = () => {
	const newRidePopUpRef = useRef(null);
	const confirmRidePanelRef = useRef(null);
	const [isNewRideAvailable, setIsNewRideAvailable] = useState(true);
	const [ride, setRide] = useState(null);
	const [confirmRidePanel, setConfirmRidePanel] = useState(false);

	const confirmRide = () => {};

	useGSAP(() => {
		if (isNewRideAvailable) {
			gsap.to(newRidePopUpRef.current, {
				transform: "translateY(0)",
			});
		} else {
			gsap.to(newRidePopUpRef.current, {
				transform: "translateY(100%)",
			});
		}
	}, [isNewRideAvailable]);

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

	return (
		<div className="h-screen">
			<div className="fixed p-3 top-0 flex items-center justify-between w-screen">
				<img
					className="w-16"
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
					alt="uber logo"
				/>
				<Link
					to={"/home"}
					className=" w-10 h-10 bg-white flex items-center justify-center rounded-full"
				>
					<i className="ri-logout-box-line text-lg font-medium"></i>
				</Link>
			</div>
			<div className="h-4/6">
				<img
					className="h-full w-full object-cover"
					src="https://cdn.dribbble.com/users/914217/screenshots/4506553/media/7be2be6f43f64c27946d1068a602ece1.gif?resize=400x0"
					alt="uber map image"
				/>
			</div>
			<div className="h-2/6 p-4">
				<CaptainDetails />
			</div>
			<div
				ref={newRidePopUpRef}
				className="fixed z-10 bottom-0 px-3 py-6 pt-12 bg-white w-full translate-y-full"
			>
				<RidePopUp
					ride={ride}
					setIsNewRideAvailable={setIsNewRideAvailable}
					confirmRide={confirmRide}
					setConfirmRidePanel={setConfirmRidePanel}
				/>
			</div>
			<div
				ref={confirmRidePanelRef}
				className="fixed z-10 bottom-0 px-3 py-6 pt-12 bg-white w-full translate-y-full"
			>
				<ConfirmRidePopup
					ride={ride}
					setIsNewRideAvailable={setIsNewRideAvailable}
					setConfirmRidePanel={setConfirmRidePanel}
				/>
			</div>
		</div>
	);
};

export default CaptainHome;
