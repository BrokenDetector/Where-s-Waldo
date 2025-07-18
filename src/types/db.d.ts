export type TGame = {
	id: string;
	title: string;
	characters?: TCharacter[];
	image_url: string;
};

export type TLeaderboard = {
	id: string;
	username: string;
	score: string;
	map_id: string;
};

export type TCharacter = {
	id: string;
	name: string;
	coordinates: number[];
	image_url: string;
	map_id: string;
};
