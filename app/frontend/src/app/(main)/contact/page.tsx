// "use client";

// import type React from "react";

// import { useState } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Phone, Mail } from "lucide-react";

// export default function ContactPage() {
// 	const [formData, setFormData] = useState({
// 		name: "",
// 		email: "",
// 		phone: "",
// 		message: "",
// 	});
// 	const [errors, setErrors] = useState<{ [key: string]: string }>({});
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [isSubmitted, setIsSubmitted] = useState(false);

// 	const handleInputChange = (field: string, value: string) => {
// 		setFormData((prev) => ({ ...prev, [field]: value }));
// 		// Clear error when user starts typing
// 		if (errors[field]) {
// 			setErrors((prev) => ({ ...prev, [field]: "" }));
// 		}
// 	};

// 	const validateForm = () => {
// 		const newErrors: { [key: string]: string } = {};

// 		if (!formData.name.trim()) {
// 			newErrors.name = "Name is required";
// 		}

// 		if (!formData.email.trim()) {
// 			newErrors.email = "Email is required";
// 		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
// 			newErrors.email = "Please enter a valid email address";
// 		}

// 		if (!formData.phone.trim()) {
// 			newErrors.phone = "Phone number is required";
// 		}

// 		if (!formData.message.trim()) {
// 			newErrors.message = "Message is required";
// 		} else if (formData.message.trim().length < 10) {
// 			newErrors.message = "Message must be at least 10 characters long";
// 		}

// 		setErrors(newErrors);
// 		return Object.keys(newErrors).length === 0;
// 	};

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();

// 		if (!validateForm()) return;

// 		setIsLoading(true);

// 		try {
// 			// Simulate API call
// 			await new Promise((resolve) => setTimeout(resolve, 1000));

// 			// Handle successful submission
// 			console.log("Message sent:", formData);
// 			setIsSubmitted(true);

