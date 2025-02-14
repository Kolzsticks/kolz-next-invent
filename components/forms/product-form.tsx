"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CloudinaryResource } from "@/types/types";
import { productSchema,  ProductFormValues } from "@/lib/zod";




interface ProductFormProps {
  cloudinaryImages: CloudinaryResource[];
}

export function ProductForm({ cloudinaryImages }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<CloudinaryResource | null>(
    null
  );

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: "0",
      category: "",
      subcategory: "",
      quantity: "0",
      venue: "",
      image_url: "",
    },
  });

  async function onSubmit(values: z.input<typeof productSchema>) {
    setLoading(true);
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Product added successfully");
        form.reset();
        setSelectedImage(null);
      } else {
        const errorData = await response.json();
        toast.error(
          errorData?.message || "Failed to add product. Please try again."
        );
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Product Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Selling Price Field */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selling Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="1000"
                  {...field}
                  placeholder="Enter Selling Price"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          {/* Category Dropdown */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Beverages">Beverages</SelectItem>
                    <SelectItem value="Spirits">Spirits</SelectItem>
                    <SelectItem value="Bhampagne_wine">
                      Champagne & Wine
                    </SelectItem>
                    <SelectItem value="Food">food</SelectItem>
                    <SelectItem value="Cakes">Cakes</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Subcategory Dropdown */}
          <FormField
            control={form.control}
            name="subcategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategory</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subcategory" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="beer">Beer</SelectItem>
                    <SelectItem value="soft_drinks">Soft Drinks</SelectItem>
                    <SelectItem value="juice_drinks">Juice Drinks</SelectItem>
                    <SelectItem value="cognac">Cognac</SelectItem>
                    <SelectItem value="whiskey">Whiskey</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Quantity Field */}
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Venue Dropdown */}
          <FormField
            control={form.control}
            name="venue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Venue" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="lounge">lounge</SelectItem>
                    <SelectItem value="club">club</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Image Selection Field */}
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Image</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {selectedImage ? (
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 relative">
                            <Image
                              src={selectedImage.secure_url}
                              alt="Selected product image"
                              width={32}
                              height={32}
                              className="object-cover rounded"
                            />
                          </div>
                          <span>Selected Image</span>
                        </div>
                      ) : (
                        "Select an image"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0">
                    <ScrollArea className="h-72">
                      <div className="grid grid-cols-2 gap-2 p-4">
                        {cloudinaryImages.map((image) => (
                          <div
                            key={image.public_id}
                            className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                              selectedImage?.public_id === image.public_id
                                ? "border-primary"
                                : "border-transparent"
                            }`}
                            onClick={() => {
                              field.onChange(image.secure_url);
                              setSelectedImage(image);
                            }}
                          >
                            <div className="relative aspect-square">
                              <Image
                                src={image.secure_url}
                                alt={image.context?.alt || ""}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={loading}>
          {loading ? (
            <div className="flex items-center space-x-2">
              <span className="h-4 w-4 animate-spin border-black rounded-full border-4 border-primary border-t-transparent"></span>
              <span>Adding...</span>
            </div>
          ) : (
            "Add Product"
          )}
        </Button>
      </form>
    </Form>
  );
}
