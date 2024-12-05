'use server'

import { z } from 'zod'

const productSchema = z.object({
  product_id: z.string(),
  category: z.string(),
  sub_category: z.string(),
  name: z.string(),
  brand: z.string(),
  description: z.string(),
  product_options: z.array(z.object({
    option_name: z.string(),
    values: z.array(z.string())
  })),
  options: z.array(z.object({
    option_name: z.string(),
    values: z.array(z.string())
  })),
  images: z.array(z.string()),
  price: z.number(),
  discount_price: z.number().optional(),
  stock_quantity: z.number(),
  status: z.string(),
  sku: z.string(),
  weight: z.string(),
  dimensions: z.object({
    length: z.string(),
    width: z.string(),
    height: z.string()
  }),
  meta: z.object({
    meta_title: z.string(),
    meta_description: z.string(),
    meta_keywords: z.array(z.string())
  }),
  tags: z.array(z.string()),
  stock_location: z.string(),
  availability_date: z.string().optional(),
  condition: z.string(),
  warranty: z.object({
    type: z.string(),
    description: z.string()
  })
})

export async function createProduct(formData: FormData) {
  const validatedFields = productSchema.safeParse({
    product_id: formData.get('product_id'),
    category: formData.get('category'),
    sub_category: formData.get('sub_category'),
    name: formData.get('name'),
    brand: formData.get('brand'),
    description: formData.get('description'),
    product_options: JSON.parse(formData.get('product_options') as string),
    options: JSON.parse(formData.get('options') as string),
    images: JSON.parse(formData.get('images') as string),
    price: parseFloat(formData.get('price') as string),
    discount_price: formData.get('discount_price') ? parseFloat(formData.get('discount_price') as string) : undefined,
    stock_quantity: parseInt(formData.get('stock_quantity') as string),
    status: formData.get('status'),
    sku: formData.get('sku'),
    weight: formData.get('weight'),
    dimensions: JSON.parse(formData.get('dimensions') as string),
    meta: JSON.parse(formData.get('meta') as string),
    tags: JSON.parse(formData.get('tags') as string),
    stock_location: formData.get('stock_location'),
    availability_date: formData.get('availability_date') as string,
    condition: formData.get('condition'),
    warranty: JSON.parse(formData.get('warranty') as string)
  })

  if (!validatedFields.success) {
    return { error: 'Invalid fields. Please check your input.' }
  }

  // Here you would typically save the product to your database
  console.log('Product created:', validatedFields.data)

  return { success: 'Product created successfully!' }
}

