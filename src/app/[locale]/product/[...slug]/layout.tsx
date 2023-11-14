import { ProductDetailSkeleton } from "@/components/product/product-skeleton";
import { getTranslation } from "@/i18nConfig";
import { getImageURL } from "@/lib/utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Metadata } from "next/types";
import { Suspense } from "react";

export const generateMetadata = async ({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string[] };
}): Promise<Metadata> => {
  const translate = await getTranslation(locale);
  const catg = slug[0] ?? "";
  const productId = slug[1] ?? "";

  try {
    const supabase = createServerComponentClient({ cookies });
    const { data: products } = await supabase
      .from("products")
      .select("id, title, price, description, category, images")
      .eq("id", productId);

    if (!products)
      throw new Error("No se pudo obtener la información de la API");

    return {
      title: `${translate.site.name} | ${catg[0].toUpperCase()}${catg.slice(
        1,
        catg.length
      )}`,
      icons: {
        icon: "icon.png",
      },
      metadataBase: new URL(
        process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
      ),
      openGraph: {
        title: `${products[0].title}`,
        description: `${products[0].description}`,
        url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
        siteName: translate.site.name,
        images: getImageURL(products[0].images[0], products[0].category),
        locale: "en_US",
        type: "article",
      },
    };
  } catch (error) {
    return {
      title: "Error",
      description: "No se pudo obtener la información de la API",
    };
  }
};

const ProductLayout = ({
  params,
  children,
}: {
  params: { slug: string[] };
  children: React.ReactNode;
}) => {
  const catg = params.slug[0] ?? "";

  return (
    <div>
      <div className="bg-white py-2">
        <div className="container mx-auto flex items-center justify-between">
          <h4 className="text-sm md:text-lg text-black font-semibold">
            {catg[0].toUpperCase() + catg.slice(1, catg.length)}
          </h4>
        </div>
      </div>
      <div className="container mt-5">
        <div className="">
          <Suspense fallback={<ProductDetailSkeleton />}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
};

export default ProductLayout;
