import { Product } from "@/types/menu/MenuTypes";
import PricesDialogModal from "./PricesDialogModal";

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

      <PricesDialogModal product={product} />
    </div>
  );
}
