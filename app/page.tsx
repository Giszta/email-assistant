"use client";
import SignatureGenerator from "./components/SignatureGenerator";
import Button from "./components/Button";
import { Accordion } from "./components/Accordion";
import LabeledDropdown from "./components/LabeledDropdown";
import { useEffect, useMemo, useState } from "react";
import {
	cribs,
	cribColors,
	sides,
	cribStandardLengths,
	cribStandardWidths,
	Crib,
	getAvailableLegs,
	cribStandardDimensions,
	additionalNotes,
	standardPhrases,
} from "./data/database";
import StandardPhrases from "./components/StandardPhrases";
import EditableGrid from "./components/EditableMailTextbox";

export default function Home() {
	const [selectedCrib, setSelectedCrib] = useState<string | null>("");
	const [selectedModel, setSelectedModel] = useState<string | null>("");
	const [selectedColor, setSelectedColor] = useState<string | null>("");
	const [selectedSide, setSelectedSide] = useState<string | null>("");
	const [selectedLength, setSelectedLength] = useState<string | null>("");
	const [selectedWidth, setselectedWidth] = useState<string | null>("");
	const [selectedHeight, setSelectedHeight] = useState<string | null>("");
	const [selectedMaterial, setSelectedMaterial] = useState<string | null>("");
	const [selectedLegs, setSelectedLegs] = useState<string | null>("");
	const [selectedDimensions, setSelectedDimensions] = useState<string | null>(
		""
	);
	const [additionalNotesList, setAdditionalNotesList] = useState<string[]>([
		"",
	]);
	const [selectedPhrases, setSelectedPhrases] = useState<string[]>([]);
	const [additionalChanges, setAdditionalChanges] = useState<string[]>([]);

	const handleCribSelection = (selectedCrib: string | null) => {
		setSelectedCrib(selectedCrib);
	};

	const selectedCribData = cribs.find((crib) => crib.name === selectedCrib);

	const getModelsForSelectedCrib = useMemo(() => {
		if (!selectedCribData) return [];
		return selectedCribData.models?.map((model) => model.name) || [];
	}, [selectedCribData]);

	const availableColors =
		typeof selectedCribData?.getAvailableColors === "function" && selectedModel
			? selectedCribData.getAvailableColors(selectedModel) ?? []
			: [];
	const sortedColors = [
		...availableColors,
		...cribColors.filter((color) => !availableColors.includes(color)),
	];

	const getHeightsForSelectedCrib = useMemo(() => {
		if (!selectedCribData) return [];
		return selectedCribData?.heights || [];
	}, [selectedCribData]);

	const getMaterialsForSelectedCrib = useMemo(
		() => selectedCribData?.material || [],
		[selectedCribData]
	);

	const getDefaultLegsForSelectedCrib = (
		cribs: Crib[],
		selectedCrib: string | null,
		selectedModel: string | null
	) => {
		const crib = cribs.find((crib) => crib.name === selectedCrib);
		if (!crib || !selectedModel) return null;

		const model = crib.models.find((model) => model.name === selectedModel);
		if (!model || !Array.isArray(model.legs) || model.legs.length === 0) {
			return null;
		}

		return model.legs[0];
	};

	const availableLegs = getAvailableLegs(
		selectedColor || "",
		selectedMaterial || ""
	);

	const defaultLegs = getDefaultLegsForSelectedCrib(
		cribs,
		selectedCrib,
		selectedModel
	);
	const sortedLegs = [
		...(defaultLegs ? [`⭐ ${defaultLegs}`] : []),
		...availableLegs.filter((legs) => legs && legs !== defaultLegs),
	];

	const handleAdditionalNoteChange = (index: number, value: string | null) => {
		const newNotes = [...additionalNotesList];
		newNotes[index] = value ?? ""; // Zamień null na pusty string

		// Jeśli wpisano nową wartość w ostatnim polu, dodaj nowe pole
		if (index === newNotes.length - 1 && value?.trim() !== "") {
			newNotes.push("");
		}

		// Usuń puste pola (oprócz ostatniego, który zawsze zostawiamy)
		const filteredNotes = newNotes.filter(
			(note, i) => note?.trim() !== "" || i === newNotes.length - 1
		);

		setAdditionalNotesList(filteredNotes);
	};
	const availableHeights = useMemo(
		() => selectedCribData?.heights || [],
		[selectedCribData]
	);

	useEffect(() => {
		if (!selectedHeight) return;
		if (!availableHeights.includes(selectedHeight)) {
			setAdditionalNotesList((prev) => {
				if (!prev.includes("Zmiana wysokości")) {
					return ["Zmiana wysokości", ...prev];
				}
				return prev;
			});
		} else {
			setAdditionalNotesList((prev) =>
				prev.filter((note) => note !== "Zmiana wysokości")
			);
		}
	}, [selectedHeight, availableHeights]);

	useEffect(() => {
		setAdditionalChanges((prev) => {
			const newChanges = prev.filter(
				(change) =>
					!change.includes("+dopłata za niestandardowe wymiary") &&
					!change.includes("+Regulowana wysokość materaca") &&
					!change.includes("+Dodatkowe nogi") &&
					!change.includes("+Factory") &&
					!change.includes("+Otwierane boki") &&
					!change.includes("+System kołysania") &&
					!change.includes("+Dodatkowy schowek") &&
					!change.includes("+Montaż do ściany") &&
					!change.includes("+Mobilne kółka") &&
					!change.includes("+Antyalergiczne wykończenie") &&
					!change.includes("+Ekologiczne materiały") &&
					!change.includes("+Wzmocnione elementy konstrukcji") &&
					!change.includes("+Zmiana wysokości")
			);

			if (
				selectedDimensions === "niestandardowe" &&
				selectedLength &&
				selectedWidth
			) {
				newChanges.push(
					` +dopłata za niestandardowe wymiary ${selectedLength}x${selectedWidth}`
				);
			}

			if (additionalNotesList.includes("Regulowana wysokość materaca")) {
				newChanges.push(" +Regulowana wysokość materaca");
			}
			if (additionalNotesList.includes("Dodatkowe nogi")) {
				newChanges.push(" +Dodatkowe nogi");
			}
			if (additionalNotesList.includes("Otwierane boki")) {
				newChanges.push(" +Otwierane boki");
			}
			if (additionalNotesList.includes("System kołysania")) {
				newChanges.push(" +System kołysania");
			}
			if (additionalNotesList.includes("Dodatkowy schowek")) {
				newChanges.push(" +Dodatkowy schowek");
			}
			if (additionalNotesList.includes("Montaż do ściany")) {
				newChanges.push(" +Montaż do ściany");
			}
			if (additionalNotesList.includes("Mobilne kółka")) {
				newChanges.push(" +Mobilne kółka");
			}
			if (additionalNotesList.includes("Antyalergiczne wykończenie")) {
				newChanges.push(" +Antyalergiczne wykończenie");
			}
			if (additionalNotesList.includes("Ekologiczne materiały")) {
				newChanges.push(" +Ekologiczne materiały");
			}
			if (additionalNotesList.includes("Wzmocnione elementy konstrukcji")) {
				newChanges.push(" +Wzmocnione elementy konstrukcji");
			}
			if (additionalNotesList.includes("Zmiana wysokości")) {
				newChanges.push(" +Zmiana wysokości");
			}
			return newChanges;
		});
	}, [
		selectedDimensions,
		additionalNotesList,
		setAdditionalChanges,
		selectedLength,
		selectedWidth,
	]);
	const handleSelectionChange = (selected: string[]) => {
		setSelectedPhrases(selected);
	};
	const resetSelections = () => {
		setSelectedCrib(null);
		setSelectedModel(null);
		setSelectedColor(null);
		setSelectedSide(null);
		setSelectedLength(null);
		setselectedWidth(null);
		setSelectedHeight(null);
		setSelectedMaterial(null);
		setSelectedLegs(null);
		setSelectedDimensions(null);
		setAdditionalNotesList([""]);
		setAdditionalChanges([]);
		setSelectedPhrases([]);
	};
	return (
		<main className="bg-stone-900 min-h-screen h-auto">
			<div className="flex place-content-around h-fit py-5">
				<SignatureGenerator />
				<Button onClick={resetSelections} label="Wyczyść wszystko"></Button>
			</div>
			<div className="flex place-content-between">
				<div className="w-max m-5">
					<Accordion title="Konfiguracja">
						<div className="flex items-center flex-col gap-1 flex-wrap h-full">
							<div className="flex items-center gap-2">
								<LabeledDropdown
									title="Seria łóżeczka:"
									items={cribs.map((crib) => crib.name)}
									onSelect={handleCribSelection}
									onInputChange={handleCribSelection}
									value={selectedCrib}
								/>
							</div>
							<div className="flex items-center gap-2">
								<LabeledDropdown
									title="Model łóżeczka:"
									items={getModelsForSelectedCrib}
									onSelect={(selectedModel) => setSelectedModel(selectedModel)}
									onInputChange={(inputValue) => setSelectedModel(inputValue)}
									value={selectedModel}
								/>
							</div>
							<div className="flex items-center gap-2">
								<LabeledDropdown
									title="Kolor łóżeczka:"
									items={sortedColors.map((color) =>
										availableColors.includes(color)
											? `✅ ${color}`
											: `❌ ${color}`
									)}
									onSelect={setSelectedColor}
									onInputChange={setSelectedColor}
									value={selectedColor}
								/>
							</div>
							<div className="flex items-center gap-2">
								<LabeledDropdown
									title="Strona łóżeczka:"
									items={sides.map((side) => side)}
									onSelect={setSelectedSide}
									onInputChange={setSelectedSide}
									value={selectedSide}
								/>
							</div>
							<div className="flex items-center gap-2">
								<LabeledDropdown
									title="Wymiary (dł x szer):"
									items={cribStandardDimensions.map((dimension) => dimension)}
									onSelect={setSelectedDimensions}
									onInputChange={setSelectedDimensions}
									value={selectedDimensions}
								/>
							</div>
							{selectedDimensions === "niestandardowe" && (
								<div className="flex items-center gap-2">
									<LabeledDropdown
										title="Długość:"
										items={cribStandardLengths.map((length) => length)}
										onSelect={setSelectedLength}
										onInputChange={setSelectedLength}
										value={selectedLength}
									/>
								</div>
							)}
							{selectedDimensions === "niestandardowe" && (
								<div className="flex items-center gap-2">
									<LabeledDropdown
										title="Szerokość:"
										items={cribStandardWidths.map((width) => width)}
										onSelect={setselectedWidth}
										onInputChange={setselectedWidth}
										value={selectedWidth}
									/>
								</div>
							)}
							<div className="flex items-center gap-2">
								<LabeledDropdown
									title="Wysokość:"
									items={getHeightsForSelectedCrib}
									onSelect={setSelectedHeight}
									onInputChange={setSelectedHeight}
									value={selectedHeight}
								/>
							</div>
							<div className="flex items-center gap-2">
								<LabeledDropdown
									title="Materiał ramy:"
									items={getMaterialsForSelectedCrib}
									onSelect={setSelectedMaterial}
									onInputChange={setSelectedMaterial}
									value={selectedMaterial}
								/>
							</div>
							<div className="flex items-center gap-2">
								<LabeledDropdown
									title="Nogi:"
									items={sortedLegs}
									onSelect={setSelectedLegs}
									onInputChange={setSelectedLegs}
									value={selectedLegs || defaultLegs || ""}
								/>
							</div>

							{additionalNotesList.map((note, index) => (
								<LabeledDropdown
									key={index}
									title="Dodatkowe uwagi:"
									items={additionalNotes}
									onSelect={(value) => handleAdditionalNoteChange(index, value)}
									onInputChange={(value) =>
										handleAdditionalNoteChange(index, value)
									}
									value={note}
								/>
							))}
						</div>
					</Accordion>
					<Accordion title="Standardowe Frazy">
						<div>
							<StandardPhrases
								options={standardPhrases}
								selectedPhrases={selectedPhrases}
								onSelectionChange={handleSelectionChange}
							/>
						</div>
					</Accordion>
				</div>
				<div>
					<EditableGrid
						selectedCrib={selectedCrib}
						selectedModel={selectedModel}
						selectedColor={selectedColor}
						selectedSide={selectedSide}
						selectedLength={selectedLength}
						selectedWidth={selectedWidth}
						selectedHeight={selectedHeight}
						selectedMaterial={selectedMaterial}
						selectedLegs={selectedLegs}
						selectedDimensions={selectedDimensions}
						additionalNotesList={additionalNotesList}
						additionalChanges={additionalChanges}
						selectedPhrases={selectedPhrases}
					/>
				</div>
			</div>
		</main>
	);
}
