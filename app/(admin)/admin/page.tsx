import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  Coffee,
  FolderOpen,
  PlusCircle,
  DollarSign,
  AlertTriangle,
  Star,
  PackageX,
  QrCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

async function getDashboardData() {
  const supabase = await createClient();

  const [
    { count: totalActive },
    { count: outOfStock },
    { count: featured },
    { count: totalCategories },
    { data: recentProducts },
  ] = await Promise.all([
    supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true),
    supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("is_out_of_stock", true),
    supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("is_featured", true),
    supabase
      .from("categories")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("products")
      .select("id, title, image_url, price, discount_rate, is_active, is_out_of_stock, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  return {
    totalActive: totalActive ?? 0,
    outOfStock: outOfStock ?? 0,
    featured: featured ?? 0,
    totalCategories: totalCategories ?? 0,
    recentProducts: recentProducts ?? [],
  };
}

export default async function AdminPage() {
  const { totalActive, outOfStock, featured, totalCategories, recentProducts } =
    await getDashboardData();

  const stats = [
    {
      label: "Active Products",
      value: totalActive,
      icon: Coffee,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Out of Stock",
      value: outOfStock,
      icon: PackageX,
      color: outOfStock > 0 ? "text-red-600" : "text-gray-400",
      bg: outOfStock > 0 ? "bg-red-50" : "bg-gray-50",
    },
    {
      label: "Categories",
      value: totalCategories,
      icon: FolderOpen,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Featured",
      value: featured,
      icon: Star,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  const quickLinks = [
    { label: "Add Product", href: "/admin/product/add", icon: PlusCircle },
    { label: "All Products", href: "/admin/product", icon: Coffee },
    { label: "Categories", href: "/admin/categories", icon: FolderOpen },
    { label: "Prices", href: "/admin/prices", icon: DollarSign },
    { label: "QR Code", href: "/admin/qr-code", icon: QrCode },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="border border-stone-200 rounded-xl p-4 shadow-sm bg-white space-y-3"
            >
              <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* OUT OF STOCK WARNING */}
      {outOfStock > 0 && (
        <div className="flex items-center gap-3 border border-red-200 bg-red-50 rounded-xl px-4 py-3 text-sm text-red-700">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            <span className="font-semibold">{outOfStock} product{outOfStock > 1 ? "s are" : " is"} out of stock.</span>{" "}
            <Link href="/admin/product" className="underline underline-offset-2">
              Review products →
            </Link>
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* QUICK LINKS */}
        <div className="border border-stone-200 rounded-xl p-5 shadow-sm bg-white space-y-3">
          <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Quick Actions
          </h2>
          <div className="flex flex-col gap-2">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Button
                  key={link.href}
                  asChild
                  variant="ghost"
                  className="justify-start gap-2 h-9"
                >
                  <Link href={link.href}>
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>

        {/* RECENT PRODUCTS */}
        <div className="border border-stone-200 rounded-xl p-5 shadow-sm bg-white space-y-3">
          <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Recently Added
          </h2>
          <div className="flex flex-col gap-2">
            {recentProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No products yet.</p>
            ) : (
              recentProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/admin/product/${p.id}/edit`}
                  className="flex items-center gap-3 rounded-lg p-2 hover:bg-stone-50 transition-colors"
                >
                  <div className="relative w-9 h-9 rounded-md overflow-hidden border border-stone-100 shrink-0">
                    <Image
                      src={p.image_url || "/mocha.webp"}
                      alt={p.title}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{p.title}</p>
                    <p className="text-xs text-muted-foreground">${p.price}</p>
                  </div>
                  {p.is_out_of_stock && (
                    <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full shrink-0">
                      Out of stock
                    </span>
                  )}
                  {!p.is_active && (
                    <span className="text-[10px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded-full shrink-0">
                      Draft
                    </span>
                  )}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}