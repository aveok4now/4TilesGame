import { cn } from "../../lib/utils";
import type { Tile as TileModel } from "../../models/Tile";
import { TileStyleService } from "../../services/TileStyleService";

interface TileProps {
	data: TileModel;
	onClick?: (id: string) => void;
}

export function Tile({ data, onClick }: TileProps) {
	const { id, state, img } = data;

	const handleClick = () => {
		if (onClick) onClick(id);
	};

	return (
		<div
			onClick={handleClick}
			className={cn(
				TileStyleService.getBaseWrapperStyles(),
				TileStyleService.getStateStyles(state),
				TileStyleService.getActiveGlowStyles()
			)}
		>
			<img
				className={TileStyleService.getPlaceholderImgStyles(state)}
				src={"favicon.svg"}
				alt="closed tile"
			/>

			<img
				className={TileStyleService.getMainImgStyles(state)}
				src={img}
				alt={img}
			/>
		</div>
	);
}
