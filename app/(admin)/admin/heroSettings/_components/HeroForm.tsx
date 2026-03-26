"use client";

import { updateHeroPage } from "@/app/(actions)/menuHero/updateHeroPage";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HeroPageInput, heroPageSchema } from "@/schemas/heroSettings";
import { zodResolver } from "@hookform/resolvers/zod";
import imageCompression from "browser-image-compression";
import { ImagePlus, Loader2, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface HeroFormProps {
  page: "drinks" | "meals" | "desserts";
  defaultValues?: {
    title?: string;
    description?: string;
    existingImageUrl?: string;
    existingImagePublicId?: string;
  };
}

export default function HeroForm({ page, defaultValues }: HeroFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const displayImage = preview ?? defaultValues?.existingImageUrl ?? null;
  const isExistingImage = !preview && !!defaultValues?.existingImageUrl;

  const form = useForm<HeroPageInput>({
    resolver: zodResolver(heroPageSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      image: undefined,
    },
  });

  const handleFile = async (
    file: File | undefined,
    onChange: (file: File) => void,
  ) => {
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Unsupported format. Please use JPG, PNG or WEBP.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`File is too large (${formatFileSize(file.size)}). Maximum is 5MB.`);
      return;
    }

    let finalFile = file;
    setIsCompressing(true);
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1200,
        initialQuality: 0.85,
        useWebWorker: true,
      });
      finalFile = new File([compressed], file.name, { type: compressed.type });
      toast.success(`Optimized: ${formatFileSize(file.size)} → ${formatFileSize(finalFile.size)}`);
    } catch {
      toast.error("Compression failed. Using original file.");
    } finally {
      setIsCompressing(false);
    }

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

  const onSubmit = async (values: HeroPageInput) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description ?? "");
      if (values.image instanceof File) {
        formData.append("image", values.image);
      }
      if (defaultValues?.existingImagePublicId) {
        formData.append("existingImagePublicId", defaultValues.existingImagePublicId);
      }

      const result = await updateHeroPage(page, formData);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success("Hero updated successfully.");
      router.push("/admin/heroSettings");
    } catch {
      toast.error("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Form {...form}>
        <form
          className="space-y-6 border border-stone-200 rounded-2xl p-6 shadow-md"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* TITLE */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Amazing Drinks" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* DESCRIPTION */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a short description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* IMAGE */}
          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange } }) => (
              <FormItem>
                <FormLabel>Hero Image</FormLabel>
                <FormControl>
                  {displayImage ? (
                    <div className="space-y-3">
                      <div className="relative w-full max-w-sm aspect-video rounded-xl overflow-hidden border">
                        <img
                          src={displayImage}
                          alt="Preview"
                          className="object-cover w-full h-full"
                        />
                        {isExistingImage ? (
                          <Button
                            type="button"
                            variant="secondary"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => removeImage(onChange)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {!isExistingImage && fileName && fileSize && (
                        <p className="text-sm text-muted-foreground max-w-sm truncate">
                          {fileName} ({formatFileSize(fileSize)})
                        </p>
                      )}
                      {isExistingImage && (
                        <p className="text-sm text-muted-foreground">
                          Current image. Click the pencil icon to change it.
                        </p>
                      )}
                    </div>
                  ) : (
                    <div
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                      onDrop={(e) => {
                        e.preventDefault();
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
                        <ImagePlus className={`w-12 h-12 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
                      )}
                      <div className="text-center">
                        <p className="font-medium">
                          {isCompressing
                            ? "Compressing image..."
                            : isDragging
                              ? "Drop your image here"
                              : "Drop an image or click to browse"}
                        </p>
                        <p className="text-sm text-muted-foreground">JPG, PNG or WEBP. Max 5MB.</p>
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
                  aria-label="Upload hero image"
                  onChange={(e) => handleFile(e.target.files?.[0], onChange)}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
