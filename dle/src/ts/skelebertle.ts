import sndSkele1 from "@/assets/sounds/skele2.mp3";
import imgSkele1 from "@/assets/images/skelebertle.webp";
import sndSkele2 from "@/assets/sounds/boom.mp3";
import imgSkele2 from "@/assets/images/yeah.webp";
import sndSkele3 from "@/assets/sounds/dracula.mp3";
import imgSkele3 from "@/assets/images/dracula.webp";
import imgSkele4 from "@/assets/images/sans.webp";
import sndSkele4 from "@/assets/sounds/sans.mp3";
import imgSkele5 from "@/assets/images/appears.webp";
import sndSkele5 from "@/assets/sounds/skele1.mp3";
import imgSkele6 from "@/assets/images/doot.webp";
import sndSkele6 from "@/assets/sounds/doot.mp3";
import imgSkele7 from "@/assets/images/fall.webp";
import sndSkele7 from "@/assets/sounds/vine.mp3";
import imgSkele8 from "@/assets/images/run.webp";
import sndSkele8 from "@/assets/sounds/skele3.mp3";
import imgSkele9 from "@/assets/images/3d.webp";
import sndSkele9 from "@/assets/sounds/skele4.mp3";
import imgSkele10 from "@/assets/images/walk.webp";
import sndSkele10 from "@/assets/sounds/skele5.mp3";
import imgSkele11 from "@/assets/images/skeledancers.webp";
import sndSkele11 from "@/assets/sounds/mystery.mp3";

export interface SkeletonTemplate {
	id: number;
	name: string;
	imageUrl: string;
	sound: string;
	volume?: number;
}

export const skeletonTemplates: SkeletonTemplate[] = [
	{
		id: 1,
		name: "Skeleberto",
		imageUrl: imgSkele1,
		sound: sndSkele1,
	},
	{
		id: 2,
		name: "YEEEEEEAHH!!!!",
		imageUrl: imgSkele2,
		sound: sndSkele2,
	},
	{
		id: 3,
		name: "Some sort of Dracula...",
		imageUrl: imgSkele3,
		sound: sndSkele3,
		volume: 0.5,
	},
	{
		id: 4,
		name: "Sans Undertale",
		imageUrl: imgSkele4,
		sound: sndSkele4,
	},
	{
		id: 5,
		name: "THE SKELETON APPEARS",
		imageUrl: imgSkele5,
		sound: sndSkele5,
	},
	{
		id: 6,
		name: "Skelencio",
		imageUrl: imgSkele6,
		sound: sndSkele6,
	},
	{
		id: 7,
		name: "Skelethew",
		imageUrl: imgSkele7,
		sound: sndSkele7,
	},
	{
		id: 8,
		name: "Skelethon",
		imageUrl: imgSkele8,
		sound: sndSkele8,
	},
	{
		id: 9,
		name: "Skeloian3000",
		imageUrl: imgSkele9,
		sound: sndSkele9,
	},
	{
		id: 10,
		name: "Skeleten",
		imageUrl: imgSkele10,
		sound: sndSkele10,
	},
	{
		id: 11,
		name: "The Skeledancers",
		imageUrl: imgSkele11,
		sound: sndSkele11,
	},
];

export interface SkeletonObject {
	id: number;
	name: string;
	audio: HTMLAudioElement;
	image: HTMLImageElement;
	volume?: number;
}

export const skeletons: SkeletonObject[] = skeletonTemplates.map((template) => {
	const img = new Image();
	img.src = template.imageUrl;

	return {
		id: template.id,
		name: template.name,
		audio: new Audio(template.sound),
		image: img,
		volume: template.volume,
	};
});

const trueMaxScore = skeletons.length + 1;

export function skelebertleResult(score: number) {
	const full = "💀".repeat(Math.floor(score / 2));
	const partial = score % 2 == 1 ? "🦴" : "";
	const filler = "🌑".repeat(Math.floor((trueMaxScore - score) / 2));

	const emojis = `${full}${partial}${filler}`;

	const number = Math.floor(
		(Date.now() - new Date("2025-02-06").getTime()) / (1000 * 60 * 60 * 24)
	);

	return `Skelebertle: Skeleberto #${number}\n${emojis}`;
}
