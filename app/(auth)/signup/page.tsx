"use client";

import Form from "@/components/Form";
import { CredentialsTypes } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const page = () => {
  const router = useRouter();

  const signupMutation = useMutation({
    mutationFn: async ({ email, name, password }: CredentialsTypes) => {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Account created successfully!");
      router.push("/signin");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Signup failed. Please try again.");
    },
  });

  const handleSignUp = async (credentials: CredentialsTypes) => {
    signupMutation.mutate(credentials);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-sm flex-col items-center justify-center gap-4 rounded-2xl bg-white p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:gap-8 md:p-8">
        <h1 className="w-full text-center text-3xl font-semibold">Sign Up</h1>
        <Form reqfn={handleSignUp} />
      </div>
    </div>
  );
};

export default page;
