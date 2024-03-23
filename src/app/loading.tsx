import { FadeLoader } from "react-spinners";

const LoadingScreen = () => {
	return (
		<div className="flex flex-col justify-center items-center text-center p-5">
			<FadeLoader color="#4f46e5" radius={10} />
		</div>
	);
};

export default LoadingScreen;
