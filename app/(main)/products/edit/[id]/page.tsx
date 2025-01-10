// EditProductPage.tsx
import { getAllProducts } from "@/lib/actions";
import { ProductForm } from "@/components/EditProduct";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);
  const products = await getAllProducts();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  // Serialize the data by converting to JSON and back
  const serializedProduct = JSON.parse(JSON.stringify(product));

  return (
    <div className="flex flex-col justify-center items-center m-auto w-full max-w-3xl p-4 sm:p-6 md:p-8">
      <div className="flex justify-between items-center mb-6 w-full">
        <h1 className="text-2xl font-bold">Edit Product</h1>
      </div>
      <ProductForm product={serializedProduct} />
    </div>
  );
}
