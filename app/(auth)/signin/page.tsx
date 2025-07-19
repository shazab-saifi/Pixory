import { Metadata } from "next";
import SiginInForm from "@/components/auth/SiginInForm";

export const metadata: Metadata = {
  title: "Sign in | Pixory",
  description:
    "Sign in to your Pixory account to access your profile, photos, and more.",
};

const page = () => {
  return (
    <div className="flex h-full w-full items-center justify-center px-4 sm:px-0">
      <SiginInForm />
    </div>
  );
};

export default page;
