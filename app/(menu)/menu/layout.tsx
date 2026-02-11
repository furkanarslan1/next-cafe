import React, { Suspense } from "react";
import Header from "../../(main)/_components/Header";
import MenuNavbar from "./_components/MenuNavbar";

export default function MenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <header className="absolute top-0 left-0 w-full z-30">
        <Header />
      </header> */}
      <main className="min-h-screen">{children}</main>

      <Suspense fallback={null}>
        <div className="fixed bottom-10 left-0 w-80 mx-auto z-30">
          <MenuNavbar />
        </div>
      </Suspense>
    </>
  );
}
