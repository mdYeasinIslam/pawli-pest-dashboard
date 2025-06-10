import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { laila, openSans, urbanist } from "@/fonts/fonts";
import { Suspense } from "react";
import Loading from "@/components/Others/Loading";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store";

export const metadata: Metadata = {
  title: "Pawle-pest",
  description: "Pawle-pest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${laila.variable} ${urbanist.variable}`}
      >
        <Provider store={store}>
          <Toaster position="top-center" expand={true} richColors />
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
          
        </Provider>
      </body>
    </html>
  );
}
