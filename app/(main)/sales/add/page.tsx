"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form"; // Added useFieldArray
import * as z from "zod";
import { useState, useCallback } from "react";
import debounce from "lodash/debounce";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Package } from "lucide-react"; // Import the icon you want to use

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { saleSchema } from "@/lib/zod";
import { Product } from "@/types/types";

type FormValues = z.infer<typeof saleSchema>;

export default function AddSalePage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(saleSchema),
    defaultValues: {
      products: [],
    },
  });

  // Use useFieldArray to handle the products array
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      try {
        setIsSearching(true);
        const response = await fetch(
          `/api/sales/search?q=${encodeURIComponent(searchQuery)}`
        );

        if (!response.ok) {
          throw new Error("Search failed");
        }

        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Search error:", error);
        toast.error("Failed to search products");
      } finally {
        setIsSearching(false);
      }
    }, 300),
    []
  );

  const addProduct = (product: any) => {
    append({
      id: product.id,
      name: product.name,
      quantity: 1,
      price: product.price?.toString() || "0",
    });
    setQuery("");
    setSearchResults([]);
  };

  const handleSaleSubmit = async (values: FormValues) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (!values.products.length) {
        toast.error("Please add at least one product");
        return;
      }

      const salePromises = values.products.map(async (product) => {
        const response = await fetch("/api/sales/addsale", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: product.id,
            price: product.price,
            quantity: product.quantity,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || `Failed to add sale for ${product.name}`
          );
        }

        return data;
      });

      await Promise.all(salePromises);
      toast.success("All sales successfully added!");
      form.reset();
    } catch (error) {
      console.error("Error in handleSaleSubmit:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to add sales"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Sale</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSaleSubmit)}
          className="space-y-8"
        >
          <div className="relative">
            <FormLabel>Search Products</FormLabel>
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                debouncedSearch(e.target.value);
              }}
              placeholder="Search for a product..."
              className="mb-2"
            />

            {isSearching && (
              <div className="text-sm text-gray-500 mt-2">Searching...</div>
            )}

            {searchResults.length > 0 ? (
              <div className="absolute z-50 w-full">
                <Command className="rounded-lg border shadow-md">
                  <CommandList>
                    <CommandGroup heading="Available Products">
                      {searchResults.map((product) => (
                        <CommandItem
                          key={product.id}
                          value={product.id.toString()}
                          onSelect={() => addProduct(product)}
                          className="cursor-pointer"
                        >
                          <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                          <div className="flex flex-col">
                            <span>{product.name}</span>
                            <span className="text-sm text-muted-foreground">
                              Price: ${product.price} - Stock:{" "}
                              {product.quantity}
                            </span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            ) : query && !isSearching ? (
              <div className="absolute z-50 w-full">
                <Command className="rounded-lg border shadow-md">
                  <CommandList>
                    <CommandEmpty>No products found.</CommandEmpty>
                  </CommandList>
                </Command>
              </div>
            ) : null}
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4">Selected Products</h2>
            <Table>
              <TableCaption>Selected products for the sale</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, index) => (
                  <TableRow key={field.id}>
                    <TableCell>{field.name}</TableCell>
                    <TableCell>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          {...form.register(`products.${index}.quantity`)}
                        />
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          {...form.register(`products.${index}.price`)}
                        />
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding Sale..." : "Add Sale"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
