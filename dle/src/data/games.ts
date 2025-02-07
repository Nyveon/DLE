import iconConnections from "@/assets/icon-connections.svg";
import iconOec from "@/assets/icon-oec.ico";
import iconFoodGuessr from "@/assets/icon-foodguessr.png";
import iconCountryle from "@/assets/icon-countryle.png";

export interface Game {
	name: string;
	url: string;
	icon: string;
	check: {
		identifier: string;
		slice?: number;
	};
}

export const games: Record<string, Game> = {
	connections: {
		name: "Connections",
		url: "https://www.nytimes.com/games/connections",
		icon: iconConnections,
		check: {
			identifier: "Connections",
		},
	},
	foodguessr: {
		name: "FoodGuessr",
		url: "https://foodguessr.com/",
		icon: iconFoodGuessr,
		check: {
			identifier: "FoodGuessr",
			slice: -3,
		},
	},
	countryle: {
		name: "Countryle",
		url: "https://countryle.com/",
		icon: iconCountryle,
		check: {
			identifier: "Countryle",
			slice: -2,
		},
	},
	tradle: {
		name: "Tradle",
		url: "https://oec.world/en/games/tradle",
		icon: iconOec,
		check: {
			identifier: "#Tradle",
			slice: -1,
		},
	},
	pick5: {
		name: "Pick5",
		url: "https://oec.world/en/games/pick-5",
		icon: iconOec,
		check: {
			identifier: "Pick5",
			slice: -2,
		},
	},
};

export type GameResults = {
	[K in keyof typeof games]: string;
};
