import iconConnections from "@/assets/icon-connections.svg";
import iconOec from "@/assets/icon-oec.ico";
import iconFoodGuessr from "@/assets/icon-foodguessr.png";
import iconCountryle from "@/assets/icon-countryle.png";
import skelegif from "@/assets/skelebertle.gif";

export const GameIds = [
	"connections",
	"foodguessr",
	"countryle",
	"tradle",
	"pick5",
	"skelebertle",
] as const;

export type GameId = (typeof GameIds)[number];

interface Check {
	identifier: string;
	slice?: number;
}

export interface Game {
	name: string;
	url: string;
	icon: string;
	secret?: boolean;
	check: Check;
}

export const games: Record<GameId, Game> = {
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
			slice: -1,
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
	skelebertle: {
		name: "Skelebertle",
		url: "",
		icon: skelegif,
		secret: true,
		check: {
			identifier: "",
			slice: -1,
		},
	},
};

export type GameResults = Partial<Record<GameId, string>>;
export type CheckableGame = Pick<Game, "check">;
export type CheckableGames = Partial<Record<GameId, CheckableGame>>;
