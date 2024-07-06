export const SITE_TITLE = "4TilesGame";
export const SITE_DESCRIPTION = "Tiles game";

export const AUTHOR_NAME = "Slava Ch";
export const AUTHOR_GH_LINK = "https://github.com/aveok4now";

import type { GameConfig } from "./models/GameConfig";
import type { Tile, TileState } from "./models/Tile";

export const CONFIG: GameConfig = {
	couples: 8,
	startTime: 60,
	minTime: 20,
	timeDecreasment: 10,
};

const IMAGES_FOLDER = "./images/";
const DEFAULT_STATE: TileState = "closed";
export const tiles: Tile[] = [
	{
		id: "1",
		img: IMAGES_FOLDER + "shelby.png",
		state: DEFAULT_STATE,
	},
	{
		id: "2",
		img: IMAGES_FOLDER + "darkrose.png",
		state: DEFAULT_STATE,
	},
	{
		id: "3",
		img: IMAGES_FOLDER + "hypochondriac.png",
		state: DEFAULT_STATE,
	},
	{
		id: "4",
		img: IMAGES_FOLDER + "unbothered.png",
		state: DEFAULT_STATE,
	},
	{
		id: "5",
		img: IMAGES_FOLDER + "boy.png",
		state: DEFAULT_STATE,
	},
	{
		id: "6",
		img: IMAGES_FOLDER + "spiderr.png",
		state: DEFAULT_STATE,
	},
	{
		id: "7",
		img: IMAGES_FOLDER + "worst_enemy.png",
		state: DEFAULT_STATE,
	},
	{
		id: "8",
		img: IMAGES_FOLDER + "dale.png",
		state: DEFAULT_STATE,
	},
];
