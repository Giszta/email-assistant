import React, { useState } from "react";
import DropdownMenu from "./DropdownList";
import { signatures } from "../data/database";

function SignatureGenerator() {
	const [selectedSignature, setSelectedSignature] = useState<string | null>(
		null
	);
	const [timestamp, setTimestamp] = useState<string | null>(null);
	const [notification, setNotification] = useState<string | null>(null);

	const generateTimestamp = (): string => {
		const now = new Date();
		const year = now.getFullYear().toString().slice(-2);
		const month = (now.getMonth() + 1).toString().padStart(2, "0");
		const day = now.getDate().toString().padStart(2, "0");
		const hours = now.getHours().toString().padStart(2, "0");
		const minutes = now.getMinutes().toString().padStart(2, "0");
		return `${year}${month}${day}${hours}${minutes}`;
	};

	const copyToClipboard = () => {
		if (!navigator.clipboard) {
			setNotification("Kopiowanie nie jest obsługiwane w tej przeglądarce.");
			return;
		}

		const newTimestamp = generateTimestamp();
		setTimestamp(newTimestamp);
		const content = `[${selectedSignature || ""}${newTimestamp}]`;

		navigator.clipboard
			.writeText(content)
			.then(() => {
				setNotification("Skopiowano do schowka!");
				setTimeout(() => setNotification(null), 3000);
			})
			.catch(() => {
				setNotification("Nie udało się skopiować do schowka.");
				setTimeout(() => setNotification(null), 3000);
			});
	};

	return (
		<div className="flex gap-2">
			<DropdownMenu
				items={signatures}
				onSelect={setSelectedSignature}
				onInputChange={setSelectedSignature}
			/>
			<div className="flex items-center border border-gray-300 rounded-md px-4 py-0.5 h-fit">
				[{selectedSignature}
				{timestamp}]
			</div>
			<button
				onClick={copyToClipboard}
				className="px-4 py-0.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 h-fit"
			>
				Generuj i skopiuj
			</button>
			{notification && (
				<div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
					{notification}
				</div>
			)}
		</div>
	);
}

export default SignatureGenerator;
