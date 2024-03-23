import Link from "next/link";

const Header = () => {
	return (
		<header className="flex flex-row justify-between px-10 py-5 border-b border-zinc-400">
			<Link href={"/"} className="text-3xl font-bold text-indigo-600">
				Wheres Waldo?
			</Link>

			<Link href={"/leaderboard"} className="text-xl font-semibold">
				Leaderboard
			</Link>
		</header>
	);
};

export default Header;
