export type TileState = "closed" | "active" | "hidden";

export interface Tile {
	id: string;
	state: TileState;
	img: string;
}
