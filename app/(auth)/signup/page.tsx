"use client";

import Form from "@/components/Form";
import { CredentialsTypes } from "@/lib/types";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const handleSignUp = async ({ email, name, password }: CredentialsTypes) => {
    try {
      const user = await axios.post("/api/auth/signup", {
        email,
        name,
        password,
      });

      if (user.statusText === "OK") {
        router.push("/signin");
      } else {
        return;
      }
    } catch (error) {
      console.error(`Some internal server error occured : ${error}`);
    }
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
