"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
	Store,
	Mail,
	CreditCard,
	Truck,
	Shield,
	Bell,
	Save,
	Trash2,
	Plus,
} from "lucide-react";

export default function AdminSettingsPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [activeTab, setActiveTab] = useState("general");

	// General Settings State
	const [generalSettings, setGeneralSettings] = useState({
		storeName: "Exclusive",
		storeDescription: "South Asia's premier online shopping marketplace",
		storeEmail: "admin@exclusive.com",
		storePhone: "+8801611112222",
		storeAddress: "111 Bijoy sarani, Dhaka, DH 1515, Bangladesh",
		currency: "USD",
		timezone: "Asia/Dhaka",
		language: "English",
		maintenanceMode: false,
		storeEmails: ["admin@gmail.com"],
	});

	// Email Settings State
	const [emailSettings, setEmailSettings] = useState({
		smtpHost: "smtp.gmail.com",
		smtpPort: "587",
		smtpUsername: "admin@exclusive.com",
		smtpPassword: "",
		fromEmail: "noreply@exclusive.com",
		fromName: "Exclusive Store",
		orderConfirmation: true,
		shipmentNotification: true,
		promotionalEmails: true,
	});

	// Payment Settings State
	const [paymentSettings, setPaymentSettings] = useState({
		stripeEnabled: true,
		stripePublishableKey: "pk_test_...",
		stripeSecretKey: "",
		paypalEnabled: true,
		paypalClientId: "",
		paypalClientSecret: "",
		codEnabled: true,
		bankTransferEnabled: false,
	});

	// Shipping Settings State
	const [shippingSettings, setShippingSettings] = useState({
		freeShippingThreshold: 140,
		standardShippingRate: 10,
		expressShippingRate: 25,
		internationalShipping: true,
		processingTime: "1-2 business days",
		shippingZones: ["Local", "National", "International"],
	});

	// Security Settings State
	const [securitySettings, setSecuritySettings] = useState({
		twoFactorAuth: false,
		sessionTimeout: 30,
		passwordExpiry: 90,
		loginAttempts: 5,
		ipWhitelist: "",
		sslEnabled: true,
		dataEncryption: true,
	});

	// Notification Settings State
	const [notificationSettings, setNotificationSettings] = useState({
		newOrderNotifications: true,
		lowStockAlerts: true,
		customerRegistration: true,
		systemUpdates: true,
		securityAlerts: true,
		emailNotifications: true,
		smsNotifications: false,
		pushNotifications: true,
	});

	const handleSaveSettings = async (settingsType: string) => {
		setIsLoading(true);
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			console.log(`Saving ${settingsType} settings`);
			// Show success message
		} catch (error) {
			console.error("Failed to save settings:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const addEmail = () => {
		setGeneralSettings((prev) => ({
		...prev,
		storeEmails: [...prev.storeEmails, ''],
		}));
	};

	// Function to remove an email field
	const removeEmail = (index: number) => {
		setGeneralSettings((prev) => ({
		...prev,
		storeEmails: prev.storeEmails.filter((_, i) => i !== index),
		}));
	};

	// Function to update an email at a specific index
	const updateEmail = (index: number, value: string) => {
		setGeneralSettings((prev) => ({
		...prev,
		storeEmails: prev.storeEmails.map((email, i) => (i === index ? value : email)),
		}));
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-bold text-gray-900">Settings</h1>
				<p className="text-gray-600">
					Manage your store configuration and preferences
				</p>
			</div>

			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
				className="space-y-6"
			>
				<TabsList className="grid w-full grid-cols-6">
					<TabsTrigger value="general" className="flex items-center gap-2">
						<Store className="w-4 h-4" />
						General
					</TabsTrigger>
					<TabsTrigger value="email" className="flex items-center gap-2">
						<Mail className="w-4 h-4" />
						Contact
					</TabsTrigger>
					<TabsTrigger value="message" className="flex items-center gap-2">
						<Mail className="w-4 h-4" />
						Message
					</TabsTrigger>
					{/* <TabsTrigger value="email" className="flex items-center gap-2">
						<Mail className="w-4 h-4" />
						Email
					</TabsTrigger> */}
					{/* <TabsTrigger value="payment" className="flex items-center gap-2">
						<CreditCard className="w-4 h-4" />
						Payment
					</TabsTrigger> */}
					{/* <TabsTrigger value="shipping" className="flex items-center gap-2">
						<Truck className="w-4 h-4" />
						Shipping
					</TabsTrigger> */}
					{/* <TabsTrigger value="security" className="flex items-center gap-2">
						<Shield className="w-4 h-4" />
						Security
					</TabsTrigger> */}
					{/* <TabsTrigger
						value="notifications"
						className="flex items-center gap-2"
					>
						<Bell className="w-4 h-4" />
						Notifications
					</TabsTrigger> */}
				</TabsList>

				{/* General Settings */}
				<TabsContent value="general" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Store className="w-5 h-5" />
								Store Information
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="storeName">Store Name</Label>
									<Input
										id="storeName"
										value={generalSettings.storeName}
										onChange={(e) =>
											setGeneralSettings((prev) => ({
												...prev,
												storeName: e.target.value,
											}))
										}
									/>
								</div>
								{/* <div className="space-y-2">
									<Label htmlFor="storeEmail">Store Email</Label>
									<Input
										id="storeEmail"
										type="email"
										value={generalSettings.storeEmail}
										onChange={(e) =>
											setGeneralSettings((prev) => ({
												...prev,
												storeEmail: e.target.value,
											}))
										}
									/>
								</div> */}
								<div className="space-y-2">
								<Label>Store Emails</Label>
								{(generalSettings.storeEmails || []).map((email, index) => (
									<div key={index} className="flex items-center gap-2">
									<Input
										id={`storeEmail-${index}`}
										type="email"
										value={email}
										onChange={(e) => updateEmail(index, e.target.value)}
										placeholder={`Email ${index + 1}`}
									/>
									{generalSettings.storeEmails.length > 1 && (
										<Button
										variant="destructive"
										size="icon"
										onClick={() => removeEmail(index)}
										>
										<Trash2 className="w-4 h-4" />
										</Button>
									)}
									</div>
								))}
								<Button
									variant="outline"
									size="sm"
									onClick={addEmail}
									className="mt-2"
								>
									<Plus className="w-4 h-4 mr-2" />
									Add Email
								</Button>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="storeDescription">Store Description</Label>
								<Textarea
									id="storeDescription"
									value={generalSettings.storeDescription}
									onChange={(e) =>
										setGeneralSettings((prev) => ({
											...prev,
											storeDescription: e.target.value,
										}))
									}
									rows={3}
								/>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="storePhone">Phone Number</Label>
									<Input
										id="storePhone"
										value={generalSettings.storePhone}
										onChange={(e) =>
											setGeneralSettings((prev) => ({
												...prev,
												storePhone: e.target.value,
											}))
										}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="currency">Currency</Label>
									<Select
										value={generalSettings.currency}
										onValueChange={(value) =>
											setGeneralSettings((prev) => ({
												...prev,
												currency: value,
											}))
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="USD">USD - US Dollar</SelectItem>
											<SelectItem value="EUR">EUR - Euro</SelectItem>
											<SelectItem value="BDT">
												BDT - Bangladeshi Taka
											</SelectItem>
											<SelectItem value="GBP">GBP - British Pound</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="storeAddress">Store Address</Label>
								<Textarea
									id="storeAddress"
									value={generalSettings.storeAddress}
									onChange={(e) =>
										setGeneralSettings((prev) => ({
											...prev,
											storeAddress: e.target.value,
										}))
									}
									rows={2}
								/>
							</div>

							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<Label>Maintenance Mode</Label>
									<p className="text-sm text-gray-500">
										Temporarily disable the store for maintenance
									</p>
								</div>
								<Switch
									checked={generalSettings.maintenanceMode}
									onCheckedChange={(checked) =>
										setGeneralSettings((prev) => ({
											...prev,
											maintenanceMode: checked,
										}))
									}
								/>
							</div>

							<Button
								onClick={() => handleSaveSettings("general")}
								disabled={isLoading}
							>
								<Save className="w-4 h-4 mr-2" />
								{isLoading ? "Saving..." : "Save Changes"}
							</Button>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Email Settings */}
				{/* <TabsContent value="email" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Mail className="w-5 h-5" />
								SMTP Configuration
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="smtpHost">SMTP Host</Label>
									<Input
										id="smtpHost"
										value={emailSettings.smtpHost}
										onChange={(e) =>
											setEmailSettings((prev) => ({
												...prev,
												smtpHost: e.target.value,
											}))
										}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="smtpPort">SMTP Port</Label>
									<Input
										id="smtpPort"
										value={emailSettings.smtpPort}
										onChange={(e) =>
											setEmailSettings((prev) => ({
												...prev,
												smtpPort: e.target.value,
											}))
										}
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="smtpUsername">SMTP Username</Label>
									<Input
										id="smtpUsername"
										value={emailSettings.smtpUsername}
										onChange={(e) =>
											setEmailSettings((prev) => ({
												...prev,
												smtpUsername: e.target.value,
											}))
										}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="smtpPassword">SMTP Password</Label>
									<Input
										id="smtpPassword"
										type="password"
										value={emailSettings.smtpPassword}
										onChange={(e) =>
											setEmailSettings((prev) => ({
												...prev,
												smtpPassword: e.target.value,
											}))
										}
									/>
								</div>
							</div>

							<Separator />

							<div className="space-y-4">
								<h4 className="font-medium">Email Notifications</h4>
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<Label>Order Confirmation Emails</Label>
										<Switch
											checked={emailSettings.orderConfirmation}
											onCheckedChange={(checked) =>
												setEmailSettings((prev) => ({
													...prev,
													orderConfirmation: checked,
												}))
											}
										/>
									</div>
									<div className="flex items-center justify-between">
										<Label>Shipment Notifications</Label>
										<Switch
											checked={emailSettings.shipmentNotification}
											onCheckedChange={(checked) =>
												setEmailSettings((prev) => ({
													...prev,
													shipmentNotification: checked,
												}))
											}
										/>
									</div>
									<div className="flex items-center justify-between">
										<Label>Promotional Emails</Label>
										<Switch
											checked={emailSettings.promotionalEmails}
											onCheckedChange={(checked) =>
												setEmailSettings((prev) => ({
													...prev,
													promotionalEmails: checked,
												}))
											}
										/>
									</div>
								</div>
							</div>

							<Button
								onClick={() => handleSaveSettings("email")}
								disabled={isLoading}
							>
								<Save className="w-4 h-4 mr-2" />
								{isLoading ? "Saving..." : "Save Changes"}
							</Button>
						</CardContent>
					</Card>
				</TabsContent> */}

				{/* Payment Settings */}
				<TabsContent value="payment" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<CreditCard className="w-5 h-5" />
								Payment Methods
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							{/* Stripe */}
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-sm font-bold">
											S
										</div>
										<div>
											<h4 className="font-medium">Stripe</h4>
											<p className="text-sm text-gray-500">
												Accept credit cards and digital wallets
											</p>
										</div>
									</div>
									<Switch
										checked={paymentSettings.stripeEnabled}
										onCheckedChange={(checked) =>
											setPaymentSettings((prev) => ({
												...prev,
												stripeEnabled: checked,
											}))
										}
									/>
								</div>
								{paymentSettings.stripeEnabled && (
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-11">
										<div className="space-y-2">
											<Label>Publishable Key</Label>
											<Input
												value={paymentSettings.stripePublishableKey}
												readOnly
											/>
										</div>
										<div className="space-y-2">
											<Label>Secret Key</Label>
											<Input type="password" placeholder="sk_test_..." />
										</div>
									</div>
								)}
							</div>

							<Separator />

							{/* PayPal */}
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-sm font-bold">
											P
										</div>
										<div>
											<h4 className="font-medium">PayPal</h4>
											<p className="text-sm text-gray-500">
												Accept PayPal payments
											</p>
										</div>
									</div>
									<Switch
										checked={paymentSettings.paypalEnabled}
										onCheckedChange={(checked) =>
											setPaymentSettings((prev) => ({
												...prev,
												paypalEnabled: checked,
											}))
										}
									/>
								</div>
								{paymentSettings.paypalEnabled && (
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-11">
										<div className="space-y-2">
											<Label>Client ID</Label>
											<Input placeholder="PayPal Client ID" />
										</div>
										<div className="space-y-2">
											<Label>Client Secret</Label>
											<Input
												type="password"
												placeholder="PayPal Client Secret"
											/>
										</div>
									</div>
								)}
							</div>

							<Separator />

							{/* Cash on Delivery */}
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white text-sm font-bold">
										C
									</div>
									<div>
										<h4 className="font-medium">Cash on Delivery</h4>
										<p className="text-sm text-gray-500">
											Accept cash payments on delivery
										</p>
									</div>
								</div>
								<Switch
									checked={paymentSettings.codEnabled}
									onCheckedChange={(checked) =>
										setPaymentSettings((prev) => ({
											...prev,
											codEnabled: checked,
										}))
									}
								/>
							</div>

							<Button
								onClick={() => handleSaveSettings("payment")}
								disabled={isLoading}
							>
								<Save className="w-4 h-4 mr-2" />
								{isLoading ? "Saving..." : "Save Changes"}
							</Button>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Shipping Settings */}
				<TabsContent value="shipping" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Truck className="w-5 h-5" />
								Shipping Configuration
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div className="space-y-2">
									<Label htmlFor="freeShippingThreshold">
										Free Shipping Threshold ($)
									</Label>
									<Input
										id="freeShippingThreshold"
										type="number"
										value={shippingSettings.freeShippingThreshold}
										onChange={(e) =>
											setShippingSettings((prev) => ({
												...prev,
												freeShippingThreshold: Number(e.target.value),
											}))
										}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="standardShipping">
										Standard Shipping Rate ($)
									</Label>
									<Input
										id="standardShipping"
										type="number"
										value={shippingSettings.standardShippingRate}
										onChange={(e) =>
											setShippingSettings((prev) => ({
												...prev,
												standardShippingRate: Number(e.target.value),
											}))
										}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="expressShipping">
										Express Shipping Rate ($)
									</Label>
									<Input
										id="expressShipping"
										type="number"
										value={shippingSettings.expressShippingRate}
										onChange={(e) =>
											setShippingSettings((prev) => ({
												...prev,
												expressShippingRate: Number(e.target.value),
											}))
										}
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="processingTime">Processing Time</Label>
								<Input
									id="processingTime"
									value={shippingSettings.processingTime}
									onChange={(e) =>
										setShippingSettings((prev) => ({
											...prev,
											processingTime: e.target.value,
										}))
									}
								/>
							</div>

							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<Label>International Shipping</Label>
									<p className="text-sm text-gray-500">
										Allow shipping to international destinations
									</p>
								</div>
								<Switch
									checked={shippingSettings.internationalShipping}
									onCheckedChange={(checked) =>
										setShippingSettings((prev) => ({
											...prev,
											internationalShipping: checked,
										}))
									}
								/>
							</div>

							<div className="space-y-2">
								<Label>Shipping Zones</Label>
								<div className="flex gap-2 flex-wrap">
									{shippingSettings.shippingZones.map((zone, index) => (
										<Badge
											key={index}
											variant="secondary"
											className="flex items-center gap-1"
										>
											{zone}
											<Trash2 className="w-3 h-3 cursor-pointer" />
										</Badge>
									))}
								</div>
							</div>

							<Button
								onClick={() => handleSaveSettings("shipping")}
								disabled={isLoading}
							>
								<Save className="w-4 h-4 mr-2" />
								{isLoading ? "Saving..." : "Save Changes"}
							</Button>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Security Settings */}
				<TabsContent value="security" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Shield className="w-5 h-5" />
								Security Configuration
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div className="space-y-1">
											<Label>Two-Factor Authentication</Label>
											<p className="text-sm text-gray-500">
												Require 2FA for admin accounts
											</p>
										</div>
										<Switch
											checked={securitySettings.twoFactorAuth}
											onCheckedChange={(checked) =>
												setSecuritySettings((prev) => ({
													...prev,
													twoFactorAuth: checked,
												}))
											}
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="sessionTimeout">
											Session Timeout (minutes)
										</Label>
										<Input
											id="sessionTimeout"
											type="number"
											value={securitySettings.sessionTimeout}
											onChange={(e) =>
												setSecuritySettings((prev) => ({
													...prev,
													sessionTimeout: Number(e.target.value),
												}))
											}
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="loginAttempts">Max Login Attempts</Label>
										<Input
											id="loginAttempts"
											type="number"
											value={securitySettings.loginAttempts}
											onChange={(e) =>
												setSecuritySettings((prev) => ({
													...prev,
													loginAttempts: Number(e.target.value),
												}))
											}
										/>
									</div>
								</div>

								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div className="space-y-1">
											<Label>SSL Encryption</Label>
											<p className="text-sm text-gray-500">
												Force HTTPS connections
											</p>
										</div>
										<Switch
											checked={securitySettings.sslEnabled}
											onCheckedChange={(checked) =>
												setSecuritySettings((prev) => ({
													...prev,
													sslEnabled: checked,
												}))
											}
										/>
									</div>

									<div className="flex items-center justify-between">
										<div className="space-y-1">
											<Label>Data Encryption</Label>
											<p className="text-sm text-gray-500">
												Encrypt sensitive data
											</p>
										</div>
										<Switch
											checked={securitySettings.dataEncryption}
											onCheckedChange={(checked) =>
												setSecuritySettings((prev) => ({
													...prev,
													dataEncryption: checked,
												}))
											}
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="ipWhitelist">IP Whitelist</Label>
										<Textarea
											id="ipWhitelist"
											placeholder="Enter IP addresses (one per line)"
											value={securitySettings.ipWhitelist}
											onChange={(e) =>
												setSecuritySettings((prev) => ({
													...prev,
													ipWhitelist: e.target.value,
												}))
											}
											rows={3}
										/>
									</div>
								</div>
							</div>

							<Button
								onClick={() => handleSaveSettings("security")}
								disabled={isLoading}
							>
								<Save className="w-4 h-4 mr-2" />
								{isLoading ? "Saving..." : "Save Changes"}
							</Button>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Notification Settings */}
				<TabsContent value="notifications" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Bell className="w-5 h-5" />
								Notification Preferences
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-4">
									<h4 className="font-medium">Admin Notifications</h4>
									<div className="space-y-3">
										<div className="flex items-center justify-between">
											<Label>New Order Notifications</Label>
											<Switch
												checked={notificationSettings.newOrderNotifications}
												onCheckedChange={(checked) =>
													setNotificationSettings((prev) => ({
														...prev,
														newOrderNotifications: checked,
													}))
												}
											/>
										</div>
										<div className="flex items-center justify-between">
											<Label>Low Stock Alerts</Label>
											<Switch
												checked={notificationSettings.lowStockAlerts}
												onCheckedChange={(checked) =>
													setNotificationSettings((prev) => ({
														...prev,
														lowStockAlerts: checked,
													}))
												}
											/>
										</div>
										<div className="flex items-center justify-between">
											<Label>Customer Registration</Label>
											<Switch
												checked={notificationSettings.customerRegistration}
												onCheckedChange={(checked) =>
													setNotificationSettings((prev) => ({
														...prev,
														customerRegistration: checked,
													}))
												}
											/>
										</div>
										<div className="flex items-center justify-between">
											<Label>Security Alerts</Label>
											<Switch
												checked={notificationSettings.securityAlerts}
												onCheckedChange={(checked) =>
													setNotificationSettings((prev) => ({
														...prev,
														securityAlerts: checked,
													}))
												}
											/>
										</div>
									</div>
								</div>

								<div className="space-y-4">
									<h4 className="font-medium">Delivery Methods</h4>
									<div className="space-y-3">
										<div className="flex items-center justify-between">
											<Label>Email Notifications</Label>
											<Switch
												checked={notificationSettings.emailNotifications}
												onCheckedChange={(checked) =>
													setNotificationSettings((prev) => ({
														...prev,
														emailNotifications: checked,
													}))
												}
											/>
										</div>
										<div className="flex items-center justify-between">
											<Label>SMS Notifications</Label>
											<Switch
												checked={notificationSettings.smsNotifications}
												onCheckedChange={(checked) =>
													setNotificationSettings((prev) => ({
														...prev,
														smsNotifications: checked,
													}))
												}
											/>
										</div>
										<div className="flex items-center justify-between">
											<Label>Push Notifications</Label>
											<Switch
												checked={notificationSettings.pushNotifications}
												onCheckedChange={(checked) =>
													setNotificationSettings((prev) => ({
														...prev,
														pushNotifications: checked,
													}))
												}
											/>
										</div>
										<div className="flex items-center justify-between">
											<Label>System Updates</Label>
											<Switch
												checked={notificationSettings.systemUpdates}
												onCheckedChange={(checked) =>
													setNotificationSettings((prev) => ({
														...prev,
														systemUpdates: checked,
													}))
												}
											/>
										</div>
									</div>
								</div>
							</div>

							<Button
								onClick={() => handleSaveSettings("notifications")}
								disabled={isLoading}
							>
								<Save className="w-4 h-4 mr-2" />
								{isLoading ? "Saving..." : "Save Changes"}
							</Button>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
