"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginSchema, LoginValues } from "@/schemas/authSchema";

import { loginAction } from "@/app/(actions)/auth/loginAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginValues) {
    console.log("Tıklandı!", values);
    const loadingToast = toast.loading("Logging in...");
    const result = await loginAction(values);

    if (result?.error) {
      toast.error("Login Failed", {
        description: result.error,
        id: loadingToast,
      });
      return;
    }

    toast.success("login successful!", {
      id: loadingToast,
    });

    router.push("/admin");
    router.refresh();
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="example@expample.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Logging in..." : "Login"}
                </Button>
                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
