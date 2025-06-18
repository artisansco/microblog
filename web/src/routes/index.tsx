import viteLogo from "/vite.svg";
import reactLogo from "../assets/react.svg";

export default function Homepage() {
	return (
		<>
			<div className="flex h-[100dvh] items-center justify-center *:size-20">
				<h1 className="font-bold">Microblog</h1>
				<img src={viteLogo} className="logo" alt="Vite logo" />
				<img src={reactLogo} className="logo react" alt="React logo" />
			</div>
		</>
	);
}
