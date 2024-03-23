import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Providers from "@/components/Providers";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Where's Waldo",
	description: "A Where's Waldo (Photo Tagging) game where your goal is to find all the hidden characters.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`flex flex-col ${rubik.className}`}>
				<Providers>
					<>
						<Header />
						{children}
						<Footer />
					</>
				</Providers>
			</body>
		</html>
	);
}
