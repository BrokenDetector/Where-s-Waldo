import Link from "next/link";

const notFound = () => {
	return (
		<main className="flex flex-col items-center mt-20 text-lg gap-2">
			<h1 className="text-4xl text-indigo-600 font-semibold">There was a problem.</h1>
			<p className="italic">The requested content has not been found.</p>
			<p>
				Go back to the{" "}
				<Link href="/" className="text-indigo-600 hover:underline">
					Home
				</Link>{" "}
				page
			</p>
		</main>
	);
};

export default notFound;
