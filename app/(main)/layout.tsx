import React from "react";
import Header from "./_components/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
}
