"use client";

import { useState, useEffect } from "react";

export function CountdownTimer() {
	const [timeLeft, setTimeLeft] = useState({
		days: 3,
		hours: 23,
		minutes: 19,
		seconds: 56,
	});

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev.seconds > 0) {
					return { ...prev, seconds: prev.seconds - 1 };
				} else if (prev.minutes > 0) {
					return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
				} else if (prev.hours > 0) {
					return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
				} else if (prev.days > 0) {
					return {
						...prev,
						days: prev.days - 1,
						hours: 23,
						minutes: 59,
						seconds: 59,
					};
				}
				return prev;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="flex items-center gap-4 mb-8">
			<div className="flex items-center gap-4">
				<div className="w-5 h-10 bg-red-500 rounded"></div>
				<span className="text-red-500 font-semibold">New Arrival</span>
			</div>

			<div className="flex items-center gap-4 ml-8">
				<div className="text-center">
					<div className="text-2xl font-bold">
						{timeLeft.days.toString().padStart(2, "0")}
					</div>
					<div className="text-xs text-gray-500">Days</div>
				</div>
				<span className="text-2xl">:</span>
				<div className="text-center">
					<div className="text-2xl font-bold">
						{timeLeft.hours.toString().padStart(2, "0")}
					</div>
					<div className="text-xs text-gray-500">Hours</div>
				</div>
				<span className="text-2xl">:</span>
				<div className="text-center">
					<div className="text-2xl font-bold">
						{timeLeft.minutes.toString().padStart(2, "0")}
					</div>
					<div className="text-xs text-gray-500">Minutes</div>
				</div>
				<span className="text-2xl">:</span>
				<div className="text-center">
					<div className="text-2xl font-bold">
						{timeLeft.seconds.toString().padStart(2, "0")}
					</div>
					<div className="text-xs text-gray-500">Seconds</div>
				</div>
			</div>
		</div>
	);
}
