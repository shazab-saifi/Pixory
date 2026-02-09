import SignUpForm from "@/components/auth/SignUpForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Pixory",
  description:
    "Create a new Pixory account to access personalized features and manage your photos.",
};

const page = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-100">
      <SignUpForm />
    </div>
  );
};

export default page;
