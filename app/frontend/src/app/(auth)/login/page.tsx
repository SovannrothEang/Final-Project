"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};

		if (!formData.email) {
			newErrors.email = "Email or phone number is required";
		} else if (
			formData.email.includes("@") &&
			!/\S+@\S+\.\S+/.test(formData.email)
		) {
			newErrors.email = "Please enter a valid email address";
		}

		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsLoading(true);

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Handle successful login here
			console.log("Login successful:", formData);

			// Redirect to dashboard or home page
			// router.push('/profile')
		} catch (error) {
			console.error("Login failed:", error);
			setErrors({ general: "Login failed. Please check your credentials." });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-white">
			<div className="container mx-auto px-4 py-16">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					{/* Left Side - Illustration */}
					<div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-8 flex items-center justify-center min-h-[500px]">
						<div className="relative">
							{/* Shopping Cart */}
							<div className="relative">
								<div className="w-32 h-24 border-4 border-gray-600 rounded-t-lg bg-white relative">
									<div className="absolute -bottom-2 left-4 w-6 h-6 bg-gray-600 rounded-full"></div>
									<div className="absolute -bottom-2 right-4 w-6 h-6 bg-gray-600 rounded-full"></div>
									<div className="absolute top-2 left-2 right-2 bottom-2 border-2 border-gray-400 rounded"></div>
								</div>

								{/* Shopping Bags */}
								<div className="absolute -top-8 -right-8">
									<div className="w-16 h-20 bg-pink-300 rounded-lg relative">
										<div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-pink-400 rounded-full"></div>
									</div>
								</div>

								<div className="absolute -top-4 -left-4">
									<div className="w-12 h-16 bg-blue-300 rounded-lg relative">
										<div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-blue-400 rounded-full"></div>
									</div>
								</div>
							</div>

							{/* Phone */}
							<div className="absolute -right-16 -top-8">
								<div className="w-24 h-48 bg-white rounded-2xl border-4 border-gray-300 relative">
									<div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-400 rounded-full"></div>
									<div className="absolute top-8 left-2 right-2 bottom-8 bg-gray-800 rounded-lg"></div>
									<div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 border-2 border-gray-400 rounded-full"></div>
								</div>
							</div>
						</div>
					</div>

					{/* Right Side - Login Form */}
					<div className="max-w-md lg:w-1/2 flex items-center justify-center p-8">
						<div className="w-full max-w-md space-y-8">
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

								<div className="space-y-1">
									<Label htmlFor="email" className="sr-only">
										Email or Phone Number
									</Label>
									<Input
										id="email"
										type="text"
										placeholder="Email or Phone Number"
										value={formData.email}
										onChange={(e) => handleInputChange("email", e.target.value)}
										className={`border-0 border-b-2 rounded-none px-0 py-3 focus:ring-0 ${
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

								<div className="space-y-1">
									<Label htmlFor="password" className="sr-only">
										Password
									</Label>
									<Input
										id="password"
										type="password"
										placeholder="Password"
										value={formData.password}
										onChange={(e) =>
											handleInputChange("password", e.target.value)
										}
										className={`border-0 border-b-2 rounded-none px-0 py-3 focus:ring-0 ${
											errors.password
												? "border-red-500"
												: "border-gray-300 focus:border-black"
										}`}
										disabled={isLoading}
									/>
									{errors.password && (
										<p className="text-red-500 text-sm mt-1">
											{errors.password}
										</p>
									)}
								</div>

								<div className="flex items-center justify-between">
									<Button
										type="submit"
										className="bg-black text-white hover:bg-gray-800 px-8 py-2 rounded-md"
										disabled={isLoading}
									>
										{isLoading ? "Logging in..." : "Log In"}
									</Button>

									<Link
										href="/forgot-password"
										className="text-blue-600 hover:text-blue-800 text-sm font-medium"
									>
										Forgot Password?
									</Link>
								</div>
							</form>

							<div className="text-center text-sm text-gray-600">
								Don't have an account?{" "}
								<Link href="/signup" className="underline hover:text-gray-800">
									Sign Up
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
