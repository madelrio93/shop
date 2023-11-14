import { FilterButton } from "@/components/common/filter-button";
import { ProductCardSkeleton } from "@/components/product/product-skeleton";
import { ProductsList } from "@/components/product/products-list";
import { getTranslation } from "@/i18nConfig";
import Image from "next/image";
import { Suspense } from "react";

const categories = [
  {
    name: "Ropa",
    icon: "/categories/clothes.jpg",
  },
  {
    name: "Zapatos",
    icon: "/categories/shoes.jpg",
  },
  {
    name: "Maquillajes",
    icon: "/categories/facial.jpg",
  },
  {
    name: "Hogar",
    icon: "/categories/home.jpg",
  },
  {
    name: "Otros",
    icon: "/categories/clothes.jpg",
  },
];

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
      <section className="bg-white py-2">
        <div className="container mx-auto flex items-center justify-between">
          <h4 className="text-sm md:text-lg text-black font-semibold">
            {translate.categories.all}
          </h4>

          <div className="flex gap-1">
            <FilterButton text={translate.buttons.filter} position="right" />
          </div>
        </div>
      </section>

      <section className="mt-5 p-1 md:container">
        <div className="flex md:hidden p-0 mb-5">
          {categories.map((category) => (
            <div
              className="flex flex-col flex-grow gap-2 justify-center items-center w-14"
              key={category.name}
            >
              <Image
                className="rounded-full object-cover flex justify-center items-center"
                src={category.icon}
                alt={category.name}
                width={60}
                height={60}
              />
              <h3 className="text-xs text-center">{category.name}</h3>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <Suspense
            fallback={Array.from({ length: 8 }, (_, idx) => idx + 1).map(
              (item) => (
                <ProductCardSkeleton key={item} />
              )
            )}
          >
            <ProductsList  category={category} />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default HomePage;
