"use client";

import { useTranslations } from "@/lib/hooks/useTranslations";
import { usePathname } from "next/navigation";
import { BsWhatsapp } from "react-icons/bs";

export const ProductDetailWhatsAppButton = ({
  productTitle,
}: {
  productTitle: string;
}) => {
  const { translate } = useTranslations();
  const pathname = usePathname();
  const productUrl = `${process.env.NEXT_PUBLIC_APP_URL}${pathname}`;

  const handleOnCLick = () => {
    const whatsappLink = `https://wa.me/${
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
    }?text=${encodeURIComponent(
      translate.message.orderProduct.replace("{product}", productTitle)
    )}%0A%0A${encodeURIComponent(productUrl)}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <button
      type="button"
      className="w-full shadow flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[var(--primary-color-main)] text-white cursor-pointer hover:bg-[var(--primary-color-dark)]"
      onClick={handleOnCLick}
    >
      <BsWhatsapp /> {translate.buttons.ws}
    </button>
  );
};
