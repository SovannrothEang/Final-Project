import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

export default function ProductImage() {
	return (
		<>
			{/* Product Images */}
			<Card>
				<CardHeader>
					<CardTitle>Product Images</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{/* Upload Area */}
						<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
							<Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
							<p className="text-sm text-gray-600 mb-2">
								Drag and drop images here, or click to select
							</p>
							<input
								type="file"
								multiple
								accept="image/*"
								// onChange={handleImageUpload}
								className="hidden"
								id="image-upload"
							/>
							<Button type="button" variant="outline" asChild>
								<label htmlFor="image-upload" className="cursor-pointer">
									Choose Files
								</label>
							</Button>
						</div>
						{/* Image Preview
								{images.length > 0 && (
									<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
										{images.map((image, index) => (
											<div key={index} className="relative group">
												<Image
													src={image || "/placeholder.svg"}
													alt={`Product image ${index + 1}`}
													width={150}
													height={150}
													className="w-full h-32 object-cover rounded-lg border"
												/>
												<Button
													type="button"
													variant="destructive"
													size="icon"
													className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
													onClick={() => removeImage(index)}
												>
													<X className="w-3 h-3" />
												</Button>
											</div>
										))}
									</div>
								)} */}
					</div>
				</CardContent>
			</Card>
		</>
	);
}
