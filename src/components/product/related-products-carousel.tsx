"use client";

import { ProductType } from "@/type";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ProductCard } from "./product-card";

export const RelatedProductsCarousel = ({
  products,
}: {
  products: ProductType[];
}) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1023, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
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
        products.map((product) => (
          <ProductCard key={product.id} {...{ product }} />
        ))}
    </Carousel>
  );
};
