import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import type { GameConfig } from "../models/GameConfig";
import type { Tile as TileModel } from "../models/Tile";
import { GameService } from "../services/GameService";
import { TileService } from "../services/TileService.ts";
import { Tile } from "./Tile.tsx";

const HIDE_INCORRECT_TIME = 750;
const HIDE_CORRECT_TIME = 300;

interface TilesBoardProps {
	tiles: TileModel[];
	config: GameConfig;
	onSolve: () => void;
	matchedCount: number;
	setMatchedCount: React.Dispatch<React.SetStateAction<number>>;
	attempt: number;
}

export function TilesBoard({
	tiles,
	config,
	onSolve,
	matchedCount,
	setMatchedCount,
	attempt,
}: TilesBoardProps) {
	const [firstPickedID, setFirstPickedID] = useState("");
	const [canPick, setCanPick] = useState(true);
	const [boardTiles, setTiles] = useState(
		TileService.getPreparedTiles(tiles, config)
	);

	useEffect(() => {
		setFirstPickedID("");
		setTiles(TileService.getPreparedTiles(tiles, config));
	}, [attempt]);

	function increaseMatchedCount() {
		setMatchedCount((prev) => prev + 1);
		if (GameService.isGameSolved(matchedCount + 1, config.couples)) {
			new Promise<void>((resolve) => {
				setTiles((prev) => prev.map((tile) => ({ ...tile, state: "closed" })));
				setTimeout(() => {
					resolve();
				}, 300);
			}).then(() => {
				onSolve();
				setTiles(TileService.getPreparedTiles(tiles, config));
			});
		}
	}

	function handleClick(id: string) {
		if (firstPickedID === "") {
			setFirstPickedID(id);
			setTiles((prev) => TileService.updateTileState(prev, id, "active"));
		} else {
			setTiles((prev) => {
				let updatedTiles = TileService.updateTileState(prev, id, "active");
				updatedTiles = TileService.updateTileState(
					updatedTiles,
					firstPickedID,
					"active"
				);
				return updatedTiles;
			});
			setCanPick(false);

			if (
				firstPickedID !== id &&
				firstPickedID.split("_")[0] === id.split("_")[0]
			) {
				setTimeout(() => {
					setTiles((prev) => {
						let updatedTiles = TileService.updateTileState(prev, id, "hidden");
						updatedTiles = TileService.updateTileState(
							updatedTiles,
							firstPickedID,
							"hidden"
						);
						return updatedTiles;
					});
					setCanPick(true);
					increaseMatchedCount();
				}, HIDE_CORRECT_TIME);
			} else {
				setTimeout(() => {
					setTiles((prev) => {
						let updatedTiles = TileService.updateTileState(prev, id, "closed");
						updatedTiles = TileService.updateTileState(
							updatedTiles,
							firstPickedID,
							"closed"
						);
						return updatedTiles;
					});
					setCanPick(true);
				}, HIDE_INCORRECT_TIME);
			}
			setFirstPickedID("");
		}
	}

	const colsClassname = {
		2: "grid-cols-2",
		8: "grid-cols-4",
	}[config.couples];

	const boardClassname = cn(
		"grid [justify-content:space-between] gap-[.5rem]",
		canPick ? "pointer-events-all" : "pointer-events-none",
		colsClassname
	);

	return (
		<div className={boardClassname}>
			{boardTiles.map((tile) => (
				<Tile data={tile} key={tile.id} onClick={handleClick} />
			))}
		</div>
	);
}
