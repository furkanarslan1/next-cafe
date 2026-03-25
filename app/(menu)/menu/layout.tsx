import React, { Suspense } from "react";

import MenuNavbar from "./_components/MenuNavbar";

export default function MenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header></header>
      <main className="min-h-screen">{children}</main>

      <Suspense fallback={null}>
        <div className="fixed bottom-10 left-0 w-80 mx-auto z-30">
          <MenuNavbar />
        </div>
      </Suspense>
    </>
  );
}
