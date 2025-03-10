import React from "react";
import DropdownList from "./DropdownList";

interface LabeledDropdownProps {
	title: string;
	items: string[] | null;
	onSelect: (item: string | null) => void;
	onInputChange: (inputValue: string) => void;
	value?: string | null;
}

const LabeledDropdown = ({
	title,
	items,
	onSelect,
	onInputChange,
	value,
}: LabeledDropdownProps) => {
	return (
		<div className="flex">
			<h1
				className="mr-2 text-primary w-56 text-right self-center"
				aria-label={`Label for ${title}`}
			>
				{title}
			</h1>
			<DropdownList
				items={items}
				onSelect={onSelect}
				onInputChange={onInputChange}
				value={value}
			/>
		</div>
	);
};

export default LabeledDropdown;
