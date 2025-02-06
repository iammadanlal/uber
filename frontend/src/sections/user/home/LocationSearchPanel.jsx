import PropTypes from "prop-types";

const LocationSearchPanel = ({ suggestions, setSuggestion }) => {
	return (
		<div>
			{suggestions.map((each) => (
				<div
					onClick={() => setSuggestion(each)}
					key={each}
					className="flex gap-4 items-center my-2 justify-start border border-gray-50 active:border-black p-3 rounded-xl"
				>
					<h2 className="bg-[#eee] h-8 w-8 flex items-center justify-center rounded-full">
						<i className="ri-map-pin-fill"></i>
					</h2>
					<h4>{each}</h4>
				</div>
			))}
		</div>
	);
};

export default LocationSearchPanel;

LocationSearchPanel.propTypes = {
	setSuggestion: PropTypes.func.isRequired,
	suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
};
