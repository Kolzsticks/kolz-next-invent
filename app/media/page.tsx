import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

import CldImage from "@/components/image_submission/CldImage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import ImageDropdown from "@/components/image_submission/DeleteImg"; // Import the Dropdown component

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryResource {
  context?: {
    alt?: string;
    caption?: string;
  };
  public_id: string;
  secure_url: string;
}

async function Home() {
  const { resources: products_image } = await cloudinary.api.resources_by_tag(
    "nextjs-server-actions-upload-sneakers",
    { context: true }
  );

  async function create(formData: FormData) {
    "use server";
    const file = formData.get("image") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            tags: ["nextjs-server-actions-upload-sneakers"],
            upload_preset: "next-js-upload-akolade",
          },
          function (error, result) {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          }
        )
        .end(buffer);
    });

    revalidatePath("/products/add/images");
  }

  async function deleteImage(publicId: string) {
    "use server";
    await cloudinary.uploader.destroy(publicId, { invalidate: true });

    revalidatePath("/products/add/images");
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          Media Library
        </h1>
      </div>

      <form action={create} className="flex flex-col lg:flex-row gap-4">
        <div className="grid w-full max-w-sm items-center ">
          <Label htmlFor="image" className="cursor-pointer hidden">
            Select an Image to Upload
          </Label>
          <Input id="image" type="file" name="image" required />
        </div>
        <Button type="submit">
          <UploadCloud className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
        {products_image.map((product_image: CloudinaryResource) => (
          <Card
            key={product_image.public_id}
            className="p-2 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="aspect-square relative rounded-md overflow-hidden">
              <CldImage
                width={400}
                height={400}
                src={`${product_image.secure_url}?v=${new Date().getTime()}`} // Append timestamp for cache busting
                alt={product_image.context?.alt || ""}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
              />
            </div>
            {product_image.context?.caption && (
              <p className="mt-2 text-sm truncate font-medium text-neutral-700 dark:text-neutral-200">
                {product_image.context.caption}
              </p>
            )}
            <ImageDropdown
              publicId={product_image.public_id}
              onDelete={deleteImage}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Home;
