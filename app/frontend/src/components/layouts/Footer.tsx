import { Separator } from "../ui/separator";

export function Footer() {
	return (
		<>
			<footer className="bg-black text-white py-8">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Support */}
						<div>
							<h4 className="font-semibold mb-4">Support</h4>
							<div className="space-y-2 text-sm text-gray-400">
								<p>
									111 Bijoy sarani, Dhaka,
									<br />
									DH 1515, Bangladesh.
								</p>
								<p>exclusive@gmail.com</p>
								<p>+88015-88888-9999</p>
							</div>
						</div>

						{/* Quick Link */}
						<div>
							<h4 className="font-semibold mb-4">Quick Link</h4>
							<div className="space-y-2 text-sm text-gray-400">
								<p>
									<a href="#" className="hover:text-white">
										Privacy Policy
									</a>
								</p>
								{/* <p>
									<a href="#" className="hover:text-white">
										Terms Of Use
									</a>
								</p>
								<p>
									<a href="#" className="hover:text-white">
										FAQ
									</a>
								</p> */}
								<p>
									<a href="/contact" className="hover:text-white">
										Contact
									</a>
								</p>
								<p>
									<a href="/about" className="hover:text-white">
										About
									</a>
								</p>
							</div>
						</div>
					</div>

					<Separator className="my-4 bg-gray-800" />

					<div className="text-center text-sm text-gray-400 pt-2">
						© Copyright Rimel 2022. All right reserved
					</div>
				</div>
			</footer>
		</>
	);
}
