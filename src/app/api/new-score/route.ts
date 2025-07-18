import { generateSignature } from "@/helpers/generate-signature";
import { db } from "@/lib/db";

export async function POST(req: Request) {
	try {
		const {
			username,
			score,
			map_id,
			signature,
		}: { username: string; score: string; map_id: number; signature: string } = await req.json();
		const requestDataString = JSON.stringify({ username, score, map_id });

		const regeneratedSignature = await generateSignature(requestDataString);

		if (signature === regeneratedSignature) {
			await db.leaderboard.create({
				data: {
					username,
					score,
					map_id: map_id.toString(),
				},
			});
			return new Response("OK");
		} else {
			return new Response("Invalid signature", { status: 401 });
		}
	} catch (error) {
		console.log(error);
		return new Response("Internal server error", { status: 500 });
	}
}
