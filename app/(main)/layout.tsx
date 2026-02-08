import React from "react";
import Header from "./_components/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className="absolute top-0 left-0 w-full z-30">
        <Header />
      </header>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
}
