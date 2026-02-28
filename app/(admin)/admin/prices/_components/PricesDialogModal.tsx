"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Product } from "@/types/menu/MenuTypes";
import { Pencil } from "lucide-react";
import { useState } from "react";
import PriceEditForm from "./PriceEditForm";

interface PricesDialogModalProps {
  product: Product;
}

export default function PricesDialogModal({ product }: PricesDialogModalProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const trigger = (
    <Button variant="outline" size="sm" className="w-full gap-2">
      <Pencil className="h-3 w-3" />
      Edit Price
    </Button>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{product.title}</DrawerTitle>
          </DrawerHeader>
          <PriceEditForm product={product} onClose={() => setOpen(false)} />
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product.title}</DialogTitle>
        </DialogHeader>
        <PriceEditForm product={product} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
