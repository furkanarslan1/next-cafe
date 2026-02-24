"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types/menu/MenuTypes";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";

interface ProductListProps {
  products: Product[];
}

export default function AdminProductList({ products }: ProductListProps) {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-20">Image</TableHead>
            <TableHead className="font-medium">Product Details</TableHead>
            <TableHead className="font-medium hidden sm:table-cell">
              Price
            </TableHead>
            <TableHead className="font-medium hidden sm:table-cell">
              Status
            </TableHead>
            <TableHead className="font-medium">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-24 text-center text-muted-foreground"
              >
                No products found in this category.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id} className="group transition-colors">
                {/* IMAGE */}
                <TableCell className="px-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg border shadow-sm">
                    <Image
                      src={product.imageUrl || "/mocha.webp"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>

                {/* TITLE */}
                <TableCell>
                  <span className="font-semibold text-foreground text-sm">
                    {product.title}
                  </span>
                </TableCell>

                {/* PRICE */}
                <TableCell className="hidden sm:table-cell">
                  <span className="font-mono font-bold">${product.price}</span>
                </TableCell>

                {/* STATUS */}
                <TableCell className="hidden sm:table-cell">
                  <Badge variant={product.isActive ? "default" : "destructive"}>
                    {product.isActive ? "Active" : "Draft"}
                  </Badge>
                </TableCell>

                {/* ACTIONS */}
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 text-blue-500 hover:text-blue-600"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      disabled
                      className="h-8 w-8 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
