"use client";

import { deleteCategoryAction } from "@/app/(actions)/category/deleteCategoryAction";
import { updateCategoryAction } from "@/app/(actions)/category/updateCategoryAction";
import { toggleCategoryActive } from "@/app/(actions)/category/toggleCategoryActive";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mainCategoryEnum, subTypeEnumMap } from "@/schemas/menuSchema";
import { CategoryType } from "@/types/menu/MenuTypes";
import { Edit2, Loader2, Trash2, X, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const mainCategoryColors: Record<string, string> = {
  drinks: "bg-blue-100 text-blue-700",
  meals: "bg-green-100 text-green-700",
  desserts: "bg-pink-100 text-pink-700",
};

interface CategoryCardProps {
  category: CategoryType;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const [label, setLabel] = useState(category.label);
  const [mainCategory, setMainCategory] = useState(category.mainCategory);
  const [subType, setSubType] = useState(category.subType);

  const subOptions =
    subTypeEnumMap[mainCategory as keyof typeof subTypeEnumMap]?.options ?? [];

  const handleMainCategoryChange = (value: string) => {
    setMainCategory(value as typeof mainCategory);
    const firstSub =
      subTypeEnumMap[value as keyof typeof subTypeEnumMap]?.options[0] ?? "";
    setSubType(firstSub as typeof subType);
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${category.label}"? This cannot be undone.`)) return;
    setIsDeleting(true);
    const result = await deleteCategoryAction(category.id);
    if (result.success) {
      toast.success("Category deleted.");
    } else {
      toast.error(result.error ?? "Failed to delete.");
      setIsDeleting(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateCategoryAction(category.id, {
      label,
      mainCategory,
      subType,
    });
    if (result.success) {
      toast.success("Category updated.");
      setIsEditing(false);
    } else {
      toast.error(result.error ?? "Failed to update.");
    }
    setIsSaving(false);
  };

  const handleToggleActive = async () => {
    setIsToggling(true);
    const result = await toggleCategoryActive(category.id, category.isActive);
    if (result.success) {
      toast.success(category.isActive ? "Category hidden." : "Category visible.");
    } else {
      toast.error(result.error ?? "Failed to update.");
    }
    setIsToggling(false);
  };

  const handleCancel = () => {
    setLabel(category.label);
    setMainCategory(category.mainCategory);
    setSubType(category.subType);
    setIsEditing(false);
  };

  return (
    <div className={`border rounded-xl p-4 shadow-sm bg-white flex flex-col gap-3 transition-opacity ${category.isActive ? "border-stone-200" : "border-stone-100 opacity-60"}`}>
      {isEditing ? (
        <>
          <Input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="text-sm"
          />
          <Select value={mainCategory} onValueChange={handleMainCategoryChange}>
            <SelectTrigger className="text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mainCategoryEnum.options.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={subType}
            onValueChange={(v) => setSubType(v as typeof subType)}
          >
            <SelectTrigger className="text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {subOptions.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4 mr-1" />}
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel} className="flex-1">
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-start justify-between gap-2">
            <p className="font-semibold text-sm">{category.label}</p>
            <div className="flex gap-1 shrink-0">
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 text-blue-500 hover:text-blue-600"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className="w-3.5 h-3.5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 text-red-500 hover:text-red-600"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${mainCategoryColors[category.mainCategory] ?? "bg-stone-100 text-stone-600"}`}
              >
                {category.mainCategory}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                {category.subType}
              </span>
            </div>
            <Switch
              checked={category.isActive}
              disabled={isToggling}
              onCheckedChange={handleToggleActive}
            />
          </div>
        </>
      )}
    </div>
  );
}