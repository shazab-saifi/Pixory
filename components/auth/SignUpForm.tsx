"use client";

import { CredentialsTypes } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Form from "../Form";
import Image from "next/image";
import { googleicon } from "@/lib/import";
import { signIn } from "next-auth/react";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import StaggerText from "../stagger-text";

const SignUpForm = () => {
  const router = useRouter();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

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
    await signupMutation.mutateAsync(credentials);
  };

  const handleGoogleSignUp = async () => {
    if (isGoogleLoading) return;

    try {
      setIsGoogleLoading(true);
      await signIn("google");
    } catch (error) {
      console.error(`Google sign-up error: ${error}`);
    } finally {
      setTimeout(() => {
        setIsGoogleLoading(false);
      }, 2000);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <div className="mb-2 w-full text-xl font-semibold text-neutral-500">
          <StaggerText str="Create an account at" />
        </div>
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)", y: -4 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Image src="/pixory.svg" width={84} height={50} alt="pixory.logo" />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.3, delay: 1.3 }}
        className="flex h-fit w-xs flex-col items-center justify-center gap-2"
      >
        <Form reqfn={handleSignUp} />
        <div className="flex w-full items-center justify-center gap-2">
          <span className="h-[1px] flex-1 bg-neutral-200"></span>
          <span className="text-[12px] text-neutral-400">OR</span>
          <span className="h-[1px] flex-1 bg-neutral-200"></span>
        </div>
        <button
          className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] transition-colors hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-70"
          onClick={handleGoogleSignUp}
          disabled={isGoogleLoading}
        >
          {isGoogleLoading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              <span className="text-center">Signing up...</span>
            </>
          ) : (
            <>
              <Image src={googleicon} alt="google" className="h-6 w-6" />
              <span className="text-center">Sign Up with Google</span>
            </>
          )}
        </button>
        <p className="mt-2 text-xs text-neutral-500">
          Already have an account?{" "}
          <a
            href="/signin"
            className="font-semibold text-green-600 hover:underline"
          >
            Sign in
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUpForm;
