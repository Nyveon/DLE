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
	check?: Check;
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
			slice: -2,
		},
	},
	countryle: {
		name: "Countryle",
		url: "https://countryle.com/",
		icon: iconCountryle,
		check: {
			identifier: "#Countryle",
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
	},
};

export type GameResults = Partial<Record<GameId, string>>;
export type CheckableGame = Pick<Game, "check">;
export type CheckableGames = Partial<Record<GameId, CheckableGame>>;

export interface GameExample {
	given: string;
	expected: string;
}

export const gameExamples: Partial<Record<GameId, GameExample>> = {
	foodguessr: {
		given: `FoodGuessr - 10 Feb 2025 GMT
  Round 1 🌕🌕🌕🌕
  Round 2 🌕🌕🌕🌕
  Round 3 🌕🌕🌕🌖
Total score: 14,500 / 15,000

Can you beat my score? New game daily!
Play at https://foodguessr.com`,

		expected: `FoodGuessr - 10 Feb 2025 GMT
  Round 1 🌕🌕🌕🌕
  Round 2 🌕🌕🌕🌕
  Round 3 🌕🌕🌕🌖
Total score: 14,500 / 15,000`,
	},
	connections: {
		given: `Connections
Puzzle #604
🟨🟨🟨🟨
🟪🟪🟪🟪
🟩🟩🟩🟩
🟦🟦🟦🟦`,
		expected: `Connections
Puzzle #604
🟨🟨🟨🟨
🟪🟪🟪🟪
🟩🟩🟩🟩
🟦🟦🟦🟦`,
	},
	pick5: {
		given: `Pick5 #272 - Pitted Fruits 
🥉 62.78%
🟡 🟢 🟡 🟡 🟢 2/5
Play #oecGames today!
https://oec.world/en/games/pick-5`,
		expected: `Pick5 #272 - Pitted Fruits 
🥉 62.78%
🟡 🟢 🟡 🟡 🟢 2/5`,
	},
	tradle: {
		given: `#Tradle #1065 4/6
🟩⬜⬜⬜⬜
🟩🟩🟩⬜⬜
🟩🟩🟩🟩🟨
🟩🟩🟩🟩🟩
https://oec.world/en/games/tradle`,
		expected: `#Tradle #1065 4/6
🟩⬜⬜⬜⬜
🟩🟩🟩⬜⬜
🟩🟩🟩🟩🟨
🟩🟩🟩🟩🟩`,
	},
	countryle: {
		given: `#Countryle 1086
Guessed in 5 tries.

🟢⚪⚪⚪⚪
🟢🟢⚪⚪⚪
🟢🟢⚪⚪⚪
🟢🟢🟡⚪⚪
🟢🟢🟢🟢🟢

https://countryle.com`,
		expected: `#Countryle 1086
Guessed in 5 tries.
🟢⚪⚪⚪⚪
🟢🟢⚪⚪⚪
🟢🟢⚪⚪⚪
🟢🟢🟡⚪⚪
🟢🟢🟢🟢🟢`,
	},
};
