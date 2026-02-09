import { Metadata } from "next";
import SiginInForm from "@/components/auth/SiginInForm";

export const metadata: Metadata = {
  title: "Sign in | Pixory",
  description:
    "Sign in to your Pixory account to access your profile, photos, and more.",
};

const page = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-100">
      <SiginInForm />
    </div>
  );
};

export default page;
