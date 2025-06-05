import { Star } from "lucide-react";

interface Testimonial {
	id: string;
	name: string;
	review: string;
	rating: number;
}

interface TestimonialSectionProps {
	testimonials: Testimonial[];
}

export function TestimonialSection({ testimonials }: TestimonialSectionProps) {
	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={`w-4 h-4 ${
					i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
				}`}
			/>
		));
	};

	return (
		<section className="mb-16">
			<h2 className="text-3xl font-semibold text-center mb-12">
				Our Top Customers
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
				{testimonials.map((testimonial) => (
					<div key={testimonial.id} className="text-center">
						<p className="text-sm text-gray-600 mb-4 line-clamp-4">
							{testimonial.review}
						</p>
						<div className="flex justify-center mb-2">
							{renderStars(testimonial.rating)}
						</div>
						<p className="font-medium text-sm">{testimonial.name}</p>
					</div>
				))}
			</div>

			{/* Pagination dots */}
			<div className="flex justify-center gap-2 mt-8">
				{[...Array(5)].map((_, index) => (
					<div
						key={index}
						className={`w-3 h-3 rounded-full ${
							index === 0 ? "bg-red-500" : "bg-gray-300"
						}`}
					/>
				))}
			</div>
		</section>
	);
}
