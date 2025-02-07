export interface Game {
	name: string;
	url: string;
	identifier: string;
}

export const games: Record<string, Game> = {
	wordle: {
		name: "Wordle",
		identifier: "Wordle",
		url: "https://www.nytimes.com/games/wordle/index.html",
	},
	connections: {
		name: "Connections",
		identifier: "Connections",
		url: "https://www.nytimes.com/games/connections",
	},
};

export type GameResults = {
	[K in keyof typeof games]: string;
};
