import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { RelatedProductsCarousel } from "./related-products-carousel";
import { getTranslation } from "@/i18nConfig";

export const RelatedProducts = async ({
  category,
  productId,
  locale,
}: {
  category: string;
  productId: string;
  locale: string;
}) => {
  const translate = await getTranslation(locale);
  const supabase = createServerComponentClient({ cookies });
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .neq("id", productId);

  if (!products) {
    return <div>No</div>;
  }

  return (
    products.length > 0 && (
      <div>
        <h2 className="text-sm md:text-lg font-semibold">
         {translate.sections.related}
        </h2>
        <div className="mt-[10px] md:mt-[20px] md:mb-0">
          <RelatedProductsCarousel products={products} />
        </div>
      </div>
    )
  );
};
