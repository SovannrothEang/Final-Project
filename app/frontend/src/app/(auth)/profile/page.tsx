"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
	const [formData, setFormData] = useState({
		firstName: "Md",
		lastName: "Rimel",
		email: "rimel@gmail.com",
		address: "Kingston, 5236, United States",
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSaveChanges = () => {
		// Handle save logic here
		console.log("Saving changes:", formData);
	};

	const handleCancel = () => {
		// Reset form or navigate away
		setFormData({
			firstName: "Md",
			lastName: "Rimel",
			email: "rimel@gmail.com",
			address: "Kingston, 5236, United States",
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		});
	};

	return (
		<div className="bg-white">
			<div className="container mx-auto px-4 py-8">
				{/* Breadcrumb */}
				<div className="text-sm text-gray-500 mb-8">
					<span>Home</span> <span className="mx-2">/</span>{" "}
					<span>My Account</span>
				</div>

				{/* Welcome Message */}
				<div className="text-right mb-8">
					<span className="text-sm">Welcome </span>
					<span className="text-red-500 font-medium">Md Rimel</span>
				</div>

				<div className="grid lg:grid-cols-4 gap-8">
					{/* Sidebar */}
					<div className="lg:col-span-1">
						<div className="space-y-6">
							{/* Manage My Account */}
							<div>
								<h3 className="font-medium mb-3">Manage My Account</h3>
								<div className="space-y-2 ml-4">
									<div className="text-red-500 text-sm cursor-pointer">
										My Profile
									</div>
									<div className="text-gray-600 text-sm cursor-pointer hover:text-red-500">
										Address Book
									</div>
									<div className="text-gray-600 text-sm cursor-pointer hover:text-red-500">
										My Payment Options
									</div>
								</div>
							</div>

							{/* My Orders */}
							<div>
								<h3 className="font-medium mb-3">My Orders</h3>
								<div className="space-y-2 ml-4">
									<div className="text-gray-600 text-sm cursor-pointer hover:text-red-500">
										My Returns
									</div>
									<div className="text-gray-600 text-sm cursor-pointer hover:text-red-500">
										My Cancellations
									</div>
								</div>
							</div>

							{/* My Wishlist */}
							<div>
								<h3 className="font-medium mb-3 cursor-pointer hover:text-red-500">
									My Wishlist
								</h3>
							</div>
						</div>
					</div>

					{/* Main Content */}
					<div className="lg:col-span-3">
						<Card>
							<CardHeader>
								<CardTitle className="text-red-500">
									Edit Your Profile
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								{/* Name Fields */}
								<div className="grid md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<Label htmlFor="firstName">First Name</Label>
										<Input
											id="firstName"
											value={formData.firstName}
											onChange={(e) =>
												handleInputChange("firstName", e.target.value)
											}
											className="bg-gray-50"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="lastName">Last Name</Label>
										<Input
											id="lastName"
											value={formData.lastName}
											onChange={(e) =>
												handleInputChange("lastName", e.target.value)
											}
											className="bg-gray-50"
										/>
									</div>
								</div>

								{/* Email and Address */}
								<div className="grid md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<Label htmlFor="email">Email</Label>
										<Input
											id="email"
											type="email"
											value={formData.email}
											onChange={(e) =>
												handleInputChange("email", e.target.value)
											}
											className="bg-gray-50"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="address">Address</Label>
										<Input
											id="address"
											value={formData.address}
											onChange={(e) =>
												handleInputChange("address", e.target.value)
											}
											className="bg-gray-50"
										/>
									</div>
								</div>

								{/* Password Changes */}
								<div className="space-y-4">
									<h4 className="font-medium">Password Changes</h4>

									<div className="space-y-2">
										<Input
											type="password"
											placeholder="Current Password"
											value={formData.currentPassword}
											onChange={(e) =>
												handleInputChange("currentPassword", e.target.value)
											}
											className="bg-gray-50"
										/>
									</div>

									<div className="space-y-2">
										<Input
											type="password"
											placeholder="New Password"
											value={formData.newPassword}
											onChange={(e) =>
												handleInputChange("newPassword", e.target.value)
											}
											className="bg-gray-50"
										/>
									</div>

									<div className="space-y-2">
										<Input
											type="password"
											placeholder="Confirm New Password"
											value={formData.confirmPassword}
											onChange={(e) =>
												handleInputChange("confirmPassword", e.target.value)
											}
											className="bg-gray-50"
										/>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex justify-end gap-4 pt-6">
									<Button variant="outline" onClick={handleCancel}>
										Cancel
									</Button>
									<Button
										className="bg-red-500 hover:bg-red-600"
										onClick={handleSaveChanges}
									>
										Save Changes
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
