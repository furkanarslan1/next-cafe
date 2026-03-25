"use client";

import { createInstagramUrl } from "@/app/(actions)/menuHero/createInstagramUrl";
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
import { InstagramUrlInput, instagramUrlSchema } from "@/schemas/instagramUrl";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SocialMediaForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<InstagramUrlInput>({
    resolver: zodResolver(instagramUrlSchema),
    defaultValues: {
      instagram_url: "",
    },
  });

  const onSubmit = async (value: InstagramUrlInput) => {
    setIsSubmitting(true);
    try {
      const result = await createInstagramUrl(value);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success("Instagram URL updated successfully.");
      router.push("/admin/heroSettings");
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="max-w-6xl mx-auto p-4 ">
      <Form {...form}>
        <form
          className="space-y-8 border border-stone-200 rounded-2xl p-6 shadow-md"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="instagram_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram Url</FormLabel>
                <FormControl>
                  <Input
                    id="instagram-url-input"
                    placeholder="e.g https://www.instagram.com/user"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant="default" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 /> : "Create Instagram Url"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
