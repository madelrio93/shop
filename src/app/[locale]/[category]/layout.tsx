import { CategoryImgNav } from "@/components/common/category-img-nav";
import { ProductCardSkeleton } from "@/components/product/product-skeleton";
import { Suspense } from "react";

const CategoryLayout = ({
  params: { category },
  children,
}: {
  params: { category: string };
  children: React.ReactNode;
}) => {
  return (
    <div>
      <div className="bg-white py-2">
        <div className="container mx-auto flex items-center justify-between">
          <h4 className="text-sm md:text-lg text-black font-semibold">
            {category[0].toUpperCase() + category.slice(1, category.length)}
          </h4>
        </div>
      </div>
      <div className="container mt-3">
        <CategoryImgNav />
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          <Suspense
            fallback={Array.from({ length: 8 }, (_, idx) => idx + 1).map(
              (item) => (
                <ProductCardSkeleton key={item} />
              )
            )}
          >
            {children}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default CategoryLayout;
