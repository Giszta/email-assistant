"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface DropdownProps {
	items: string[] | null;
	onSelect: (selectedItem: string | null) => void;
	onInputChange: (inputValue: string) => void;
	value?: string | null;
}

const DropdownList: React.FC<DropdownProps> = ({
	items,
	onSelect,
	onInputChange,
	value = "",
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [highlightedIndex, setHighlightedIndex] = useState(-1);
	const valueRef = useRef<string | null>(null);
	const [dropdownPosition, setDropdownPosition] = useState({
		top: 0,
		left: 0,
		width: 0,
	});

	const inputRef = useRef<HTMLInputElement | null>(null);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const filteredItems = Array.isArray(items)
		? items.filter((item) =>
				item.toLowerCase().includes(inputValue.toLowerCase())
		  )
		: [];

	useEffect(() => {
		const updateDropdownPosition = () => {
			if (inputRef.current) {
				const rect = inputRef.current.getBoundingClientRect();
				setDropdownPosition({
					top: rect.bottom + window.scrollY,
					left: rect.left + window.scrollX,
					width: rect.width,
				});
			}
		};

		if (isOpen) {
			updateDropdownPosition();
			window.addEventListener("resize", updateDropdownPosition);
			window.addEventListener("scroll", updateDropdownPosition);
		}

		return () => {
			window.removeEventListener("resize", updateDropdownPosition);
			window.removeEventListener("scroll", updateDropdownPosition);
		};
	}, [isOpen]);

	useEffect(() => {
		if (value !== valueRef.current) {
			setInputValue(value || "");
			valueRef.current = value;
		}
	}, [value]);

	const handleSelectItem = (item: string) => {
		setInputValue(item);
		setIsOpen(false);
		onSelect(item);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputValue(value);
		onInputChange(value);
		setIsOpen(true);
		setHighlightedIndex(-1);
	};

	const handleClearInput = () => {
		setInputValue("");
		setIsOpen(false);
		onSelect(null);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				!inputRef.current?.contains(event.target as Node) &&
				!dropdownRef.current?.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (!isOpen) return;

		if (event.key === "ArrowDown") {
			setHighlightedIndex((prev) =>
				prev < filteredItems.length - 1 ? prev + 1 : 0
			);
		} else if (event.key === "ArrowUp") {
			setHighlightedIndex((prev) =>
				prev > 0 ? prev - 1 : filteredItems.length - 1
			);
		} else if (event.key === "Enter" && highlightedIndex >= 0) {
			handleSelectItem(filteredItems[highlightedIndex]);
		} else if (event.key === "Escape" || event.key === "Tab") {
			setIsOpen(false);
		}
	};

	return (
		<div className="relative inline-block w-40">
			<div className="flex items-center border border-gray-300 rounded-md px-4 py-0.5 focus-within:ring-2 focus-within:ring-blue-500">
				<input
					ref={inputRef}
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					onClick={() => setIsOpen(true)}
					onFocus={() => setIsOpen(true)}
					onKeyDown={handleKeyDown}
					className="w-full focus:outline-none text-black bg-white"
					placeholder="Type or select an option"
				/>
				<button
					type="button"
					tabIndex={-1}
					onClick={handleClearInput}
					className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
					title="Clear selection"
				>
					&times;
				</button>
			</div>

			{isOpen &&
				createPortal(
					<div
						ref={dropdownRef}
						className="absolute z-50 max-h-96 overflow-y-auto bg-white border border-gray-300 shadow-lg rounded-md whitespace-nowrap"
						style={{
							top: dropdownPosition.top,
							left: dropdownPosition.left,
							minWidth: dropdownPosition.width,
						}}
					>
						{filteredItems.length > 0 ? (
							filteredItems.map((item, index) => (
								<div
									key={index}
									className={`px-4 py-2 cursor-pointer text-dropdownPrimary ${
										highlightedIndex === index
											? "bg-blue-500 text-white"
											: "hover:bg-gray-100"
									}`}
									onClick={() => handleSelectItem(item)}
									onMouseEnter={() => setHighlightedIndex(index)}
									onMouseLeave={() => setHighlightedIndex(-1)}
								>
									{item}
								</div>
							))
						) : (
							<div className="px-4 py-2 text-gray-500">Brak wyników</div>
						)}
					</div>,
					document.body
				)}
		</div>
	);
};

export default DropdownList;
