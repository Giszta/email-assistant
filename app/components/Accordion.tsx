"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface AccordionProps {
	title: string;
	children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<motion.div className="m-5 border border-gray-300 rounded-lg shadow-md overflow-hidden text-black">
			<button
				className="w-full flex justify-between items-center p-4 text-lg font-medium bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 transition-all"
				onClick={() => setIsOpen(!isOpen)}
				aria-expanded={isOpen}
				aria-controls="accordion-content"
			>
				{title}
				<motion.div
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.3 }}
					className="transform-origin-center"
				>
					<ChevronDown className="w-5 h-5" />
				</motion.div>
			</button>
			<motion.div
				id="accordion-content"
				initial={{ maxHeight: 0, opacity: 0 }}
				animate={{ maxHeight: isOpen ? 500 : 0, opacity: isOpen ? 1 : 0 }}
				exit={{ maxHeight: 0, opacity: 0 }}
				transition={{ duration: 0.4, ease: "easeInOut" }}
				className="overflow-hidden bg-white"
				role="region"
			>
				<motion.div
					className="p-4"
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
				>
					{children}
				</motion.div>
			</motion.div>
		</motion.div>
	);
};
