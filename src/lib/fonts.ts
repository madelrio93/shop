import { Inter, Montserrat, Roboto_Condensed } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-montserrat",
  display: 'swap'
});

const roboto_c = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto_c"
});

export { inter, montserrat, roboto_c };
