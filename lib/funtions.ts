"use server";

import { updateProduct } from "@/lib/actions";
import { revalidatePath } from "next/cache";

export async function handleSubmit(formData: FormData, productId: number) {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const subcategory = formData.get("subcategory") as string | null;
  const price = parseFloat(formData.get("price") as string);
  const venue = formData.get("venue") as string | null;
  const quantity = parseInt(formData.get("quantity") as string);

  // Update the product data
  await updateProduct(productId, {
    name,
    category,
    subcategory,
    price,
    venue,
    quantity,
  });

  setTimeout(() => {
    revalidatePath(`/edit-product/${productId}`);
}, 1500);
//   revalidatePath(`/edit-product/${productId}`);
}
