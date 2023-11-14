"use client";

import { PropsWithChildren } from "react";
import { IntlProvider } from "react-intl";

export const ServerIntlProvider = ({
  translations,
  locale,
  children,
}: {
  translations: any;
  locale: string;
} & PropsWithChildren) => {
  return (
    <IntlProvider messages={translations} locale={locale}>
      {children}
    </IntlProvider>
  );
};