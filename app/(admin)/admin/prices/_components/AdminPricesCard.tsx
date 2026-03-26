import { Product } from "@/types/menu/MenuTypes";
import PricesDialogModal from "./PricesDialogModal";

interface AdminPricesCardProps {
  product: Product;
}

function applyDiscount(price: number, rate: number) {
  if (rate <= 0) return null;
  return Math.round(price * (1 - rate / 100) * 100) / 100;
}

function PriceDisplay({ price, discountRate }: { price: number; discountRate: number }) {
  const discounted = applyDiscount(price, discountRate);
  if (!discounted) {
    return <span className="font-mono font-medium">${price}</span>;
  }
  return (
    <span className="flex items-center gap-1.5">
      <span className="font-mono text-muted-foreground line-through text-xs">${price}</span>
      <span className="font-mono font-medium text-green-600">${discounted}</span>
    </span>
  );
}

export default function AdminPricesCard({ product }: AdminPricesCardProps) {
  return (
    <div className="shadow-md border rounded-md p-4 space-y-3 text-sm">
      <p className="font-semibold border-b pb-2">{product.title}</p>

      <div className="space-y-1">
        {product.price > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Base Price</span>
            <PriceDisplay price={product.price} discountRate={product.discountRate} />
          </div>
        )}

        {product.variants.length > 0 && (
          <>
            {product.variants.map((variant) => (
              <div key={variant.name} className="flex justify-between">
                <span className="text-muted-foreground">{variant.name}</span>
                <PriceDisplay price={variant.price} discountRate={product.discountRate} />
              </div>
            ))}
          </>
        )}

        <div className="flex justify-between pt-1 border-t border-dashed">
          <span className="text-muted-foreground">Discount</span>
          <span className={`font-mono font-medium ${product.discountRate > 0 ? "text-green-600" : ""}`}>
            {product.discountRate > 0 ? `%${product.discountRate}` : "—"}
          </span>
        </div>
      </div>

      <PricesDialogModal product={product} />
    </div>
  );
}