// 			// Reset form
// 			setFormData({
// 				name: "",
// 				email: "",
// 				phone: "",
// 				message: "",
// 			});
// 		} catch (error) {
// 			console.error("Failed to send message:", error);
// 			setErrors({ general: "Failed to send message. Please try again." });
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	if (isSubmitted) {
// 		return (
// 			<div className="bg-white">
// 				<div className="container mx-auto px-4 py-8">
// 					{/* Breadcrumb */}
// 					<div className="text-sm text-gray-500 mb-8 ">
// 						<Link href="/" className="hover:text-gray-800">
// 							Home
// 						</Link>
// 						<span className="mx-2">/</span>
// 						<span>Contact</span>
// 					</div>

// 					<div className="text-center py-16">
// 						<div className="max-w-md mx-auto">
// 							<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
// 								<Mail className="w-8 h-8 text-green-600" />
// 							</div>
// 							<h2 className="text-2xl font-semibold mb-4">
// 								Message Sent Successfully!
// 							</h2>
// 							<p className="text-gray-600 mb-8">
// 								Thank you for contacting us. We will get back to you within 24
// 								hours.
// 							</p>
// 							<Button
// 								onClick={() => setIsSubmitted(false)}
// 								className="bg-red-500 hover:bg-red-600"
// 							>
// 								Send Another Message
// 							</Button>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className="bg-white w-screen">
//     		<div className="max-w-7xl mx-auto px-4 pt-10">
//     		    {/* Breadcrumb */}
//     		    <div className="text-sm text-gray-500 mb-8">
//     		        <Link href="/" className="hover:text-gray-800">
//     		            Home
//     		        </Link>
//     		        <span className="mx-2">/</span>
//     		        <span>Contact</span>
//     		    </div>

//     		    <div className="grid lg:grid-cols-3 gap-8">
//     		        {/* Contact Information */}
//     		        <div className="lg:col-span-1 space-y-8">
//     		            {/* Call To Us */}
//     		            <div className="w-full flex flex-col justify-center pl-5 rounded-lg shadow-sm border py-6">
//     		                <div className="flex items-center gap-3 mb-4">
//     		                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
//     		                        <Phone className="w-5 h-5 text-white" />
//     		                    </div>
//     		                    <h3 className="text-lg font-semibold">Call To Us</h3>
//     		                </div>
//     		                <p className="text-gray-600 mb-4">
//     		                    We are available 24/7, 7 days a week.
//     		                </p>
//     		                <p className="text-gray-800 font-medium">Phone: 085 123 456</p>
//     		                <p className="text-gray-800 font-medium">Phone: 086 333 322</p>
//     		                <p className="text-gray-800 font-medium">Phone: 098 998 876</p>
//     		            </div>

// 						{/* Write To Us */}
//                 		<div className="w-full flex flex-col justify-center pl-5 rounded-lg shadow-sm border py-6 bg-white">
//                 		    <div className="flex items-center gap-3 mb-4">
//                 		        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
//                 		            <Mail className="w-5 h-5 text-white" />
//                 		        </div>
//                 		        <h3 className="text-lg font-semibold">Write To Us</h3>
//                 		    </div>
//                 		    <p className="text-gray-600 mb-4">
//                 		        Fill out our form and we will contact you within 24 hours.
//                 		    </p>
//                 		    <div className="space-y-2">
//                 		        <p className="text-gray-800">Emails: customer@exclusive.com</p>
//                 		        <p className="text-gray-800">Emails: support@exclusive.com</p>
//                 		    </div>
//                 		</div>
//             		</div>

// 					{/* Contact Form */}
// 					<div className="lg:col-span-2">
// 					    <div className="bg-white w-full max-w-3xl mx-auto flex flex-col justify-center items-center rounded-lg shadow-sm border py-8 px-4 sm:h-[477px]">
//         					<form onSubmit={handleSubmit} className="space-y-6 w-full flex flex-col h-full">
//         					    {errors.general && (
//         					        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
//         					            {errors.general}
//         					        </div>
//         					    )}

//         					    {/* Name, Email, Phone Row */}
//         					    <div className="grid md:grid-cols-3 gap-4">
//         					        <div className="space-y-1">
//         					            <Label htmlFor="name" className="sr-only">
//         					                Your Name
//         					            </Label>
//         					            <Input
//         					                id="name"
//         					                placeholder="Your Name *"
//         					                value={formData.name}
//         					                onChange={(e) =>
//         					                    handleInputChange("name", e.target.value)
//         					                }
//         					                className={`bg-gray-100 ${errors.name ? "border-red-500" : ""}`}
//         					                disabled={isLoading}
//         					            />
//         					            {errors.name && (
//         					                <p className="text-red-500 text-sm">{errors.name}</p>
//         					            )}
//         					        </div>
									
//         					        <div className="space-y-1">
//         					            <Label htmlFor="email" className="sr-only">
//         					                Your Email
//         					            </Label>
//         					            <Input
//         					                id="email"
//         					                type="email"
//         					                placeholder="Your Email *"
//         					                value={formData.email}
//         					                onChange={(e) =>
//         					                    handleInputChange("email", e.target.value)
//         					                }
//         					                className={`bg-gray-100 ${errors.email ? "border-red-500" : ""}`}
//         					                disabled={isLoading}
//         					            />
//         					            {errors.email && (
//         					                <p className="text-red-500 text-sm">{errors.email}</p>
//         					            )}
//         					        </div>
									
//         					        <div className="space-y-1">
//         					            <Label htmlFor="phone" className="sr-only">
//         					                Your Phone
//         					            </Label>
//         					            <Input
//         					                id="phone"
//         					                type="tel"
//         					                placeholder="Your Phone *"
//         					                value={formData.phone}
//         					                onChange={(e) =>
//         					                    handleInputChange("phone", e.target.value)
//         					                }
//         					                className={`bg-gray-100 ${errors.phone ? "border-red-500" : ""}`}
//         					                disabled={isLoading}
//         					            />
//         					            {errors.phone && (
//         					                <p className="text-red-500 text-sm">{errors.phone}</p>
//         					            )}
//         					        </div>
//         					    </div>
									
//         					    {/* Message */}
//         					    <div className="flex-1 flex flex-col">
//         					        <Label htmlFor="message" className="sr-only">
//         					            Your Message
//         					        </Label>
//         					        <Textarea
//         					            id="message"
//         					            placeholder="Your Message"
//         					            rows={8}
//         					            value={formData.message}
//         					            onChange={(e) =>
//         					                handleInputChange("message", e.target.value)
//         					            }
//         					            className={`bg-gray-100 w-full min-h-[150px] sm:min-h-[220px] flex-1 resize-none ${
//         					                errors.message ? "border-red-500" : ""
//         					            }`}
//         					            disabled={isLoading}
//         					        />
//         					        {errors.message && (
//         					            <p className="text-red-500 text-sm">{errors.message}</p>
//         					        )}
//         					    </div>
								
//         					    {/* Submit Button */}
//         					    <div className="flex justify-end">
//         					        <Button
//         					            type="submit"
//         					            className="bg-red-500 hover:bg-red-600 px-8 py-3"
//         					            disabled={isLoading}
//         					        >
//         					            {isLoading ? "Sending..." : "Send Message"}
//         					        </Button>
//         					    </div>
//         					</form>
// 					    </div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }





"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, Facebook, Instagram, Send } from "lucide-react";

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};
		if (!formData.name.trim()) newErrors.name = "Name is required";
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Please enter a valid email";
		}
		if (!formData.phone.trim()) newErrors.phone = "Phone is required";
		if (!formData.message.trim()) {
			newErrors.message = "Message is required";
		} else if (formData.message.length < 10) {
			newErrors.message = "Message must be at least 10 characters";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;
		setIsLoading(true);
		try {
			await new Promise((r) => setTimeout(r, 1000));
			console.log("Message sent:", formData);
			setIsSubmitted(true);
			setFormData({ name: "", email: "", phone: "", message: "" });
		} catch (error) {
			console.error("Error:", error);
			setErrors({ general: "Failed to send message. Try again." });
		} finally {
			setIsLoading(false);
		}
	};

	if (isSubmitted) {
		return (
			<div className="bg-white">
				<div className="container mx-auto px-4 py-16 text-center">
					<div className="max-w-md mx-auto">
						<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<Mail className="w-8 h-8 text-green-600" />
						</div>
						<h2 className="text-2xl font-semibold mb-4">Message Sent!</h2>
						<p className="text-gray-600 mb-8">
							Thanks for reaching out! We'll contact you within 24 hours.
						</p>
						<Button
							onClick={() => setIsSubmitted(false)}
							className="bg-red-500 hover:bg-red-600"
						>
							Send Another Message
						</Button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white w-full">
			<div className="max-w-7xl mx-auto px-4 pt-10">
				{/* Breadcrumb */}
				<div className="text-sm text-gray-500 mb-8">
					<Link href="/" className="hover:text-gray-800">Home</Link>
					<span className="mx-2">/</span>
					<span>Contact</span>
				</div>

				<div className="grid lg:grid-cols-3 gap-8">
					{/* Contact Info */}
					<div className="space-y-8 lg:col-span-1">
						{/* Call To Us */}
						<div className="border p-6 rounded-lg shadow-sm">
							<div className="flex items-center gap-3 mb-4">
								<div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
									<Phone className="w-5 h-5 text-white" />
								</div>
								<h3 className="text-lg font-semibold">Call To Us</h3>
							</div>
							<p className="text-gray-600 mb-2">Available 24/7</p>
							<p className="text-gray-800 font-medium">085 123 456</p>
							<p className="text-gray-800 font-medium">086 333 322</p>
						</div>

						{/* Write To Us */}
						<div className="border p-6 rounded-lg shadow-sm">
							<div className="flex items-center gap-3 mb-4">
								<div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
									<Mail className="w-5 h-5 text-white" />
								</div>
								<h3 className="text-lg font-semibold">Write To Us</h3>
							</div>
							<p className="text-gray-600 mb-2">
								We reply within 24 hours.
							</p>
							<p className="text-gray-800">customer@exclusive.com</p>
							<p className="text-gray-800">support@exclusive.com</p>
						</div>

						{/* Social Media */}
						<div className="border p-6 rounded-lg shadow-sm">
							<h3 className="text-lg font-semibold mb-4">Follow Us</h3>
							<div className="flex gap-4 text-red-500">
								<Link href="https://facebook.com" target="_blank"><Facebook /></Link>
								<Link href="https://instagram.com" target="_blank"><Instagram /></Link>
								<Link href="https://t.me" target="_blank"><Send /></Link>
							</div>
						</div>
					</div>

					{/* Contact Form */}
					<div className="lg:col-span-2">
						<div className="border p-6 rounded-lg shadow-sm bg-white">
							<form onSubmit={handleSubmit} className="space-y-6">
								{errors.general && (
									<div className="bg-red-100 text-red-600 px-4 py-2 rounded-md text-sm">
										{errors.general}
									</div>
								)}

								<div className="grid md:grid-cols-3 gap-4">
									<Input
										id="name"
										placeholder="Your Name *"
										value={formData.name}
										onChange={(e) => handleInputChange("name", e.target.value)}
										className={`bg-gray-100 ${errors.name ? "border-red-500" : ""}`}
										disabled={isLoading}
									/>
									<Input
										id="email"
										type="email"
										placeholder="Your Email *"
										value={formData.email}
										onChange={(e) => handleInputChange("email", e.target.value)}
										className={`bg-gray-100 ${errors.email ? "border-red-500" : ""}`}
										disabled={isLoading}
									/>
									<Input
										id="phone"
										type="tel"
										placeholder="Your Phone *"
										value={formData.phone}
										onChange={(e) => handleInputChange("phone", e.target.value)}
										className={`bg-gray-100 ${errors.phone ? "border-red-500" : ""}`}
										disabled={isLoading}
									/>
								</div>
								{errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
								{errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
								{errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

								<Textarea
									id="message"
									rows={6}
									placeholder="Your Message"
									value={formData.message}
									onChange={(e) => handleInputChange("message", e.target.value)}
									className={`bg-gray-100 resize-none ${errors.message ? "border-red-500" : ""}`}
									disabled={isLoading}
								/>
								{errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}

								<div className="flex justify-end">
									<Button
										type="submit"
										className="bg-red-500 hover:bg-red-600 px-8 py-3"
										disabled={isLoading}
									>
										{isLoading ? "Sending..." : "Send Message"}
									</Button>
								</div>
							</form>

							{/* Quote */}
							<div className="mt-10 text-center text-gray-600 italic">
								"Communication is the bridge between confusion and clarity."
							</div>
						</div>

						{/* Google Map */}
						<div className="mt-8">
							<iframe
								title="Google Map"
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15636.482322730277!2d104.9110305!3d11.5563736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109514e2d007b9f%3A0x35a05845ec6cdd7d!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh"
								width="100%"
								height="300"
								style={{ border: 0 }}
								allowFullScreen={true}
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								className="rounded-lg border"
							></iframe>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
