export const getImageURL = (fileName: string, category: string) =>
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products-images/${category}/${fileName}`;