import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SWRConfig } from "swr";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import NextAuthWrapper from "@/lib/next.auth.wrapper";
import StoreProvider from "@/app/StoreProvider";
import NextTopLoader from "nextjs-toploader";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tiki App",
  description: "Tiki App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StoreProvider>
          <SWRConfig>
            <AntdRegistry>
              <NextAuthWrapper>
                <NextTopLoader
                  color="#1677ff"
                  height={4}
                  showSpinner={false}
                  speed={200}
                  easing="ease-in-out"
                  shadow={false}
                  initialPosition={0.1}
                  crawl={true}
                  crawlSpeed={150}
                />

                {children}
              </NextAuthWrapper>
            </AntdRegistry>
          </SWRConfig>
        </StoreProvider>
      </body>
    </html>
  );
}
