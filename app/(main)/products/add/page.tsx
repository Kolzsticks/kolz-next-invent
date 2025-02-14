import { ProductForm } from '@/components/forms/product-form';
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function AddProductPage() {
  // Fetch images from Cloudinary
  const { resources: cloudinaryImages } = await cloudinary.api.resources_by_tag(
    "nextjs-server-actions-upload-sneakers",
    { context: true }
  );

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <ProductForm cloudinaryImages={cloudinaryImages} />
    </div>
  );
}