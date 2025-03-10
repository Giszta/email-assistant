import React, { useState, useEffect } from "react";

interface StandardPhrasesProps {
	options: string[];
	selectedPhrases: string[];
	onSelectionChange: (selectedOptions: string[]) => void;
}

const StandardPhrases: React.FC<StandardPhrasesProps> = ({
	options,
	selectedPhrases,
	onSelectionChange,
}) => {
	const [selectedOptions, setSelectedOptions] =
		useState<string[]>(selectedPhrases);
	const [expanded, setExpanded] = useState<Record<string, boolean>>({});
	const [filterText, setFilterText] = useState<string>("");

	useEffect(() => {
		setSelectedOptions(selectedPhrases);
	}, [selectedPhrases]);

	const handleCheckboxChange = (option: string) => {
		const updatedOptions = selectedOptions.includes(option)
			? selectedOptions.filter((item) => item !== option)
			: [...selectedOptions, option];

		setSelectedOptions(updatedOptions);
		onSelectionChange(updatedOptions);
	};

	const toggleExpand = (option: string) => {
		setExpanded((prev) => ({ ...prev, [option]: !prev[option] }));
	};

	const filteredOptions = options.filter((option) =>
		option.toLowerCase().includes(filterText.toLowerCase())
	);

	return (
		<div className="p-4 space-y-3">
			<div className="relative">
				<input
					type="text"
					placeholder="Szukaj frazy..."
					className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
					value={filterText}
					onChange={(e) => setFilterText(e.target.value)}
					aria-label="Wyszukiwarka fraz"
				/>

				{filterText && (
					<button
						onClick={() => setFilterText("")}
						className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
						aria-label="Wyczyść wyszukiwanie"
					>
						✖
					</button>
				)}
			</div>

			{filteredOptions.length > 0 ? (
				filteredOptions.map((option) => (
					<div
						key={option}
						className="flex items-start space-x-3 bg-gray-100 p-3 rounded-lg shadow-sm"
					>
						<label className="flex items-center space-x-2 cursor-pointer">
							<input
								type="checkbox"
								className="hidden"
								checked={selectedOptions.includes(option)}
								onChange={() => handleCheckboxChange(option)}
								aria-label={`Zaznacz frazę: ${option}`}
							/>

							<div
								className={`w-5 h-5 flex items-center justify-center border-2 rounded-md transition-all shrink-0
								${
									selectedOptions.includes(option)
										? "bg-blue-500 border-blue-500"
										: "border-gray-400"
								}`}
							>
								{selectedOptions.includes(option) && (
									<svg
										className="w-4 h-4 text-white"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								)}
							</div>

							<div className="flex flex-col">
								<span className="cursor-pointer text-gray-700" title={option}>
									{expanded[option] ? option : `${option.slice(0, 50)}...`}
								</span>

								{option.length > 50 && (
									<button
										onClick={() => toggleExpand(option)}
										className="text-blue-500 text-sm underline"
										aria-label={`${
											expanded[option] ? "Pokaż mniej" : "Pokaż więcej"
										} frazy`}
									>
										{expanded[option] ? "Pokaż mniej" : "Pokaż więcej"}
									</button>
								)}
							</div>
						</label>
					</div>
				))
			) : (
				<p className="text-gray-500 text-center">Brak wyników</p>
			)}
		</div>
	);
};

export default StandardPhrases;
