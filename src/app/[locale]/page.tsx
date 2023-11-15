import { CategoryImgNav } from "@/components/common/category-img-nav";
import { FilterButton } from "@/components/common/filter-button";
import { ProductCardSkeleton } from "@/components/product/product-skeleton";
import { ProductsList } from "@/components/product/products-list";
import { getTranslation } from "@/i18nConfig";
import { Suspense } from "react";

const HomePage = async ({
  params: { locale },
  searchParams: { category },
}: {
  params: { locale: string };
  searchParams: { category: string };
}) => {
  const translate = await getTranslation(locale);

  return (
    <>
      <section className="bg-[var(--bg-main)] py-2">
        <div className="container mx-auto flex items-center justify-between">
          <h4 className="text-[1rem] md:text-lg text-black font-bold font-primary">
            {translate.categories.all}
          </h4>

          <div className="flex gap-1">
            <FilterButton text={translate.buttons.filter} position="right" />
          </div>
        </div>
      </section>

      <section className="mt-3 px-1 md:container">
        <CategoryImgNav />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          <Suspense
            fallback={Array.from({ length: 8 }, (_, idx) => idx + 1).map(
              (item) => (
                <ProductCardSkeleton key={item} />
              )
            )}
          >
            <ProductsList category={category} />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default HomePage;
