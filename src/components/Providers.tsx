"use client";

import { GameProvider } from "@/hooks/GameContext";
import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
	children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
	return (
		<>
			<GameProvider>
				<Toaster position="top-center" reverseOrder={false} />
				{children}
			</GameProvider>
		</>
	);
};

export default Providers;
