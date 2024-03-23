import MapCard from "@/components/MapCard";
import { db } from "@/lib/db";
import { maps } from "@/lib/db/schema";
import { nanoid } from "nanoid";

const page = async () => {
	const mapsArray = await db.select().from(maps);
	return (
		<main className="flex justify-center items-center mt-10 gap-4">
			{mapsArray.map((map) => (
				<MapCard map={map} key={nanoid()} for_leaderboard={false} />
			))}
		</main>
	);
};

export default page;
