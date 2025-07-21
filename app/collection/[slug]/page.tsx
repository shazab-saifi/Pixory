import Footer from "@/components/Footer/Footer";
import Navbar2 from "@/components/Navbar/Navbar2";
import Masonry from "@/components/collection/Masonry";
import prisma from "@/lib/prismaClient";
import { Collection } from "@/lib/types";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `${slug} | Your Collection - Pixory`,
    description: `View your personal collection "${slug}" on Pixory.`,
  };
}

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  try {
    const { slug } = await params;
    const collection = await prisma.collection.findUnique({
      where: {
        id: parseInt(slug),
      },
      select: {
        media: {
          include: {
            photo: true,
            video: {
              include: {
                videoFiles: true,
              },
            },
          },
        },
        name: true,
      },
    });

    return (
      <div className="min-h-screen w-full">
        <Navbar2 />
        <div className="mt-30 mb-20 w-full space-y-6 px-4 md:mt-50 md:mb-40 md:px-20 xl:px-50">
          <h1 className="text-4xl font-medium">
            {collection && collection.name}
          </h1>
          {collection && (
            <Masonry collection={collection as unknown as Collection} />
          )}
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error while fetching collection Items from db : ", error);
  }

  return (
    <div className="min-h-screen w-full">
      <div className="flex items-center justify-center rounded-2xl bg-gray-100 shadow-lg">
        <h1 className="text-2xl">Error while fetching Collection items</h1>
        <span className="text-gray-600">Try again after sometime</span>
      </div>
    </div>
  );
};

export default page;
