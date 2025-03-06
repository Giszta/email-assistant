"use client";
import SignatureGenerator from "./components/SignatureGenerator";
import Button from "./components/Button";

const resetSelections = () => {
	console.log("reset");
};

export default function Home() {
	return (
		<main className="bg-background min-h-screen h-auto">
			<div className="flex place-content-around h-fit py-5">
				<SignatureGenerator />
				<Button onClick={resetSelections} label="Wyczyść wszystko"></Button>
			</div>
		</main>
	);
}
