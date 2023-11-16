import { ProductCard } from "@/components/product/product-card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const CategoryPage = async ({
  params: { category },
}: {
  params: { category: string };
}) => {
  const supabase = createServerComponentClient({ cookies });
  const { data: products } = await supabase
    .from("products")
    .select("id, title, price, description, category, images")
    .eq("category", category);

  return (
    <>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product as any} />
      ))}
    </>
  );
};

export default CategoryPage;
