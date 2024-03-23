import { TGame } from "@/types/db";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface MapCardProps {
	map: TGame;
	for_leaderboard: boolean;
}

const MapCard: FC<MapCardProps> = ({ map, for_leaderboard }) => {
	const href = for_leaderboard ? "leaderboard" : "map";
	return (
		<div className="flex flex-col border-2 border-indigo-600 rounded-lg p-2 gap-2">
			<Image
				src={map.image_url}
				alt={`Image of ${map.title} map`}
				width={250}
				height={350}
				priority={true}
				className="w-[250px] h-[350px]"
			/>
			<h1 className="self-center font-semibold">{map.title.replace(/-/g, " ")}</h1>
			<Link
				href={`/${href}/${map.title}`}
				className="bg-indigo-600 hover:bg-indigo-500 h-9 px-4 py-2 text-white m-3 rounded-lg text-center "
			>
				Select
			</Link>
		</div>
	);
};

export default MapCard;
