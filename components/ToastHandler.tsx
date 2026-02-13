"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const MESSAGES: Record<string, string> = {
  CategoryCreated: "Category created successfully",
};

export default function ToastHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const message = searchParams.get("message");

  useEffect(() => {
    if (message && MESSAGES[message]) {
      toast.success(MESSAGES[message]);
      const params = new URLSearchParams(searchParams.toString());
      params.delete("message");
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname);
    }
  }, [message]);

  return null;
}
