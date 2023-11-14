import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { ProductCard } from "./product-card";

export const ProductsList = async ({ category }: { category?: string }) => {
  const supabase = createServerComponentClient({ cookies });
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .in(...[!category ? "" : "category", !category ? [] : category.split(",")]);

  return (
    <>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product as any} />
      ))}
    </>
  );
};
