import Navbar2 from "@/components/Navbar/Navbar2";
import { getSession } from "@/lib/auth";
import Image from "next/image";

const page = async () => {
  const session = await getSession();

  return (
    <div className="min-h-screen w-full">
      <Navbar2 />
      <div className="mt-30 flex h-full w-full flex-col">
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
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-medium">Total Collections</h2>
            <span className="border-x-2 border-gray-200 px-4 py-2 text-center text-2xl text-gray-600">
              2
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
