import Footer from "@/components/Footer/Footer";
import Navbar2 from "@/components/Navbar/Navbar2";
import CollectionsGrid from "@/components/profile/CollectionsGrid";
import { getSession } from "@/lib/auth";
import Image from "next/image";

const page = async () => {
  const session = await getSession();

  return (
    <div className="min-h-screen w-full">
      <Navbar2 />
      <div className="mt-30 flex h-full w-full flex-col px-4 md:px-20">
        {/* User section */}
        <div className="flex flex-col items-center gap-8">
          <Image
            src={
              session?.user?.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="avatar"
            width={100}
            height={100}
            className="w-32 rounded-full"
          />
          <h1 className="text-5xl font-medium">{session?.user?.name}</h1>
        </div>
        <div className="mx-auto my-20">
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
