"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
	initialValue?: number;
	min?: number;
	max?: number;
	onChange?: (value: number) => void;
}

export function QuantitySelector({
	initialValue = 1,
	min = 1,
	max = 99,
	onChange,
}: QuantitySelectorProps) {
	const [quantity, setQuantity] = useState(initialValue);

	const increment = () => {
		if (quantity < max) {
			const newValue = quantity + 1;
			setQuantity(newValue);
			onChange?.(newValue);
		}
	};

	const decrement = () => {
		if (quantity > min) {
			const newValue = quantity - 1;
			setQuantity(newValue);
			onChange?.(newValue);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number.parseInt(e.target.value);
		if (!isNaN(value) && value >= min && value <= max) {
			setQuantity(value);
			onChange?.(value);
		}
	};

	return (
		<div className="flex items-center">
			<Button
				variant="outline"
				size="icon"
				className="h-8 w-8 rounded-r-none"
				onClick={decrement}
				disabled={quantity <= min}
			>
				<Minus className="h-3 w-3" />
				<span className="sr-only">Decrease quantity</span>
			</Button>
			<Input
				type="text"
				inputMode="numeric"
				value={quantity}
				onChange={handleInputChange}
				className="h-8 w-12 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
			/>
			<Button
				variant="outline"
				size="icon"
				className="h-8 w-8 rounded-l-none"
				onClick={increment}
				disabled={quantity >= max}
			>
				<Plus className="h-3 w-3" />
				<span className="sr-only">Increase quantity</span>
			</Button>
		</div>
	);
}
