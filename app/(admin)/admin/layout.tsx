import React from "react";
import AdminSideBar from "./_components/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <SidebarProvider>
        <AdminSideBar />
        <main className="flex-1">{children}</main>
      </SidebarProvider>
    </div>
  );
}
