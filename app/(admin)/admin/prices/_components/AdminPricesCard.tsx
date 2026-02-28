import { Button } from "@/components/ui/button";
import { Product } from "@/types/menu/MenuTypes";
import { Pencil } from "lucide-react";

interface AdminPricesCardProps {
  product: Product;
}

export default function AdminPricesCard({ product }: AdminPricesCardProps) {
  return (
    <div className="shadow-md border rounded-md p-4 space-y-3 text-sm">
      <p className="font-semibold border-b pb-2">{product.title}</p>

      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Base Price</span>
          <span className="font-mono font-medium">₺{product.price}</span>
        </div>

        {product.variants.length > 0 && (
          <>
            {product.variants.map((variant) => (
              <div key={variant.name} className="flex justify-between">
                <span className="text-muted-foreground">{variant.name}</span>
                <span className="font-mono font-medium">₺{variant.price}</span>
              </div>
            ))}
          </>
        )}

        <div className="flex justify-between">
          <span className="text-muted-foreground">Discount</span>
          <span className="font-mono font-medium">
            {product.discountRate > 0 ? `%${product.discountRate}` : "—"}
          </span>
        </div>
      </div>

      <Button variant="outline" size="sm" className="w-full gap-2">
        <Pencil className="h-3 w-3" />
        Edit Price
      </Button>
    </div>
  );
}
