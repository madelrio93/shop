import type { Locale } from "@/i18nConfig";
import es from "@/translations/es.json";
import { useIntl } from "react-intl";

type TranslationType = {
  translate: typeof es;
  locale: Locale;
};

export const useTranslations = () => {
  const { messages, locale } = useIntl();

  return {
    translate: messages,
    locale,
  } as unknown as TranslationType;
};