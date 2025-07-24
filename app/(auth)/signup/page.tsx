import AboutSection from "@/components/auth/AboutSection";
import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up | Pixory",
  description:
    "Create a new Pixory account to access personalized features and manage your photos.",
};

const page = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-evenly">
      <Link href="/">
        <Image
          src="/pixory.svg"
          alt="logo"
          width={100}
          height={100}
          className="absolute top-4 left-4 md:left-20 xl:left-30 2xl:left-50"
        />
      </Link>
      <div className="flex w-full items-center justify-center px-4 lg:w-[50%]">
        <SignUpForm />
      </div>
      <AboutSection />
    </div>
  );
};

export default page;
