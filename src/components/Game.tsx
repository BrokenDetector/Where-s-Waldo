"use client";

import { GameContext, TGameContext } from "@/hooks/GameContext";
import { TCharacter, TGame } from "@/types/db";
import { nanoid } from "nanoid";
import Image from "next/image";
import React, { FC, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import DropdownMenu from "./DropdownMenu";
import Markers from "./Markers";
import Modal from "./Modal";
import Timer from "./Timer";

interface GameProps {
	map: TGame;
}

const Game: FC<GameProps> = ({ map }) => {
	const [showDropdownMenu, setShowDropdownMenu] = useState(false);
	const [selectedCoords, setSelectedCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [markers, setMarkers] = useState<{ x: number; y: number }[] | []>([]);
	const [game, setGame] = useState(true);
	const [characters, setCharacters] = useState<TCharacter[] | []>(map.characters!);
	const [startTimer, setStartTimer] = useState(false);
	const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

	const { score } = useContext(GameContext) as TGameContext;

	useEffect(() => {
		if (characters.length === 0 && markers.length >= map.characters?.length!) {
			setGame(false);
		}
	}, [characters, markers, map.characters]);

	const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
		const target = e.currentTarget;
		const rect = target.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / target.offsetWidth) * 100;
		const y = ((e.clientY - rect.top) / target.offsetHeight) * 100;

		const imgWidth = target.offsetWidth;
		const imgHeight = target.offsetHeight;

		setShowDropdownMenu(() => !showDropdownMenu);
		setSelectedCoords({ x, y });
		setImageDimensions({ width: imgWidth, height: imgHeight });
	};

	const handleCharacterSelect = (character: TCharacter) => {
		if (
			character.coordinates[0] <= selectedCoords.x + 2 &&
			character.coordinates[0] >= selectedCoords.x - 2 &&
			character.coordinates[1] >= selectedCoords.y - 2 &&
			character.coordinates[1] <= selectedCoords.y + 2
		) {
			toast.success(`You found ${character.name}`);
			setCharacters(characters.filter((c) => c.id !== character.id));
			setMarkers((prev) => [...prev, { x: selectedCoords.x, y: selectedCoords.y }]);
		} else {
			toast.error("Try again", { duration: 2000 });
		}
		setShowDropdownMenu(false);
		if (characters.length === 0 && markers.length >= map.characters?.length!) {
			setGame(false);
		}
	};

	return (
		<>
			<div className="flex flex-col justify-center relative w-full h-auto">
				<div className="flex flex-row justify-between mx-10">
					{startTimer && <Timer game={game} />}

					{characters.length > 0 && (
						<div className="flex justify-center items-center gap-2 pb-4">
							{characters.map((character) => (
								<div
									key={nanoid()}
									className="w-32 h-auto flex items-center justify-around cursor-pointer"
								>
									<Image
										src={character.image_url}
										alt={""}
										width={48}
										height={48}
										className="size-12"
									/>
									<h1>{character.name}</h1>
								</div>
							))}
						</div>
					)}
				</div>

				<Image
					src={map.image_url}
					alt={`Image of ${map.title} map`}
					width={0}
					height={0}
					sizes="(height: auto) (width: 100%)"
					onClick={handleClick}
					className="cursor-crosshair w-full h-auto"
					priority={true}
					onLoad={() => setStartTimer(true)}
				/>

				{showDropdownMenu && (
					<DropdownMenu
						characters={characters}
						selectedCoords={selectedCoords}
						handleCharacterSelect={handleCharacterSelect}
						imageDimensions={imageDimensions}
					/>
				)}

				<Markers markers={markers} />

				{!game && (
					<Modal
						time={score}
						map={map}
					/>
				)}
			</div>
		</>
	);
};

export default Game;
