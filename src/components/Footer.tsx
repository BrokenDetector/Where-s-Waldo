import { BsGithub } from "react-icons/bs";

export function Footer() {
	return (
		<footer className="mt-auto py-3 h-fit text-center items-center flex justify-center border-t border-zinc-400 gap-1">
			<h1>Made by</h1>
			<a href="https://github.com/BrokenDetector" className="hover:underline text-indigo-700">
				{" "}
				BrokenDetector
			</a>
			<BsGithub className="size-5" />
		</footer>
	);
}
