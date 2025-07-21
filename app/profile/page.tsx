import Footer from "@/components/Footer/Footer";
import Navbar2 from "@/components/Navbar/Navbar2";
import CollectionsGrid from "@/components/profile/CollectionsGrid";
import { getSession } from "@/lib/auth";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Your Profile | Pixory",
  description:
    "View and manage your Pixory profile, including your collections and personal information.",
};

const page = async () => {
  const session = await getSession();

  return (
    <div className="min-h-screen w-full">
      <Navbar2 />
      <div className="mt-30 flex h-full w-full flex-col px-4 md:px-20">
        {/* User section */}
        <div className="flex flex-col items-center gap-4 py-6 sm:gap-6 md:gap-8">
          <Image
            src={
              (session?.user?.image && session.user.image) ||
              "/profileAvatar.webp"
            }
            alt="avatar"
            width={100}
            height={100}
            className="h-20 w-20 rounded-full object-cover sm:h-28 sm:w-28 md:h-32 md:w-32"
          />
          <h1 className="text-center text-2xl font-medium break-words sm:text-3xl md:text-5xl">
            {session?.user?.name}
          </h1>
        </div>
        <div className="mx-auto my-10 md:my-20">
          <h1 className="py-4 text-left text-2xl font-medium">
            Your Collections
          </h1>
          <CollectionsGrid />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
