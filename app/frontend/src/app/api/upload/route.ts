import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

export const config = {
	api: {
		bodyParser: false,
	},
};

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: NextRequest) {
	const uploadDir = path.join(process.cwd(), "public", "uploads");
	try {
		await fs.access(uploadDir);
	} catch {
		await fs.mkdir(uploadDir, { recursive: true });
	}

	const formData = await req.formData();
	const file = formData.get("file") as File;
	const name = formData.get("name") as string;
	const imageId = formData.get("imageId") as string;
	const productId = formData.get("productId") as string;

	if (!file || !productId || !name) {
		return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
	}

	// Validate file type
	if (!ALLOWED_TYPES.includes(file.type)) {
		return NextResponse.json(
			{ error: "Invalid file type. Only JPG, PNG, and WEBP are allowed." },
			{ status: 400 }
		);
	}
	// Validate file size
	if (file.size > MAX_SIZE) {
		return NextResponse.json(
			{ error: "File size exceeds 5MB limit" },
			{ status: 413 }
		);
	}

	try {
		const ext = path.extname(file.name).toLowerCase();
		const safeName = name
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)/g, "");
		const filename = `${safeName}-${productId}-${imageId}${ext}`;
		const filePath = path.join(uploadDir, filename);

		const buffer = await file.arrayBuffer();
		const image = sharp(buffer);

		const metadata = await image.metadata();
		if (metadata.width > 1200 || metadata.height > 800) {
			image.resize({
				width: 1200,
				height: 800,
				fit: "inside",
				withoutEnlargement: true,
			});
		}

		switch (ext) {
			case ".jpg":
			case ".jpeg":
				await image.jpeg({ quality: 80, progressive: true }).toFile(filePath);
				break;
			case ".png":
				await image.png({ quality: 80, progressive: true }).toFile(filePath);
				break;
			case ".webp":
				await image.webp({ quality: 80 }).toFile(filePath);
				break;
			default:
				await image.toFile(filePath);
		}

		const processedMetadata = await sharp(filePath).metadata();

		const publicUrl = `/uploads/${filename}`;

		return NextResponse.json({
			url: publicUrl,
			name: file.name,
			size: file.size,
			type: file.type,
			width: processedMetadata.width,
			height: processedMetadata.height,
			optimizedSize: (await fs.stat(filePath)).size,
		});
	} catch (error) {
		console.error("Image processing error:", error);
		return NextResponse.json(
			{ error: "Error processing image" },
			{ status: 500 }
		);
	}
}
