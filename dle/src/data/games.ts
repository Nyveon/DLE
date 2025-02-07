export interface Game {
	name: string;
	url: string;
	check: {
		identifier: string;
		slice?: number;
	};
}

export const games: Record<string, Game> = {
	connections: {
		name: "Connections",
		url: "https://www.nytimes.com/games/connections",
		check: {
			identifier: "Connections",
		},
	},
	foodguessr: {
		name: "FoodGuessr",
		url: "https://foodguessr.com/",
		check: {
			identifier: "FoodGuessr",
			slice: -3,
		},
	},
	tradle: {
		name: "#Tradle",
		url: "https://tradle.io/",
		check: {
			identifier: "#Tradle",
			slice: -1,
		},
	},
	pick5: {
		name: "Pick5",
		url: "https://www.nytimes.com/pick5",
		check: {
			identifier: "Pick5",
			slice: -2,
		},
	},
};

export type GameResults = {
	[K in keyof typeof games]: string;
};
