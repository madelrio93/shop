import { categories } from "@/config";
import Image from "next/image";
import Link from "next/link";

export const CategoryImgNav = () => {
  return (
    <div className="flex md:hidden p-0 my-2">
      {categories.map((category) => (
        <Link
          className="flex flex-col flex-grow gap-1 justify-center items-center w-14"
          key={category.name}
          href={category.path}
        >
          <Image
            className="rounded-full object-cover flex justify-center items-center"
            src={category.img}
            alt={category.name}
            width={57}
            height={57}
          />
          <div className="text-[0.7rem] text-center font-primary">
            {category.name}
          </div>
        </Link>
      ))}
    </div>
  );
};
