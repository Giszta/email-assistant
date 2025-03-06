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
			className={`bg-red-500 hover:bg-red-700 text-white font-bold px-4 py-0.5 rounded-lg cursor-pointer 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
			aria-disabled={disabled}
		>
			{label}
		</button>
	);
};

export default Button;
