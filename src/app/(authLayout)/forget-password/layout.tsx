import type { Metadata } from "next";
import { laila, openSans, urbanist } from "@/fonts/fonts";
import { Suspense } from "react";
import Loading from "@/components/Others/Loading";
import { Toaster } from "sonner";
import HeaderPart from "@/components/auth/HeaderPart";
// import "../../globals.css";

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
    
      <main
        className={`h-full grid grid-cols-3`}
      >
        {/* <Toaster position="top-center" expand={true} richColors /> */}
      {/* <Suspense fallback={<Loading />}> */}
        <HeaderPart />
      <div className="col-span-2">
        
          {children}
        </div>
        {/* </Suspense> */}
      </main>
  );
}
