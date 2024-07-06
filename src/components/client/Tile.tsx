import { cn } from "../../lib/utils";
import type { Tile as TileModel } from "../../models/Tile";

interface TileProps {
	data: TileModel;
	onClick?: (id: string) => void;
}

export function Tile({ data, onClick }: TileProps) {
	const { id, state, img } = data;

	const baseWrapperStyles =
		"rounded-md w-full aspect-square cursor-pointer bg-white dark:bg-black flex items-center justify-center relative overflow-hidden border border-black dark:border-white";

	const stateStyles = cn(
		state === "active" &&
			"[transform:rotateY(180deg)] pointer-events-none border-none",
		state === "hidden" && "bg-toxic-p/10 pointer-events-none border-none",
		state === "closed" && "[transform:rotateY(0deg)]"
	);

	const placeholderStateStyles = cn(
		state === "active" && "opacity-0",
		state === "closed" && "opacity-100"
	);

	const imgStateStyles = cn(
		state === "active" && "opacity-100",
		state === "closed" && "opacity-0",
		state === "hidden" && "opacity-0"
	);

	const handleClick = () => {
		if (onClick) onClick(id);
	};

	return (
		<div onClick={handleClick} className={cn(baseWrapperStyles, stateStyles)}>
			<img
				className={cn(
					"absolute transition-all duration-75 h-[40%] object-cover ",
					placeholderStateStyles,
					state === "hidden" && "hidden"
				)}
				src={"favicon.svg"}
				alt="closed tile"
			/>

			<img
				className={cn(
					"absolute transition-all h-[100%] duration-200 object-cover [transform:rotateY(180deg)]",
					imgStateStyles
				)}
				src={img}
				alt={img}
			/>
		</div>
	);
}
