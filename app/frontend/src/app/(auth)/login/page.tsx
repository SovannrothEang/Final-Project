"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};

		if (!formData.email) {
			newErrors.email = "Email or phone  is required";
		} else if (
			formData.email.includes("@") &&
			!/\S+@\S+\.\S+/.test(formData.email)
		) {
			newErrors.email = "Please enter a valid email address";
		}

		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 8 characters";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setErrors({});

		if (!validateForm()) {
			setIsLoading(false);
			return;
		}

		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Login failed");
			}

			// Redirect to dashboard or home page
			router.push("/admin");
		} catch (error) {
			console.error("Login failed:", error instanceof Error);
			setErrors({
				general:
					error instanceof Error
						? error.message
						: "Login failed. Please check your credentials.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<div className="grid md:grid-cols-2 h-full w-full px-12 gap-8 items-center place-content-center">
				{/* Left Side - Illustration */}
				<div
					className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg
					p-8 flex items-center justify-center min-h-[500px]"
				></div>

				{/* Right Side - Login Form */}
				<div className="w-full max-w-md space-y-8 px-4">
					<div className="text-center lg:text-left">
						<h1 className="text-3xl font-semibold text-gray-900 mb-2">
							Log in to Exclusive
						</h1>
						<p className="text-gray-600">Enter your details below</p>
					</div>
					<form onSubmit={handleSubmit} className="space-y-6">
						{errors.general && (
							<div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
								{errors.general}
							</div>
						)}
						{/* Email */}
						<div className="space-y-1">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="text"
								value={formData.email}
								onChange={(e) => handleInputChange("email", e.target.value)}
								className={`border-0 border-b-2 rounded-none px-0 py-3 pl-4 focus:ring-0 ${
									errors.email
										? "border-red-500"
										: "border-gray-300 focus:border-black"
								}`}
								disabled={isLoading}
							/>
							{errors.email && (
								<p className="text-red-500 text-sm mt-1">{errors.email}</p>
							)}
						</div>
						{/* Password */}
						<div className="space-y-1">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								value={formData.password}
								onChange={(e) => handleInputChange("password", e.target.value)}
								className={`border-0 border-b-2 rounded-none px-0 py-3 focus:ring-0 ${
									errors.password
										? "border-red-500"
										: "border-gray-300 focus:border-black"
								}`}
								disabled={isLoading}
							/>
							{errors.password && (
								<p className="text-red-500 text-sm mt-1">{errors.password}</p>
							)}
						</div>

						<Button
							type="submit"
							className="bg-black text-white hover:bg-gray-800 px-8 py-2 rounded-md"
							disabled={isLoading}
						>
							{isLoading ? "Logging in..." : "Log In"}
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}
