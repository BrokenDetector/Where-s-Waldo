import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const loading = () => {
	return (
		<>
			<h1 className="self-center text-xl mt-5">
				Map: <Skeleton height={25} width={200} />
			</h1>

			<table className="rounded-lg overflow-hidden border-spacing-0 border-separate max-w-[750px] shadow-md border-r-zinc-400 mt-10 bg-indigo-200 self-center p-4 text-lg">
				<thead>
					<tr>
						<td className="p-4">Place</td>
						<td className="p-4">Username</td>
						<td className="p-4">Time</td>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td className="p-4">
							<Skeleton height={60} width={70} />
						</td>
						<td className="p-4">
							<Skeleton height={60} width={100} />
						</td>
						<td className="p-4">
							<Skeleton height={60} width={100} />
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};

export default loading;
