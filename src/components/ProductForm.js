"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "./ui/multi-select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  id: z.string().min(1, { message: "ID is required." }),
  category: z.string().min(1, { message: "Please select a category." }),
  subCategory: z.string().min(1, { message: "Please select a sub-category." }),
  productOption: z
    .string()
    .min(1, { message: "Please select a product option." }),
  brand: z.string().min(1, { message: "Please select a brand." }),
  tags: z
    .array(z.string())
    .min(1, { message: "Please select at least one tag." }),
  price: z.number().min(0, { message: "Price must be a positive number." }),
  discountPrice: z
    .number()
    .min(0, { message: "Discount price must be a positive number." }),
  stockQuantity: z
    .number()
    .int()
    .min(0, { message: "Stock quantity must be a non-negative integer." }),
  status: z.string().min(1, { message: "Please select a status." }),
  sku: z.string().min(1, { message: "SKU is required." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  photos: z
    .array(z.instanceof(File))
    .min(1, { message: "Please upload at least one photo." }),
  weight: z.string().min(1, { message: "Weight is required." }),
  length: z.string().min(1, { message: "Length is required." }),
  width: z.string().min(1, { message: "Width is required." }),
  height: z.string().min(1, { message: "Height is required." }),
  availabilityDate: z.date({
    required_error: "Availability date is required.",
  }),
  warrantyType: z.string().min(1, { message: "Warranty type is required." }),
  warrantyDescription: z
    .string()
    .min(1, { message: "Warranty description is required." }),
  reviewName: z.string().min(1, { message: "Reviewer name is required." }),
  reviewDescription: z
    .string()
    .min(1, { message: "Review description is required." }),
  rating: z
    .number()
    .min(1)
    .max(5, { message: "Rating must be between 1 and 5." }),
  metaTitle: z.string().min(1, { message: "Meta title is required." }),
  metaDescription: z
    .string()
    .min(1, { message: "Meta description is required." }),
  metaKeywords: z.string().min(1, { message: "Meta keywords are required." }),
});

const categoryOptions = ["Electronics", "Clothing", "Home & Garden", "Books"];
const subCategoryOptions = ["Smartphones", "Laptops", "Accessories"];
const productOptionOptions = ["Color", "Size", "Material"];
const brandOptions = ["Apple", "Samsung", "Sony", "LG"];
const statusOptions = ["In Stock", "Out of Stock", "Pre-order"];
const tagOptions = [
  { value: "new", label: "New" },
  { value: "sale", label: "Sale" },
  { value: "bestseller", label: "Bestseller" },
  { value: "featured", label: "Featured" },
];

export function ProductForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      id: "",
      category: "",
      subCategory: "",
      productOption: "",
      brand: "",
      tags: [],
      price: 0,
      discountPrice: 0,
      stockQuantity: 0,
      status: "",
      sku: "",
      description: "",
      photos: [],
      weight: "",
      length: "",
      width: "",
      height: "",
      availabilityDate: new Date(),
      warrantyType: "",
      warrantyDescription: "",
      reviewName: "",
      reviewDescription: "",
      rating: 5,
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <section className="py-10">
      <div className="w-[90%] mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" grid grid-cols-3 gap-4 "
          >
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

            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      {categoryOptions.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub-category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a sub-category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subCategoryOptions.map((subCategory) => (
                        <SelectItem key={subCategory} value={subCategory}>
                          {subCategory}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productOption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Option</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {productOptionOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brandOptions.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={tagOptions}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Select tags"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter price"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discountPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter discount price"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stockQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter stock quantity"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter SKU" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter product description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="photos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photos</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      onChange={(e) =>
                        field.onChange(Array.from(e.target.files))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter weight (e.g., 0.2 kg)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Length</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter length (e.g., 25 cm)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Width</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter width (e.g., 20 cm)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter height (e.g., 2 cm)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="availabilityDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Availability Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="warrantyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warranty Type</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter warranty type (e.g., 1-year)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="warrantyDescription"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Warranty Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter warranty description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-3 py-4">
              <h4 className="text-2xl font-bold">Reviews Details</h4>

              <hr />
            </div>

            <FormField
              control={form.control}
              name="reviewName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reviewer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter reviewer name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reviewDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter review description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      placeholder="Enter rating (1-5)"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-3 py-4">
              <h4 className="text-2xl font-bold">Meta Details</h4>

              <hr />
            </div>
            <FormField
              control={form.control}
              name="metaTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter meta title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter meta description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaKeywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Keywords</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter meta keywords" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
