"use client";

import { generateSignature } from "@/helpers/generate-signature";
import { TGame } from "@/types/db";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

interface ModalProps {
	time: string;
	map: TGame;
}

const Modal: FC<ModalProps> = ({ time, map }) => {
	const [username, setUsername] = useState("");
	const router = useRouter();
	const map_id = map.id;

	const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const requestData = {
			username,
			score: time,
			map_id,
		};

		const requestDataString = JSON.stringify(requestData);
		const signature = await generateSignature(requestDataString);

		const request = {
			...requestData,
			signature: signature,
		};

		try {
			fetch("/api/new-score", {
				method: "post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(request),
			}).then((res) => {
				if (res.ok) router.push(`/leaderboard/${map.title}`);
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="fixed bg-black/75 animate-fade-in inset-0 z-50">
			<div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg p-4 bg-indigo-50">
				<div className="mb-3">
					<h1 className="text-xl font-nunito-bold">You finished in {time}</h1>
					<p className="text-slate-800">Submit your score to the leaderboard</p>
				</div>

				<form className="flex flex-col gap-3" onSubmit={handlerSubmit}>
					<label className="flex flex-col gap-1">
						<span className="text-slate-800">Username</span>
						<input
							type="text"
							minLength={1}
							maxLength={25}
							required
							className="w-full rounded-md bg-transparent border-[1px] border-slate-700 h-8"
							name="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</label>

					<button
						type="submit"
						className="self-end rounded-lg px-6 py-1.5 hover:bg-primary/80 transition ease-in-out duration-300 active:scale-95"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default Modal;
