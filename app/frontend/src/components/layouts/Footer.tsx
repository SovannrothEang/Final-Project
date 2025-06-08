import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faFacebookF, faLinkedinIn, faInstagram} from '@fortawesome/free-brands-svg-icons';
import Image from "next/image";

export function Footer() {
	return (
		<>
			<footer className="bg-black text-white py-16">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-5 gap-8">
						{/* Company Info */}
						<div>
							<h3 className="text-xl font-bold mb-4">Exclusive</h3>
							<h4 className="font-semibold mb-4">Subscribe</h4>
							<p className="text-sm text-gray-400 mb-4">
								Get 10% off your first order
							</p>
							<div className="flex">
								<Input
									placeholder="Enter your email"
									className="bg-transparent border-white text-white rounded-r-none"
								/>
								<Button className="bg-transparent border border-white border-l-0 rounded-l-none hover:bg-white hover:text-black">
									→
								</Button>
							</div>
						</div>

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

						{/* Account */}
						<div>
							<h4 className="font-semibold mb-4">Account</h4>
							<div className="space-y-2 text-sm text-gray-400">
								<p>
									<a href="#" className="hover:text-white">
										My Account
									</a>
								</p>
								<p>
									<a href="#" className="hover:text-white">
										Login / Register
									</a>
								</p>
								<p>
									<a href="#" className="hover:text-white">
										Cart
									</a>
								</p>
								<p>
									<a href="#" className="hover:text-white">
										Wishlist
									</a>
								</p>
								<p>
									<a href="#" className="hover:text-white">
										Shop
									</a>
								</p>
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
								<p>
									<a href="#" className="hover:text-white">
										Terms Of Use
									</a>
								</p>
								<p>
									<a href="#" className="hover:text-white">
										FAQ
									</a>
								</p>
								<p>
									<a href="#" className="hover:text-white">
										Contact
									</a>
								</p>
							</div>
						</div>

						{/* Download App */}
						<div>
							<h4 className="font-semibold mb-4">Download App</h4>
							<p className="text-xs text-gray-400 mb-4">
								Save $3 with App New User Only
							</p>
							<div className="flex gap-2 mb-4">
  								<div className="w-20 h-20 rounded relative overflow-hidden">
  								  <Image src="/Qrcode.png" alt="QR Code" fill className="object-cover" priority />
  								</div>
  								<div className="space-y-4">
  								  <div className="w-24 h-8 rounded relative overflow-hidden border-white border-2">
  								    <Image src="/Google.png" alt="Google Play" fill className="object-cover" priority />
  								  </div>
  								  <div className="w-24 h-8 rounded relative overflow-hidden border-white border-2">
  								    <Image src="/AppStore.png" alt="App Store" fill className="object-cover" priority />
  								  </div>
  								</div>
							</div>

							<div className="flex gap-4 text-xl">
								<FontAwesomeIcon icon={faFacebookF}  className="w-6 h-6"/>
								<FontAwesomeIcon icon={faXTwitter}  className="w-6 h-6"/>
								<FontAwesomeIcon icon={faInstagram}  className="w-6 h-6"/>
								<FontAwesomeIcon icon={faLinkedinIn}  className="w-6 h-6"/>
							</div>
						</div>
					</div>

					<Separator className="my-8 bg-gray-800" />

					<div className="text-center text-sm text-gray-400">
						© Copyright Rimel 2022. All right reserved
					</div>
				</div>
			</footer>
		</>
	);
}
