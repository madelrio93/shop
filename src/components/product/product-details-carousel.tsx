"use client";

import { getImageURL } from "@/lib/utils";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export const ProductDetailsCarousel = ({
  category,
  images,
}: {
  category: string;
  images: string[];
}) => {
  return (
    <div className="text-[20px] w-full max-w-[1360px]">
      <Carousel
        className={`productCarousel`}
        showIndicators={false}
        showArrows={true}
        showStatus={false}
        preventMovementUntilSwipeScrollTolerance
        centerSlidePercentage={10}
      >
        {images?.map((name) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="object-cover max-h-96 md:max-h-[35rem]"
            key={name}
            src={getImageURL(name, category)}
            alt={name}
          />
        ))}
      </Carousel>
    </div>
  );
};
