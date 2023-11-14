import { getImageURL } from "@/lib/utils";
import { ProductType } from "@/type";
import Image from "next/image";
import Link from "next/link";

export const ProductCard = ({
  product: { id, title, category, price, images },
}: {
  product: Pick<
    ProductType,
    "id" | "title" | "category" | "price" | "currency" | "images"
  >;
}) => {
  return (
    <Link
      className="shadow-md group h-[22rem] max-h-[22rem] flex flex-col gap-2 pb-2 bg-white rounded-lg group relative z-0 pt-2"
      href={`/product/${category.toLowerCase()}/${id}`}
    >
      <div className="overflow-hidden flex-grow relative">
        {images.length > 0 && (
          <Image
            className="h-full w-full object-cover group-hover:scale-110 transition rounded"
            src={getImageURL(images[0], category)}
            alt={title}
            loading="lazy"
            fill
          />
        )}
      </div>
      <div className="w-full h-10 flex items-center px-2">
        <div className="flex-grow">
          <h3 className="text-zinc-900 text-xs md:text-sm">{title}</h3>
        </div>
        <div className="max-w-[60px] flex items-center mr-1 bg-[var(--primary-color-main)] text-white text-xs md:text-sm font-bold px-2 py-1 rounded-r-full rounded-l-full">
          <div>${price.toLocaleString()}</div>
        </div>
      </div>
    </Link>
  );
};
