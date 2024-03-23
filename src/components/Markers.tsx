import { nanoid } from "nanoid";
import { FC } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

interface MarkersProps {
	markers: { x: number; y: number }[] | [];
}

const Markers: FC<MarkersProps> = ({ markers }) => {
	return (
		<>
			{markers.length > 0 && (
				<>
					{markers.map((marker) => (
						<div
							key={nanoid()}
							style={{ position: "absolute", left: `calc(${marker.x}% - 1.7%)`, top: `calc(${marker.y}% - 0.7%)` }}
						>
							<div>
								<FaMapMarkerAlt color="red" size={48} />
							</div>
						</div>
					))}
				</>
			)}
		</>
	);
};

export default Markers;
