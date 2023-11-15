import { Locale, getTranslation } from "@/i18nConfig";
import Image from "next/image";
import { Menu } from "./menu";
import { AiFillLock } from "react-icons/ai";
import { MovileMenu } from "./movile-menu";
import Link from "next/link";
import LogoImg from '../../../../public/logo.jpg'

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
    <nav className="md:py-1 bg-[var(--bg-main)] h-16">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-grow basis-0 pt-1 md:py-0">
          <Link href={"/"}>
            <Image
              className="object-cover w-100% h-100%"
              src={LogoImg}
              alt={translate.site.description}
              width={105}
              height={105}
              quality={100}
              placeholder="blur"
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
