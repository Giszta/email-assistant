"use client";
import SignatureGenerator from "./components/SignatureGenerator";

export default function Home() {
	return (
		<main className="bg-background min-h-screen h-auto">
			<div className="flex place-content-around h-fit py-5">
				<SignatureGenerator />
			</div>
		</main>
	);
}
