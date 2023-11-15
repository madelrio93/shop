import getBase64 from "@/lib/getLocaleBase64";
import { getImageURL } from "@/lib/utils";
import { ProductType } from "@/type";
import Image from "next/image";
import Link from "next/link";

export const ProductCard = async ({
  product: { id, title, category, price, images },
}: {
  product: Pick<
    ProductType,
    "id" | "title" | "category" | "price" | "currency" | "images"
  >;
}) => {

  const imageURL = getImageURL(images[0], category);
  const blurUrl = await getBase64(imageURL);

  return (
    <Link
      className="shadow-md group h-[13rem] max-h-[13rem] md:h-[20rem] md:max-h-[20rem] flex flex-col gap-2 p-1 bg-white rounded-lg group relative z-0 "
      href={`/product/${category.toLowerCase()}/${id}`}
    >
      <div className="overflow-hidden flex-grow relative">
        {images.length > 0 && (
          <Image
            className="h-full w-full object-cover group-hover:scale-110 transition rounded"
            src={getImageURL(images[0], category)}
            alt={title}
            placeholder="blur"
            blurDataURL={blurUrl}
            sizes="100%"
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
