"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import Link from "next/link";

import {
  Home,
  LayoutDashboard,
  PlusCircle,
  Image as ImageIcon,
  User2,
  ChevronUp,
  Coffee,
  Tag,
  Instagram,
  FolderOpen,
  DollarSign,
  LogOut,
  QrCode,
  PackageX,
} from "lucide-react";
import { signOutAction } from "@/app/(actions)/auth/signOutAction";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

const items = [
  {
    group: "General",
    links: [
      { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
      { title: "QR Code", url: "/admin/qr-code", icon: QrCode },
      { title: "Back to Site", url: "/", icon: Home },
    ],
  },
  {
    group: "Products",
    links: [
      { title: "All Products", url: "/admin/product", icon: Coffee },
      { title: "Add Product", url: "/admin/product/add", icon: PlusCircle },
      { title: "Categories", url: "/admin/categories", icon: FolderOpen },
      { title: "Prices", url: "/admin/prices", icon: DollarSign },
      { title: "Stock", url: "/admin/stock", icon: PackageX },
    ],
  },
  {
    group: "Hero Settings",
    links: [
      { title: "Brand Name", url: "/admin/heroSettings/brand", icon: Tag },
      { title: "Social Media", url: "/admin/heroSettings/socialMedia", icon: Instagram },
      { title: "Drinks Hero", url: "/admin/heroSettings/drinks", icon: ImageIcon },
      { title: "Meals Hero", url: "/admin/heroSettings/meals", icon: ImageIcon },
      { title: "Desserts Hero", url: "/admin/heroSettings/desserts", icon: ImageIcon },
    ],
  },
];

export default function AdminSideBar() {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" side="left">
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">Next Cafe</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        {items.map((group) => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.links.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                      >
                        <Link href={item.url}>
                          <item.icon
                            className={isActive ? "text-amber-600" : ""}
                          />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild id="admin-sidebar-trigger">
                <SidebarMenuButton>
                  <div className="flex items-center gap-2">
                    <User2 />
                    <span>Furkan Arslan</span>
                    <ChevronUp className="ml-auto" />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" id="admin-sidebar-content">
                <DropdownMenuItem
                  className="text-red-500 cursor-pointer"
                  onClick={() => signOutAction()}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
