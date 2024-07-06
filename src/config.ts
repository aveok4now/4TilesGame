export const SITE_TITLE = "4TilesGame";
export const SITE_DESCRIPTION = "Tiles game";

export const AUTHOR_NAME = "Slava Ch";
export const AUTHOR_GH_LINK = "https://github.com/aveok4now";

import type { GameConfig } from "./models/GameConfig";
import type { Tile, TileState } from "./models/Tile";

export const CONFIG: GameConfig = {
	cards: 8,
	gameTimeSec: 60,
	minGameTime: 20,
	timeDecreaseValue: 10,
};

const IMAGES_FOLDER = "./images/";
const INIT_CARD_STATE: TileState = "closed";

export const tiles: Tile[] = [
	{
		id: "1",
		img: IMAGES_FOLDER + "shelby.png",
		state: INIT_CARD_STATE,
	},
	{
		id: "2",
		img: IMAGES_FOLDER + "darkrose.png",
		state: INIT_CARD_STATE,
	},
	{
		id: "3",
		img: IMAGES_FOLDER + "hypochondriac.png",
		state: INIT_CARD_STATE,
	},
	{
		id: "4",
		img: IMAGES_FOLDER + "unbothered.png",
		state: INIT_CARD_STATE,
	},
	{
		id: "5",
		img: IMAGES_FOLDER + "boy.png",
		state: INIT_CARD_STATE,
	},
	{
		id: "6",
		img: IMAGES_FOLDER + "spiderr.png",
		state: INIT_CARD_STATE,
	},
	{
		id: "7",
		img: IMAGES_FOLDER + "worst_enemy.png",
		state: INIT_CARD_STATE,
	},
	{
		id: "8",
		img: IMAGES_FOLDER + "dale.png",
		state: INIT_CARD_STATE,
	},
];
