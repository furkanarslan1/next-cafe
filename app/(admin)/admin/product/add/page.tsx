import { Suspense } from "react";
import ProductAddForm from "./_components/ProductAddForm";

export default function ProductAddPage() {
  return (
    <div>
      <Suspense>
        <ProductAddForm />
      </Suspense>
    </div>
  );
}
