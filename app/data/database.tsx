export const signatures = ["AA", "BB", "CC", "DD", "EE"];

export const cribColors = [
	"White",
	"Natural Wood",
	"Black",
	"Grey",
	"Brushed Metal",
	"Bamboo",
];

export const sides = ["Lewa", "Prawa", "Uniwersalna", "Nie określono"];

export const cribStandardLengths = ["120", "140", "160", "180", "200"];

export const cribStandardWidths = ["60", "70", "80", "90", "100"];

export const getAvailableLegs = (
	selectedColor: string,
	selectedMaterial: string
) => {
	const cleanColor = selectedColor.replace(/(✅|❌)\s*/g, "").toLowerCase();
	const cleanMaterial = selectedMaterial.trim().toLowerCase();
	if (
		["white", "black"].includes(cleanColor) &&
		["metal"].includes(cleanMaterial)
	) {
		return [
			"Nogi standardowe",
			"Nogi regulowane",
			"Podstawa bujana",
			"Kółka",
			"Mocowanie do ściany",
		];
	}

	if (cleanColor === "brushed metal" && ["metal"].includes(cleanMaterial)) {
		return [
			"Nogi standardowe",
			"Nogi regulowane",
			"Podstawa bujana",
			"Mocowanie do ściany",
		];
	}

	return ["Nogi standardowe", "Nogi regulowane"];
};

export const cribStandardDimensions = [
	"120x60",
	"140x70",
	"160x80",
	"180x90",
	"200x100",
	"niestandardowe",
];

export const additionalNotes = [
	"Regulowana wysokość materaca",
	"Dodatkowe nogi",
	"Otwierane boki",
	"System kołysania",
	"Dodatkowy schowek",
	"Montaż do ściany",
	"Mobilne kółka",
	"Antyalergiczne wykończenie",
	"Ekologiczne materiały",
	"Wzmocnione elementy konstrukcji",
];

export const standardPhrases = [
	"Prosimy o podanie preferowanego układu łóżeczka.",
	"Wysokość łóżeczka może się różnić w zależności od wybranego modelu.",
	"Dostępne kolory mogą się różnić w zależności od wybranego układu.",
	"System kołysania może być opcjonalnie blokowany dla większego bezpieczeństwa.",
	"Dla modeli ze stabilizatorem kątowym konieczne jest dopasowanie do podłoża.",
	"Nie zalecamy montażu na nierównych powierzchniach, aby uniknąć niestabilności.",
];

export interface Crib {
	name: string;
	models: {
		name: string;
		legs: string[];
	}[];
	heights: string[];
	getAvailableColors: (selectedModel: string) => string[];
	material: string[];
}

export const cribs: Crib[] = [
	{
		name: "DreamNest",
		models: [
			{ name: "Classic I", legs: ["Nogi standardowe"] },
			{ name: "Classic II", legs: ["Nogi regulowane"] },
			{ name: "Modern I", legs: ["Podstawa bujana"] },
			{ name: "Modern II", legs: ["Nogi standardowe"] },
			{ name: "XL", legs: ["Mocowanie do ściany"] },
		],
		heights: ["900", "1000", "1100"],
		getAvailableColors: (selectedModel) => {
			if (selectedModel.includes("Modern")) {
				return ["White", "Black"];
			}
			if (selectedModel.includes("Classic")) {
				return ["Natural Wood", "White"];
			}
			return ["White", "Black", "Natural Wood", "Grey"];
		},
		material: ["Drewno", "Metal"],
	},
	{
		name: "BabyComfort",
		models: [
			{ name: "Soft I", legs: ["Nogi standardowe"] },
			{ name: "Soft II", legs: ["Nogi regulowane"] },
			{ name: "Soft III", legs: ["Kółka"] },
			{ name: "Hard I", legs: ["Podstawa bujana"] },
		],
		heights: ["950"],
		getAvailableColors: (selectedModel) => {
			if (selectedModel.includes("Soft")) {
				return ["White"];
			}
			return ["White", "Grey"];
		},
		material: ["Drewno"],
	},
	{
		name: "TinySleep",
		models: [
			{ name: "Mini I", legs: ["Nogi standardowe"] },
			{ name: "Mini II", legs: ["Nogi regulowane"] },
			{ name: "Mini III", legs: ["Kółka"] },
		],
		heights: ["850", "900"],
		getAvailableColors: (selectedModel) => {
			if (selectedModel) {
				return ["White", "Natural Wood"];
			}
			return ["White", "Natural Wood"];
		},
		material: ["Drewno"],
	},
	{
		name: "CozyCrib",
		models: [
			{ name: "Comfort I", legs: ["Nogi standardowe"] },
			{ name: "Comfort II", legs: ["Nogi regulowane"] },
			{ name: "Comfort III", legs: ["Podstawa bujana"] },
		],
		heights: ["920", "980"],
		getAvailableColors: (selectedModel) => {
			if (selectedModel) {
				return ["White", "Grey", "Natural Wood"];
			}
			return ["White", "Grey", "Natural Wood"];
		},
		material: ["Drewno", "Bambus"],
	},
	{
		name: "SleepWell",
		models: [
			{ name: "Deluxe I", legs: ["Nogi standardowe"] },
			{ name: "Deluxe II", legs: ["Nogi regulowane"] },
			{ name: "Deluxe III", legs: ["Kółka"] },
			{ name: "Deluxe IV", legs: ["Mocowanie do ściany"] },
		],
		heights: ["900", "1000"],
		getAvailableColors: (selectedModel) => {
			if (selectedModel) {
				return ["White", "Black", "Natural Wood", "Brushed Metal"];
			}
			return ["White", "Black", "Natural Wood", "Brushed Metal"];
		},
		material: ["Drewno", "Metal"],
	},
];
