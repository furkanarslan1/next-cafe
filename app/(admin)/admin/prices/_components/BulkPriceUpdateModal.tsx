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

import { TrendingUp } from "lucide-react";
import { useState } from "react";

import BulkPriceUpdateForm from "./BulkPriceUpdateForm";

interface BulkPriceUpdateModalProps {
  categoryIds: string[];
}

export default function BulkPriceUpdateModal({
  categoryIds,
}: BulkPriceUpdateModalProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const trigger = (
    <Button
      size="sm"
      className="w-full gap-2 bg-black text-white hover:opacity-90 cursor-pointer transition-all duration-300"
    >
      <TrendingUp className="h-4 w-4" />
      Bulk Update
    </Button>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Bulk Price Update</DrawerTitle>
          </DrawerHeader>
          <BulkPriceUpdateForm
            categoryIds={categoryIds}
            onClose={() => setOpen(false)}
          />
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bulk Price Update</DialogTitle>
        </DialogHeader>
        <BulkPriceUpdateForm
          categoryIds={categoryIds}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
