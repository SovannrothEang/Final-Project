import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignUpPage() {
	return (
		<div className="min-h-screen bg-white">
			{/* Main Content */}
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

					{/* Right Side - Sign Up Form */}
					<div className="max-w-md">
						<h1 className="text-3xl font-semibold mb-2">Create an account</h1>
						<p className="text-gray-600 mb-8">Enter your details below</p>

						<form className="space-y-6">
							<Input
								placeholder="Name"
								className="border-0 border-b border-gray-300 rounded-none px-0 focus:border-gray-500"
							/>

							<Input
								placeholder="Email or Phone Number"
								className="border-0 border-b border-gray-300 rounded-none px-0 focus:border-gray-500"
							/>

							<Input
								type="password"
								placeholder="Password"
								className="border-0 border-b border-gray-300 rounded-none px-0 focus:border-gray-500"
							/>

							<Button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md">
								Create Account
							</Button>

							<Button variant="outline" className="w-full py-3 rounded-md">
								<Image
									src="/placeholder.svg?height=20&width=20"
									alt="Google"
									width={20}
									height={20}
									className="mr-2"
								/>
								Sign up with Google
							</Button>

							<div className="text-center text-sm text-gray-600">
								Already have account?{" "}
								<Link href="/login" className="underline hover:text-gray-800">
									Log in
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
