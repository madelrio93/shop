export declare type ProductType = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  images: string[];
  created_at: Date;
  updateAt: Date;
};

export type ProductFormValuesType = Pick<
  ProductType,
  "title" | "description" | "category" | "price" | "images"
>;