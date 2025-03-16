import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "../globals.css";
import Link from "next/link";

interface EditableGridProps {
	selectedCrib?: string | null;
	selectedColor?: string | null;
	selectedModel?: string | null;
	selectedSide?: string | null;
	selectedDimensions?: string | null;
	selectedLength?: string | null;
	selectedWidth?: string | null;
	selectedHeight?: string | null;
	selectedLegs?: string | null;
	selectedMaterial?: string | null;
	additionalNotesList?: string[];
	selectedPhrases?: string[];
	additionalChanges?: string[];
}

const EditableGrid: React.FC<EditableGridProps> = (props) => {
	const [tableData, setTableData] = useState<EditableGridProps>({ ...props });
	const contentRef = useRef<HTMLDivElement>(null);
	const [notification, setNotification] = useState<string | null>(null);
	const [resetKey, setResetKey] = useState(0);

	const showNotification = (message: string) => {
		setNotification(message);
		setTimeout(() => setNotification(null), 3000);
	};

	const resetContent = () => {
		setTableData({ ...props });
		setResetKey((prev) => prev + 1);
		showNotification("Przywrócono wartości początkowe!");
	};

	const copyContent = async () => {
		if (contentRef.current) {
			try {
				const htmlToCopy = `
                    <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
                        ${contentRef.current.innerHTML}
                    </table>
                `;
				const blob = new Blob([htmlToCopy], { type: "text/html" });
				const clipboardItem = new ClipboardItem({ "text/html": blob });

				await navigator.clipboard.write([clipboardItem]);

				setNotification("Skopiowano do schowka!");
				setTimeout(() => setNotification(null), 3000);
			} catch (err) {
				console.error("Błąd kopiowania: ", err);
				setNotification("Nie udało się skopiować do schowka.");
				setTimeout(() => setNotification(null), 3000);
			}
		}
	};

	const getDimensions = (): string | null | undefined =>
		tableData.selectedDimensions === "niestandardowe"
			? [tableData.selectedLength, tableData.selectedWidth]
					.filter(Boolean)
					.join(" x ")
			: tableData.selectedDimensions;

	const cleanIcons = (item: string | null | undefined) => {
		return item ? item.replace(/[❌✅⭐]/g, "").trim() : "";
	};

	const formatProps = (...props: (string | null | undefined)[]) => {
		return props
			.filter(Boolean)
			.map((prop) => prop!.replace(/\s+/g, "-"))
			.join("-");
	};

	const formattedString = formatProps(
		tableData.selectedCrib,
		cleanIcons(tableData.selectedColor) === "Natural Wood"
			? null
			: cleanIcons(tableData.selectedColor),
		tableData.selectedModel
	);

	useEffect(() => {
		setTableData({ ...props });
	}, [props]);

	return (
		<div key={resetKey}>
			<div ref={contentRef}>
				<div
					contentEditable
					className="container m-5"
					suppressContentEditableWarning={true}
				>
					<motion.span
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="block mb-4 text-black"
					>
						<span className=" block mb-4 text-black">
							Dzień dobry, <br />
							<br />
							{tableData.selectedCrib && tableData.selectedModel && (
								<Link
									href={`https://www.stronazlozeczkami.pl/kategoria/${formattedString}/`}
									passHref
								>
									https://www.stronazlozeczkami.pl/kategoria/{formattedString}/
								</Link>
							)}
							{tableData.selectedCrib && tableData.selectedModel && (
								<div>
									<Link
										href={`https://www.stronazlozeczkami.pl/uploads/catalog-sheets/pl/karta-katalogowa-${formattedString}.pdf`}
										passHref
									>
										https://www.stronazlozeczkami.pl/uploads/catalog-sheets/pl/karta-katalogowa-
										{formattedString}.pdf/
									</Link>
									<br />
									<br />
								</div>
							)}
							{tableData.selectedPhrases && tableData.selectedPhrases.length > 0
								? tableData.selectedPhrases.map((phrase) => (
										<motion.div
											key={phrase}
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -10 }}
											transition={{ duration: 0.5 }}
										>
											{phrase}
											<div>&nbsp;</div>
										</motion.div>
								  ))
								: ""}
							<br />
							Prosimy o zweryfikowanie przyjętych atrybutów produktu oraz ich
							zatwierdzenie lub uwagi do ewentualnej modyfikacji.
						</span>
					</motion.span>
					<div>
						<table className="border-collapse border border-gray-300 w-full">
							<tbody>
								{tableData.selectedCrib && (
									<motion.tr
										initial={{ opacity: 0, y: 5 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 5 }}
										transition={{ duration: 0.4, ease: "easeInOut" }}
									>
										<td
											className="table-label"
											style={{ textAlign: "right", fontWeight: "bold" }}
										>
											Łóżeczko:
										</td>
										<td className="table-value">
											{tableData.selectedCrib}{" "}
											{cleanIcons(tableData.selectedColor)}{" "}
											{tableData.selectedModel}
										</td>
									</motion.tr>
								)}
								{(tableData.selectedDimensions ||
									tableData.selectedLength ||
									tableData.selectedWidth) && (
									<motion.tr
										initial={{ opacity: 0, y: 5 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 5 }}
										transition={{ duration: 0.4, ease: "easeInOut" }}
									>
										<td
											className="table-label"
											style={{ textAlign: "right", fontWeight: "bold" }}
										>
											Wymiary:
										</td>
										<td className="table-value">{getDimensions()}</td>
									</motion.tr>
								)}
								{tableData.selectedSide && (
									<motion.tr
										initial={{ opacity: 0, y: 5 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 5 }}
										transition={{ duration: 0.4, ease: "easeInOut" }}
									>
										<td
											className="table-label"
											style={{ textAlign: "right", fontWeight: "bold" }}
										>
											Strona łóżeczka:
										</td>
										<td className="table-value">{tableData.selectedSide}</td>
									</motion.tr>
								)}
								{tableData.selectedHeight && (
									<motion.tr
										initial={{ opacity: 0, y: 5 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 5 }}
										transition={{ duration: 0.4, ease: "easeInOut" }}
									>
										<td
											className="table-label"
											style={{ textAlign: "right", fontWeight: "bold" }}
										>
											Wysokość:
										</td>
										<td className="table-value">
											{tableData.selectedHeight}mm
										</td>
									</motion.tr>
								)}
								{tableData.selectedLegs && (
									<motion.tr
										initial={{ opacity: 0, y: 5 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 5 }}
										transition={{ duration: 0.4, ease: "easeInOut" }}
									>
										<td
											className="table-label"
											style={{ textAlign: "right", fontWeight: "bold" }}
										>
											Nogi łóżeczka:
										</td>
										<td className="table-value">
											{cleanIcons(tableData.selectedLegs)}
										</td>
									</motion.tr>
								)}
								{tableData.selectedMaterial && (
									<motion.tr
										initial={{ opacity: 0, y: 5 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 5 }}
										transition={{ duration: 0.4, ease: "easeInOut" }}
									>
										<td
											className="table-label"
											style={{ textAlign: "right", fontWeight: "bold" }}
										>
											Rodzaj szkła:
										</td>
										<td className="table-value">
											{tableData.selectedMaterial}
										</td>
									</motion.tr>
								)}

								{tableData.additionalNotesList?.some(
									(note) => note.trim() !== ""
								) && (
									<motion.tr
										initial={{ opacity: 0, y: 5 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 5 }}
										transition={{ duration: 0.4, ease: "easeInOut" }}
									>
										<td
											className="table-label"
											style={{ textAlign: "right", fontWeight: "bold" }}
										>
											Dodatkowe uwagi:
										</td>
										<td className="table-value">
											{tableData.additionalNotesList
												?.filter((note) => note.trim())
												.map((note, index) => (
													<div key={index}>{note}</div>
												))}
										</td>
									</motion.tr>
								)}
							</tbody>
						</table>
					</div>

					<div className="text-black" style={{ fontWeight: "bold" }}>
						Wycena:
					</div>

					<div className="text-red" style={{ color: "red " }}>
						Cena produktu niestandardowego na bazie {tableData.selectedCrib}{" "}
						{cleanIcons(tableData.selectedColor)} {tableData.selectedModel}
						{tableData.additionalChanges &&
						tableData.additionalChanges.length > 0
							? tableData.additionalChanges.join("")
							: ""}
					</div>
				</div>
			</div>

			<div className="mt-4 flex gap-2 ml-5 place-content-between mr-5">
				<button
					onClick={copyContent}
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
				>
					Kopiuj
				</button>
				<button
					onClick={resetContent}
					className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
				>
					Resetuj
				</button>
				{notification && (
					<div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
						{notification}
					</div>
				)}
			</div>
		</div>
	);
};

export default EditableGrid;
