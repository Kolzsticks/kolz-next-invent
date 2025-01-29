import { getAllSales } from "@/lib/actions";
import SalesForm from "@/components/EditSales";

export default async function EditSalesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);
  const sales = await getAllSales();
  const sale = sales.find((p) => p.id === Number(id));

  if (!sale) {
    return <div>Product not found</div>;
  }

  // Serialize the data by converting to JSON and back
  const serializedSales = JSON.parse(JSON.stringify(sale));

  return (
    <div className="flex flex-col justify-center items-center m-auto w-full max-w-3xl p-4 sm:p-6 md:p-8">
      <div className="flex justify-between items-center mb-6 w-full">
        <h1 className="text-2xl font-bold">Edit Product</h1>
      </div>
      <SalesForm sales={serializedSales} />
    </div>
  );
}
