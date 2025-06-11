import type { Metadata } from "next";
import "./globals.css";
import { laila, openSans, urbanist } from "@/fonts/fonts";
import { Suspense } from "react";
import Loading from "@/components/Others/Loading";
import { Toaster } from "sonner";
import { Providers } from "@/redux/Providers";

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
        {/* redux provider */}
        <Providers>
          <Toaster position="top-center" expand={true} richColors />
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </Providers>
          
      </body>
    </html>
  );
}
