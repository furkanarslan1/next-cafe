import React from "react";
import Header from "../../(main)/_components/Header";

export default function MenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="absolute top-0 left-0 w-full z-30">
        <Header />
      </header>
      <main className="min-h-screen">{children}</main>
    </>
  );
}
