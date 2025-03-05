export const signatures = ["AA", "BB", "CC", "DD", "EE"];

export const cribColors = [
	"White",
	"Natural Wood",
	"Black",
	"Grey",
	"Brushed Metal",
	"Bamboo",
];

export const additionalNotes = [
	"Regulowana wysokość materaca",
	"Dodatkowy stabilizator",
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

export const cribMaterials = ["Drewno", "Metal", "Bambus"];

export const mattressSizes = ["90x50", "120x60", "140x70", "160x80", "180x90"];

export const cribLayouts = [
	"Classic I",
	"Classic II",
	"Modern I",
	"Modern II",
	"XL",
	"Soft I",
	"Soft II",
	"Soft III",
	"Hard I",
	"Mini I",
	"Mini II",
	"Mini III",
	"Comfort I",
	"Comfort II",
	"Comfort III",
	"Deluxe I",
	"Deluxe II",
	"Deluxe III",
	"Deluxe IV",
];

export const cribHeights = ["850", "900", "920", "950", "980", "1000", "1100"];

export const cribLegs = [
	"Nogi standardowe",
	"Nogi regulowane",
	"Podstawa bujana",
	"Kółka",
	"Mocowanie do ściany",
];

interface Crib {
	name: string;
	layouts: {
		name: string;
		legs: string[];
	}[];
	heights: string[];
	getAvailableColors: (selectedLayout: string) => string[];
	material: string[];
	mattress_sizes: string[];
}

export const cribs: Crib[] = [
	{
		name: "DreamNest",
		layouts: [
			{ name: "Classic I", legs: ["Nogi standardowe"] },
			{ name: "Classic II", legs: ["Nogi regulowane"] },
			{ name: "Modern I", legs: ["Podstawa bujana"] },
			{ name: "Modern II", legs: ["Nogi standardowe"] },
			{ name: "XL", legs: ["Mocowanie do ściany"] },
		],
		heights: ["900", "1000", "1100"],
		getAvailableColors: (selectedLayout) => {
			if (selectedLayout.includes("Modern")) {
				return ["White", "Black"];
			}
			if (selectedLayout.includes("Classic")) {
				return ["Natural Wood", "White"];
			}
			return ["White", "Black", "Natural Wood", "Grey"];
		},
		material: ["Drewno", "Metal"],
		mattress_sizes: ["120x60", "140x70"],
	},
	{
		name: "BabyComfort",
		layouts: [
			{ name: "Soft I", legs: ["Nogi standardowe"] },
			{ name: "Soft II", legs: ["Nogi regulowane"] },
			{ name: "Soft III", legs: ["Kółka"] },
			{ name: "Hard I", legs: ["Podstawa bujana"] },
		],
		heights: ["950"],
		getAvailableColors: (selectedLayout) => {
			return ["White", "Grey"];
		},
		material: ["Drewno"],
		mattress_sizes: ["120x60"],
	},
	{
		name: "TinySleep",
		layouts: [
			{ name: "Mini I", legs: ["Nogi standardowe"] },
			{ name: "Mini II", legs: ["Nogi regulowane"] },
			{ name: "Mini III", legs: ["Kółka"] },
		],
		heights: ["850", "900"],
		getAvailableColors: (selectedLayout) => {
			return ["White", "Natural Wood"];
		},
		material: ["Drewno"],
		mattress_sizes: ["90x50"],
	},
	{
		name: "CozyCrib",
		layouts: [
			{ name: "Comfort I", legs: ["Nogi standardowe"] },
			{ name: "Comfort II", legs: ["Nogi regulowane"] },
			{ name: "Comfort III", legs: ["Podstawa bujana"] },
		],
		heights: ["920", "980"],
		getAvailableColors: (selectedLayout) => {
			return ["White", "Grey", "Natural Wood"];
		},
		material: ["Drewno", "Bambus"],
		mattress_sizes: ["120x60"],
	},
	{
		name: "SleepWell",
		layouts: [
			{ name: "Deluxe I", legs: ["Nogi standardowe"] },
			{ name: "Deluxe II", legs: ["Nogi regulowane"] },
			{ name: "Deluxe III", legs: ["Kółka"] },
			{ name: "Deluxe IV", legs: ["Mocowanie do ściany"] },
		],
		heights: ["900", "1000"],
		getAvailableColors: (selectedLayout) => {
			return ["White", "Black", "Natural Wood", "Brushed Metal"];
		},
		material: ["Drewno", "Metal"],
		mattress_sizes: ["120x60", "140x70"],
	},
];
