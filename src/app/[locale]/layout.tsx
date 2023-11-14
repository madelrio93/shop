import { Navbar } from "@/components/layout/navbar";
import { ServerIntlProvider } from "@/components/providers/server-intl-provider";
import { Locale, getTranslation, i18nConfig } from "@/i18nConfig";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> => {
  const translate = await getTranslation(locale as Locale);

  return {
    title: `${translate.site.name} | Inicio`,
    description: translate.site.description,
    icons: {
      icon: "icon.png",
    },
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
    ),
    openGraph: {
      title: `${translate.site.name}`,
      description: `${translate.site.description}`,
      url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
      siteName: translate.site.name,
      images: "/icon.png",
      locale: "en_US",
      type: "article",
    },
  };
};

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

const RootLayout = async ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  const translate = await getTranslation(locale as Locale);

  return (
    <html lang={locale} className={inter.className}>
      <body className="bg-gray-100">
        <Navbar {...{ locale }} />
        <main className="">
          <ServerIntlProvider translations={translate} locale={locale}>
            <Suspense>{children}</Suspense>
          </ServerIntlProvider>
        </main>
        <Footer {...{ locale }}/>
      </body>
    </html>
  );
};

export default RootLayout;
