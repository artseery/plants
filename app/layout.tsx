import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/app/_components/NavigationBar/NavigationBar";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Растения",
  description: "Гайд по растениям",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}
