import { ProductType } from "@/type";
import { MdAttachMoney } from "react-icons/md";
import { ProductDetailsCarousel } from "./product-details-carousel";
import { ProductDetailWhatsAppButton } from "./product-details-ws-button";

export const ProductDetail = ({
  title,
  description,
  images,
  price,
  category,
}: Pick<
  ProductType,
  "title" | "description" | "images" | "category" | "price"
>) => (
  <div className="flex flex-wrap md:gap-5 w-full h-full py-2 px-1 md:min-h-[20rem]">
    <div className="flex-grow w-full md:w-2/5 h-full min-h-full">
      <ProductDetailsCarousel category={category} {...{ images }} />
    </div>
    <div className="w-full md:w-2/5 p-2 md:pl-5 mt-5 md:mt-0 bg-white h-fit rounded">
      <div className="text-[34px] text-lg font-semibold mb-2 md:leading-tight">
        {title}
      </div>

      <div className="text-base md:text-sm font-semibold mb-5">{description}</div>

      <div className="flex items-center">
        <MdAttachMoney className="p-0 w-4 h-4 md:w-5 md:h-5 -mr-[2px]" />
        <p className="mr-2  md:text-lg font-semibold"> {price.toLocaleString()}</p>
      </div>

      <span className="block h-px w-full bg-neutral-300 my-3"></span>
      <div className="flex flex-wrap gap-5 mt-5">
        <ProductDetailWhatsAppButton productTitle={title} />
      </div>
    </div>
  </div>
);
