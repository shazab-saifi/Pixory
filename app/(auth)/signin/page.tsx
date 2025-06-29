'use client'

import Form from "@/components/Form"
import { CredentialsTypes } from "@/lib/types"
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react"
import { useEffect, useState } from "react"
import googleicon from "@/public/googleicon.svg"
import Image from "next/image"
import { useRouter } from "next/navigation"

const page = () => {
  const [googleProvider, setGoogleProvider] = useState<ClientSafeProvider | undefined>();
  const router = useRouter();

  useEffect(() => {
    getProviders().then((res) => {
      setGoogleProvider(res?.google);
    })
  }, []);

  const handleLogin = async ({ email, name, password }: CredentialsTypes) => {
    try {
      const result = await signIn('credentials', {
        email,
        name,
        password,
        redirect: false
      });
      console.log(result)
      console.log("hello")

      if (result?.ok) {
        router.push('/profile');
      } else if(result?.error) {
        console.error(`Auth error ; ${result.error}`);
      }
    } catch (error) {
      console.error(`Exceptional error : ${error}`);
    }
  }

  return (
      <div className="h-full px-4 sm:px-0 w-full flex items-center justify-center">
        <div className="w-sm flex flex-col items-center justify-center gap-4 md:gap-8 bg-white p-6 md:p-8 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <h1 className="font-semibold text-3xl w-full text-center">Welcome Back</h1>
          <Form reqfn={handleLogin} />
          <div className="w-full flex items-center justify-center gap-2">
            <span className="h-[1px] bg-gray-400 flex-1"></span>
            <span className="text-gray-600 text-[12px]">OR</span>
            <span className="h-[1px] bg-gray-400 flex-1"></span>
          </div>
          <button className="w-full flex items-center justify-center px-4 py-2 rounded-xl bg-white hover:bg-gray-100 transition-colors cursor-pointer text-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]" onClick={() => signIn(googleProvider?.id)}>
            <Image
              src={googleicon}
              alt="google"
              className="w-6 h-6"
            />
            <span className="flex-1 text-center">Sign In with Google</span>
          </button>
        </div>
      </div>
  )
}

export default page