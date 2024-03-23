"use client";

import { TCharacter } from "@/types/db";
import { nanoid } from "nanoid";
import Image from "next/image";
import { FC } from "react";

interface DropdownMenuProps {
	characters: TCharacter[];
	selectedCoords: { x: number; y: number };
	handleCharacterSelect: (character: TCharacter) => void;
	imageDimensions: { width: number; height: number };
}

const DropdownMenu: FC<DropdownMenuProps> = ({ characters, selectedCoords, handleCharacterSelect, imageDimensions }) => {
	const { width, height } = imageDimensions;
	const left = (selectedCoords.x / 100) * width;
	const top = (selectedCoords.y / 100) * height;

	const viewportWidth = window.innerWidth;

	const rightEdge = left + 100;

	const isSpaceOnRight = rightEdge < viewportWidth;

	const dropdownLeft = isSpaceOnRight ? left + 50 : left - 200;
	const dropdownTop = Math.min(top, height - 300);

	return (
		<>
			<div
				style={{
					position: "absolute",
					left: `${left - 25}px`,
					top: `${top + 45}px`,
				}}
			>
				<div className="select-none relative h-[50px] w-[50px] border-4 border-red-600" />
			</div>

			<div
				style={{
					position: "absolute",
					left: `${dropdownLeft}px`,
					top: `${dropdownTop}px`,
				}}
			>
				<div className="flex flex-col bg-white rounded-lg justify-center absolute p-2 gap-1">
					{characters.map((character) => (
						<div
							key={nanoid()}
							className="w-32 h-auto flex items-center justify-around cursor-pointer"
							onClick={() => handleCharacterSelect(character)}
						>
							<Image src={character.image_url} alt={""} width={48} height={48} className="size-12" />
							<h1>{character.name}</h1>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default DropdownMenu;
