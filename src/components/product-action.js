'use server'

import { z } from "zod";

// This should match the schema in your form
const productSchema = z.object({
  name: z.string().min(2),
  id: z.string().min(1),
  category: z.string().min(1),
  subCategory: z.string().min(1),
  productOption: z.string().min(1),
  brand: z.string().min(1),
  tags: z.array(z.string()).min(1),
  price: z.number().min(0),
  discountPrice: z.number().min(0),
  stockQuantity: z.number().int().min(0),
  status: z.string().min(1),
  sku: z.string().min(1),
  description: z.string().min(10),
  photos: z.array(z.any()), // You might want to handle file uploads differently
  weight: z.string().min(1),
  length: z.string().min(1),
  width: z.string().min(1),
  height: z.string().min(1),
  availabilityDate: z.date(),
  warrantyType: z.string().min(1),
  warrantyDescription: z.string().min(1),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  metaKeywords: z.string().min(1),
});

export async function saveProduct(formData: FormData) {
  const validatedFields = productSchema.parse({
    name: formData.get('name'),
    id: formData.get('id'),
    category: formData.get('category'),
    subCategory: formData.get('subCategory'),
    productOption: formData.get('productOption'),
    brand: formData.get('brand'),
    tags: formData.getAll('tags'),
    price: Number(formData.get('price')),
    discountPrice: Number(formData.get('discountPrice')),
    stockQuantity: Number(formData.get('stockQuantity')),
    status: formData.get('status'),
    sku: formData.get('sku'),
    description: formData.get('description'),
    photos: formData.getAll('photos'),
    weight: formData.get('weight'),
    length: formData.get('length'),
    width: formData.get('width'),
    height: formData.get('height'),
    availabilityDate: new Date(formData.get('availabilityDate') as string),
    warrantyType: formData.get('warrantyType'),
    warrantyDescription: formData.get('warrantyDescription'),
    metaTitle: formData.get('metaTitle'),
    metaDescription: formData.get('metaDescription'),
    metaKeywords: formData.get('metaKeywords'),
  });

  // Here you would typically save the data to your database
  console.log('Saving product:', validatedFields);

  // For demonstration, we'll just return a success message
  return { message: 'Product saved successfully' };
}

