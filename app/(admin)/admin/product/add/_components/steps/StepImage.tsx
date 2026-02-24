"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { StepProps } from "@/types/stepProps";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import imageCompression from "browser-image-compression";
import { useRef, useState } from "react";
import { toast } from "sonner";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function StepImage({ form }: StepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFile = async (
    file: File | undefined,
    onChange: (file: File) => void,
  ) => {
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error(`Unsupported format. Please use JPG, PNG or WEBP.`);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error(
        `File is too large (${formatFileSize(file.size)}). Maximum is 5MB.`,
      );
      return;
    }

    let finalFile = file;
    setIsCompressing(true);
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      });
      // Runtime'da Blob dönebilir, schema z.instanceof(File) beklediği
      // için her zaman File'a çeviriyoruz
      // A Blob can be returned at runtime, schema z.instanceof(File) is expected
      // We always convert to File
      finalFile = new File([compressed], file.name, {
        type: compressed.type,
      });
      toast.success(
        `Optimized: ${formatFileSize(file.size)} → ${formatFileSize(finalFile.size)}`,
      );
    } catch {
      toast.error("Compression failed. Using original file.");
      finalFile = file;
    } finally {
      setIsCompressing(false);
    }

    // field.onChange ile React Hook Form'un kendi döngüsüne bağlıyoruz
    // We're attaching field.onChange to React Hook Form's own loop
    onChange(finalFile);
    setPreview(URL.createObjectURL(finalFile));
    setFileName(file.name);
    setFileSize(finalFile.size);
  };

  const removeImage = (onChange: (value: undefined) => void) => {
    onChange(undefined);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFileName(null);
    setFileSize(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="image"
        render={({ field: { onChange } }) => (
          <FormItem>
            <FormLabel>Product Image</FormLabel>
            <FormControl>
              {preview ? (
                <div className="space-y-3">
                  <div className="relative w-full max-w-sm aspect-square rounded-xl overflow-hidden border">
                    <img
                      src={preview}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => removeImage(onChange)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {fileName && fileSize && (
                    <p className="text-sm text-muted-foreground max-w-sm truncate">
                      {fileName} ({formatFileSize(fileSize)})
                    </p>
                  )}
                </div>
              ) : (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragging(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragging(false);
                    handleFile(e.dataTransfer.files?.[0], onChange);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
                    isCompressing
                      ? "bg-muted animate-pulse pointer-events-none"
                      : isDragging
                        ? "bg-primary/10 border-primary"
                        : "hover:bg-muted/50 hover:border-primary/40 border-muted-foreground/20"
                  }`}
                >
                  {isCompressing ? (
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                  ) : (
                    <ImagePlus
                      className={`w-12 h-12 ${isDragging ? "text-primary" : "text-muted-foreground"}`}
                    />
                  )}
                  <div className="text-center">
                    <p className="font-medium">
                      {isCompressing
                        ? "Compressing image..."
                        : isDragging
                          ? "Drop your image here"
                          : "Drop an image or click to browse"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      JPG, PNG or WEBP. Max 5MB.
                    </p>
                  </div>
                </div>
              )}
            </FormControl>
            <input
              type="file"
              className="sr-only"
              tabIndex={-1}
              ref={fileInputRef}
              accept={ACCEPTED_TYPES.join(",")}
              aria-label="Upload product image"
              onChange={(e) => handleFile(e.target.files?.[0], onChange)}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
