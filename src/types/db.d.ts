export type TGame = {
	id: number;
	title: string;
	characters?: TCharacter[];
	image_url: string;
};

export type TLeaderboard = {
	id: number;
	username: string;
	score: number;
	map_id: number;
};

export type TCharacter = {
	id: number;
	name: string;
	coordinates: number[];
	image_url: string;
	map_id: number;
};
