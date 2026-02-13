"use client";

import { CredentialsTypes } from "@/lib/types";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Form from "../Form";
import Image from "next/image";
import { googleicon } from "@/lib/import";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { motion } from "motion/react";
import StaggerText from "../stagger-text";

const SiginInForm = () => {
  const [googleProvider, setGoogleProvider] = useState<
    ClientSafeProvider | undefined
  >();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getProviders().then((res) => {
      setGoogleProvider(res?.google);
    });
  }, []);

  const handleLogin = async ({ email, name, password }: CredentialsTypes) => {
    try {
      const result = await signIn("credentials", {
        email,
        name,
        password,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/profile");
      } else if (result?.error) {
        console.error(`Auth error ; ${result.error}`);
      }
    } catch (error) {
      console.error(`Exceptional error : ${error}`);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!googleProvider?.id || isGoogleLoading) return;

    try {
      setIsGoogleLoading(true);
      await signIn(googleProvider.id);
    } catch (error) {
      console.error(`Google sign-in error: ${error}`);
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
          <StaggerText str="Welcome back to" />
        </div>
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)", y: -4 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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
        <Form reqfn={handleLogin} />
        <div className="flex w-full items-center justify-center gap-2">
          <span className="h-[1px] flex-1 bg-neutral-200"></span>
          <span className="text-[12px] text-neutral-400">OR</span>
          <span className="h-[1px] flex-1 bg-neutral-200"></span>
        </div>
        <button
          className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] transition-colors hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-70"
          onClick={handleGoogleSignIn}
          disabled={!googleProvider || isGoogleLoading}
        >
          {isGoogleLoading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              <span className="text-center">Signing in...</span>
            </>
          ) : (
            <>
              <Image src={googleicon} alt="google" className="h-6 w-6" />
              <span className="text-center">Sign In with Google</span>
            </>
          )}
        </button>
        <p className="mt-2 text-xs text-neutral-500">
          Do not have an account?{" "}
          <a
            href="/signup"
            className="font-semibold text-green-600 hover:underline"
          >
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default SiginInForm;
