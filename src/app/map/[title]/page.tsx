import Game from "@/components/Game";
import { db } from "@/lib/db";
import { maps } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { FC } from "react";

interface PageProps {
	params: { title: string };
}

const Page: FC<PageProps> = async ({ params }) => {
	const map = await db.query.maps.findFirst({ where: eq(maps.title, params.title), with: { characters: true } });
	if (!map) notFound();
	return (
		<div className="flex flex-col justify-center items-center py-5 bg-indigo-50">
			<Game map={map} />
		</div>
	);
};

export default Page;
