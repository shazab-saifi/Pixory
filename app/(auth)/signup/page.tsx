import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Pixory",
  description:
    "Create a new Pixory account to access personalized features and manage your photos.",
};

const page = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <SignUpForm />
    </div>
  );
};

export default page;
