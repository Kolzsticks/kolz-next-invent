"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInSchema } from "@/lib/zod";
import LoadingButton from "@/components/loading-button";
import ErrorMessage from "@/components/error-message";
import { Package, Eye, EyeOff } from "lucide-react"; // Import Eye and EyeOff icons
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";



export default function SignIn() {
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      setIsLoading(true);
      setGlobalError("");

      const response = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (response?.error) {
        setGlobalError(
          response.error === "CredentialsSignin"
            ? "Invalid username or password"
            : response.error
        );
        return;
      }

      if (response?.ok) {
        toast.success("You have successfully signed in.");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.error("SignIn error:", error);
      setGlobalError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[100svh] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex items-center justify-between px-6 py-4 rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold">Login InviPro</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          {globalError && <ErrorMessage error={globalError} />}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter username"
                        autoComplete="off"
                        disabled={isLoading}
                        {...field}
                      />
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
                    <FormControl className="relative">
                      <div className="flex items-center">
                        <Input
                          type={showPassword ? "text" : "password"} // Toggle the password visibility
                          placeholder="Enter password"
                          disabled={isLoading}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)} // Toggle the showPassword state
                          className="ml-2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoadingButton pending={isLoading} />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
