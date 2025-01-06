import { getAllProducts, updateProduct } from "@/lib/actions"; // Adjust to fetch and update products
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button"; // ShadCN UI Button
import { Input } from "@/components/ui/input"; // ShadCN UI Input
import { Label } from "@/components/ui/label"; // ShadCN UI Label

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  // Dynamically fetch products to get fresh data after updates
  const id = Number((await params).id);
  const products = await getAllProducts();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleSubmit = async (formData: FormData) => {
    "use server"; // Required for Server Actions
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const subcategory = formData.get("subcategory") as string | null;
    const price = parseFloat(formData.get("price") as string);
    const venue = formData.get("venue") as string | null;
    const quantity = parseInt(formData.get("quantity") as string);

    // Update the product data
    await updateProduct(product.id, {
      name,
      category,
      subcategory,
      price,
      venue,
      quantity,
    });

    revalidatePath(`/edit-product/${product.id}`);
  };

  return (
    <div className="flex flex-col justify-center items-center m-auto w-full max-w-3xl p-4 sm:p-6 md:p-8">
      <div className="flex justify-between items-center mb-6 w-full">
        <h1 className="text-2xl font-bold">Edit Product</h1>
      </div>
      <form action={handleSubmit} className="space-y-6 w-full">
        {/* Name input field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-lg font-medium">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            defaultValue={product.name}
            className=""
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Category input field */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-lg font-medium">
              Category
            </Label>
            <Input
              id="category"
              name="category"
              defaultValue={product.category}
              className=""
              required
            />
          </div>

          {/* Subcategory input field */}
          <div className="space-y-2">
            <Label htmlFor="subcategory" className="text-lg font-medium">
              Subcategory
            </Label>
            <Input
              id="subcategory"
              name="subcategory"
              defaultValue={product.subcategory || ""}
              className=""
            />
          </div>
        </div>
        {/* Price input field */}
        <div className="space-y-2">
          <Label htmlFor="price" className="text-lg font-medium">
            Price
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            defaultValue={Number(product.price)}
            className=""
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Quantity input field */}
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-lg font-medium">
              Quantity
            </Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              defaultValue={product.quantity}
              className=""
              required
            />
          </div>

          {/* Venue input field */}
          <div className="space-y-2">
            <Label htmlFor="venue" className="text-lg font-medium">
              Venue
            </Label>
            <Input
              id="venue"
              name="venue"
              defaultValue={product.venue || ""}
              className=""
            />
          </div>
        </div>

        {/* Submit button */}
        <Button type="submit" className="w-full sm:w-auto">
          Update Product
        </Button>
      </form>

      {/* Link to go back to products list */}
      <Link
        href="/products"
        className="text-blue-500 hover:underline mt-4 cursor-pointer"
      >
        <Button>Back to Products List</Button>
      </Link>
    </div>
  );
}