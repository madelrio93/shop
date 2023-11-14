import { Locale, getTranslation } from "@/i18nConfig";
import Image from "next/image";
import { Menu } from "./menu";
import { AiFillLock } from "react-icons/ai";
import { MovileMenu } from "./movile-menu";
import Link from "next/link";

const menu = ["Inicio", "Categorías", "Quienes Somos"];
const categories = [
  "Ropa",
  "Zapatos",
  "Maquillajes - Facial",
  "Hogar",
  "Otros",
];

export const Navbar = async ({ locale }: { locale: Locale }) => {
  const translate = await getTranslation(locale);

  return (
    <nav className="md:py-1 shadow-lg bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-grow basis-0 py-1 md:py-0">
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
        <div className="hidden md:block">
          <Menu />
        </div>
        <div className="hidden md:block flex-grow basis-0 text-end">
          <button
            className="bg-[--primary-color-main] hover:bg-[--primary-color-dark] p-2 rounded-full text-white text-sm font-semibold"
            type="button"
            aria-label="Login"
          >
            <AiFillLock />
          </button>
        </div>
        <div className="block md:hidden">
          <MovileMenu />
        </div>
      </div>
    </nav>
  );
};
