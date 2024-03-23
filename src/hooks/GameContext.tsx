"use client";

import React, { createContext, useState } from "react";

export type TGameContext = {
	score: string;
	setScore: (score: string) => void;
};

export const GameContext = createContext<TGameContext | null>(null);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [score, setScore] = useState("00:00:00");

	return <GameContext.Provider value={{ score, setScore }}>{children}</GameContext.Provider>;
};
