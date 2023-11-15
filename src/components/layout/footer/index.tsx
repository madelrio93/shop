import { categories } from "@/config";
import { getTranslation } from "@/i18nConfig";
import Image from "next/image";
import Link from "next/link";

export const Footer = async ({ locale }: { locale: string }) => {
  const translate = await getTranslation(locale);

  return (
    <footer className="bg-white py-5">
      <div className="container flex gap-5">
        <div>
          <Link href={"/"}>
            <Image
              className="object-cover"
              src={"/logo.jpg"}
              alt={translate.site.description}
              width={100}
              height={100}
              priority
            />
          </Link>
        </div>
        <div>
          <div className="text-lg font-semibold">{translate.sections.categories}</div>
          <ul>
            {categories.map((category) => (
              <li className="text-sm mt-1" key={category.name}>
                <Link href={category.path}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
