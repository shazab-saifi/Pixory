"use client";

import { CredentialsTypes } from "@/lib/types";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import { useTransitionRouter } from "next-view-transitions";
import { useEffect, useState } from "react";
import Form from "../Form";
import Image from "next/image";
import { googleicon } from "@/lib/import";

const SiginInForm = () => {
  const [googleProvider, setGoogleProvider] = useState<
    ClientSafeProvider | undefined
  >();
  const router = useTransitionRouter();

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
      console.log(result);
      console.log("hello");

      if (result?.ok) {
        router.push("/profile");
      } else if (result?.error) {
        console.error(`Auth error ; ${result.error}`);
      }
    } catch (error) {
      console.error(`Exceptional error : ${error}`);
    }
  };

  return (
    <div className="flex w-sm flex-col items-center justify-center gap-4 rounded-2xl bg-white p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:gap-8 md:p-8">
      <h1 className="w-full text-center text-3xl font-semibold">
        Welcome Back
      </h1>
      <Form reqfn={handleLogin} />
      <div className="flex w-full items-center justify-center gap-2">
        <span className="h-[1px] flex-1 bg-gray-400"></span>
        <span className="text-[12px] text-gray-600">OR</span>
        <span className="h-[1px] flex-1 bg-gray-400"></span>
      </div>
      <button
        className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-white px-4 py-2 text-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition-colors hover:bg-gray-100"
        onClick={() => signIn(googleProvider?.id)}
      >
        <Image src={googleicon} alt="google" className="h-6 w-6" />
        <span className="flex-1 text-center">Sign In with Google</span>
      </button>
    </div>
  );
};

export default SiginInForm;
