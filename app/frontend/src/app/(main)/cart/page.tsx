"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuantitySelector } from "@/components/products/QuantitySelector";
import { Trash2 } from "lucide-react";

// Sample cart data
const initialCartItems = [
	{
		id: "1",
		name: "LCD Monitor",
		price: 650,
		quantity: 1,
		image: "/placeholder.svg?height=80&width=80",
	},
	{
		id: "2",
		name: "H1 Gamepad",
		price: 550,
		quantity: 2,
		image: "/placeholder.svg?height=80&width=80",
	},
];

export default function CartPage() {
	const [cartItems, setCartItems] = useState(initialCartItems);
	const [couponCode, setCouponCode] = useState("");

	const updateQuantity = (id: string, quantity: number) => {
		setCartItems(
			cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
		);
	};

	const removeItem = (id: string) => {
		setCartItems(cartItems.filter((item) => item.id !== id));
	};

	const calculateSubtotal = (price: number, quantity: number) => {
		return price * quantity;
	};

	const calculateTotal = () => {
		return cartItems.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
	};

	const handleApplyCoupon = () => {
		// Implement coupon logic here
		alert(`Applying coupon: ${couponCode}`);
	};

	return (
		<div className="bg-white">
			<div className="container mx-auto px-4 py-8">
				{/* Breadcrumb */}
				<div className="text-sm text-gray-500 mb-8">
					<Link href="/" className="hover:text-gray-800">
						Home
					</Link>
					<span className="mx-2">/</span>
					<span>Cart</span>
				</div>

				{cartItems.length === 0 ? (
					<div className="text-center py-16">
						<h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
						<p className="text-gray-500 mb-8">
							Looks like you haven't added anything to your cart yet.
						</p>
						<Button asChild className="bg-red-500 hover:bg-red-600">
							<Link href="/">Continue Shopping</Link>
						</Button>
					</div>
				) : (
					<div className="grid lg:grid-cols-3 gap-8">
						{/* Cart Items */}
						<div className="lg:col-span-2">
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead>
										<tr className="border-b">
											<th className="text-left py-4 font-medium">Product</th>
											<th className="text-left py-4 font-medium">Price</th>
											<th className="text-left py-4 font-medium">Quantity</th>
											<th className="text-left py-4 font-medium">Subtotal</th>
											<th className="py-4 font-medium"></th>
										</tr>
									</thead>
									<tbody>
										{cartItems.map((item) => (
											<tr key={item.id} className="border-b">
												<td className="py-4">
													<div className="flex items-center gap-4">
														<Image
															src={item.image || "/placeholder.svg"}
															alt={item.name}
															width={80}
															height={80}
															className="rounded-md"
														/>
														<span>{item.name}</span>
													</div>
												</td>
												<td className="py-4">${item.price}</td>
												<td className="py-4">
													<QuantitySelector
														initialValue={item.quantity}
														onChange={(value) => updateQuantity(item.id, value)}
													/>
												</td>
												<td className="py-4">
													${calculateSubtotal(item.price, item.quantity)}
												</td>
												<td className="py-4">
													<Button
														variant="ghost"
														size="icon"
														onClick={() => removeItem(item.id)}
														className="text-red-500 hover:text-red-700"
													>
														<Trash2 className="h-5 w-5" />
														<span className="sr-only">Remove item</span>
													</Button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							<div className="flex justify-between mt-8">
								<Button variant="outline" asChild>
									<Link href="/">Return To Shop</Link>
								</Button>
								<Button>Update Cart</Button>
							</div>
						</div>

						{/* Cart Summary */}
						<div className="lg:col-span-1">
							<div className="space-y-6">
								{/* Coupon */}
								<div className="flex gap-2">
									<Input
										placeholder="Coupon Code"
										value={couponCode}
										onChange={(e) => setCouponCode(e.target.value)}
									/>
									<Button
										className="bg-red-500 hover:bg-red-600 whitespace-nowrap"
										onClick={handleApplyCoupon}
									>
										Apply Coupon
									</Button>
								</div>

								{/* Cart Totals */}
								<div className="border rounded-md p-6">
									<h3 className="text-lg font-semibold mb-4">Cart Total</h3>
									<div className="space-y-3">
										<div className="flex justify-between py-2 border-b">
											<span>Subtotal:</span>
											<span>${calculateTotal()}</span>
										</div>
										<div className="flex justify-between py-2 border-b">
											<span>Shipping:</span>
											<span>Free</span>
										</div>
										<div className="flex justify-between py-2 font-semibold">
											<span>Total:</span>
											<span>${calculateTotal()}</span>
										</div>
									</div>
									<Button className="w-full mt-6 bg-red-500 hover:bg-red-600">
										Proceed to checkout
									</Button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
