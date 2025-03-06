"use client";
import SignatureGenerator from "./components/SignatureGenerator";
import Button from "./components/Button";
import { Accordion } from "./components/Accordion";

const resetSelections = () => {
	console.log("reset");
};

export default function Home() {
	return (
		<main className="bg-stone-900 min-h-screen h-auto">
			<div className="flex place-content-around h-fit py-5">
				<SignatureGenerator />
				<Button onClick={resetSelections} label="Wyczyść wszystko"></Button>
			</div>
			<div className="flex place-content-between">
				<div className="w-max m-5">
					<Accordion title="Konfiguracja">
						<div></div>
					</Accordion>
					<Accordion title="Standardowe Frazy">
						<div></div>
					</Accordion>
				</div>
			</div>
		</main>
	);
}
