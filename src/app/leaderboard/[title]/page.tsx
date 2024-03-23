import { db } from "@/lib/db";
import { leaderboards, maps } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { FC } from "react";

interface pageProps {
	params: { title: string };
}

const page: FC<pageProps> = async ({ params }) => {
	const map = await db.query.maps.findFirst({ where: eq(maps.title, params.title) });
	if (!map) notFound();
	const leaderboard = await db.select().from(leaderboards).where(eq(leaderboards.map_id, map.id)).orderBy(asc(leaderboards.score));

	return (
		<>
			<h1 className="self-center text-xl mt-5">Map: {map.title.replace(/-/g, " ")}</h1>

			<table className="rounded-lg overflow-hidden border-spacing-0 border-separate max-w-[750px] shadow-md border-r-zinc-400 mt-10 bg-indigo-200 self-center p-4 text-lg">
				<thead>
					<tr>
						<td className="p-4">Place</td>
						<td className="p-4">Username</td>
						<td className="p-4">Time</td>
					</tr>
				</thead>

				<tbody>
					{leaderboard.map((row, index) => {
						return (
							<tr key={index}>
								<td className="p-4">{index + 1}</td>
								<td className="p-4">{row.username}</td>
								<td className="p-4">{row.score}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default page;
