import { useContext } from "react";
import { CaptainContext } from "../contexts/CaptainContext";

const CaptainDetails = () => {
	const { captain } = useContext(CaptainContext);

	console.log(captain);

	return (
		<div>
			<div className="flex items-center justify-between">
				<div className="flex items-center justify-start gap-3">
					<img
						className="rounded-full h-10 w-10 "
						src="https://static.vecteezy.com/system/resources/thumbnails/041/646/466/small/ai-generated-portrait-of-handsome-young-man-png.png"
						alt="captain photo"
					/>
					<h4 className="text-lg font-medium">{`${captain?.fullname.firstName} ${captain?.fullname.lastName}`}</h4>
				</div>
				<div>
					<h4 className="text-lg font-medium">₹295.20</h4>
					<p className="text-sm text-gray-600">Earned</p>
				</div>
			</div>

			<div className="flex items-center justify-between mt-5 p-3 bg-gray-100 rounded-xl">
				<div className="text-center">
					<i className="ri-timer-2-line text-2xl font-thin"></i>
					<h5 className="text-lg font-medium">10.2</h5>
					<p className="text-sm text-gray-600">Hours Online</p>
				</div>
				<div className="text-center">
					<i className="ri-speed-up-line text-2xl font-thin"></i>
					<h5 className="text-lg font-medium">10.2</h5>
					<p className="text-sm text-gray-600">Hours Online</p>
				</div>
				<div className="text-center">
					<i className="ri-booklet-line text-2xl font-thin"></i>
					<h5 className="text-lg font-medium">10.2</h5>
					<p className="text-sm text-gray-600">Hours Online</p>
				</div>
			</div>
		</div>
	);
};

export default CaptainDetails;
