import React from "react";

interface ButtonProps {
	onClick: () => void;
	label: string;
	disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	onClick,
	label,
	disabled = false,
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
			aria-disabled={disabled}
		>
			{label}
		</button>
	);
};

export default Button;
