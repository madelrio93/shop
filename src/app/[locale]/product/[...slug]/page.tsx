import { ProductDetail } from "@/components/product/product-details";
import { ProductCardSkeleton } from "@/components/product/product-skeleton";
import { RelatedProducts } from "@/components/product/related-products";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Suspense } from "react";

const ProductDetailPage = async ({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string[] };
}) => {
  const productId = slug[1] ?? "";
  const supabase = createServerComponentClient({ cookies });
  const { data: products } = await supabase
    .from("products")
    .select("id, title, price, description, category, images")
    .eq("id", productId);

  if (!products) {
    return <h2>No</h2>;
  }

  const { id, title, description, images, category, price } = products[0];

  return (
    <div className="flex flex-col gap-5 min-h-screen">
      <div className="h-full md:h-5/6">
        <ProductDetail
          title={title}
          description={description}
          images={images}
          category={category}
          price={price}
        />
      </div>

      {products[0].category && (
        <Suspense fallback={<ProductCardSkeleton />}>
          <RelatedProducts productId={id} category={category} locale={locale} />
        </Suspense>
      )}
    </div>
  );
};
export default ProductDetailPage;
