import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Package,
	ShoppingCart,
	Users,
	DollarSign,
	TrendingUp,
	TrendingDown,
} from "lucide-react";

const stats = [
	{
		title: "Total Products",
		value: "1,234",
		change: "+12%",
		trend: "up",
		icon: Package,
	},
	{
		title: "Total Orders",
		value: "856",
		change: "+8%",
		trend: "up",
		icon: ShoppingCart,
	},
	{
		title: "Total Customers",
		value: "2,341",
		change: "+15%",
		trend: "up",
		icon: Users,
	},
	{
		title: "Revenue",
		value: "$45,231",
		change: "-3%",
		trend: "down",
		icon: DollarSign,
	},
];

export default function AdminDashboard() {
	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
				<p className="text-gray-600">
					Welcome back! Here&apos;s what&apos;s happening with your store.
				</p>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat) => (
					<Card key={stat.title}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-600">
								{stat.title}
							</CardTitle>
							<stat.icon className="w-4 h-4 text-gray-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stat.value}</div>
							<div className="flex items-center text-xs text-gray-600">
								{stat.trend === "up" ? (
									<TrendingUp className="w-3 h-3 text-green-500 mr-1" />
								) : (
									<TrendingDown className="w-3 h-3 text-red-500 mr-1" />
								)}
								<span
									className={
										stat.trend === "up" ? "text-green-500" : "text-red-500"
									}
								>
									{stat.change}
								</span>
								<span className="ml-1">from last month</span>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Recent Activity */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Recent Orders</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{[1, 2, 3, 4, 5].map((i) => (
								<div key={i} className="flex items-center justify-between">
									<div>
										<p className="font-medium">Order #100{i}</p>
										<p className="text-sm text-gray-600">Customer Name</p>
									</div>
									<div className="text-right">
										<p className="font-medium">
											${(Math.random() * 500 + 50).toFixed(2)}
										</p>
										<p className="text-sm text-gray-600">2 hours ago</p>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Low Stock Products</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{[1, 2, 3, 4, 5].map((i) => (
								<div key={i} className="flex items-center justify-between">
									<div>
										<p className="font-medium">Product Name {i}</p>
										<p className="text-sm text-gray-600">SKU: PRD00{i}</p>
									</div>
									<div className="text-right">
										<p className="font-medium text-red-600">
											{Math.floor(Math.random() * 5 + 1)} left
										</p>
										<p className="text-sm text-gray-600">Reorder needed</p>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
