import type { GameConfig } from "../models/GameConfig";
import type { Tile, TileState } from "../models/Tile";

export class TileService {
	static getPreparedTiles(tiles: Tile[], config: GameConfig): Tile[] {
		return tiles
			.sort(() => Math.random() - 0.5)
			.slice(0, config.cards)
			.reduce((acc: Tile[], tile) => {
				const duplicate = { ...tile, id: tile.id + "_s" };
				return [...acc, tile, duplicate];
			}, [])
			.sort(() => Math.random() - 0.5);
	}

	static updateTileState(
		tiles: Tile[],
		id: string,
		newState: TileState
	): Tile[] {
		return tiles.map((tile) =>
			tile.id === id ? { ...tile, state: newState } : tile
		);
	}
}
