import ToastHandler from "@/components/ToastHandler";
import React, { Suspense } from "react";

export default function AdminCategoriesPage() {
  return (
    <div>
      <Suspense>
        <ToastHandler />
      </Suspense>
    </div>
  );
}
