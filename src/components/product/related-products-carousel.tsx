"use client";

import { getImageURL } from "@/lib/utils";
import { ProductType } from "@/type";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const RelatedProductsCarousel = ({
  products,
}: {
  products: ProductType[];
}) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1023, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 2,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      autoPlay
      infinite
      containerClass="-mx-[10px]"
      itemClass="px-[10px]"
    >
      {products.length > 0 &&
        products.map(({ id, category, images, title, price }) => (
          <Link
            key={id}
            className="shadow-md group h-[12rem] max-h-[12rem] md:h-[12rem] md:max-h-[12rem] flex flex-col gap-2 p-1 bg-white rounded-lg group relative z-0 "
            href={`/product/${category.toLowerCase()}/${id}`}
          >
            <div className="overflow-hidden flex-grow relative">
              {images.length > 0 && (
                <Image
                  className="h-full w-full object-cover group-hover:scale-110 transition rounded"
                  src={getImageURL(images[0], category)}
                  alt={title}
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
        ))}
    </Carousel>
  );
};
