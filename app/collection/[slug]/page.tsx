import Footer from "@/components/Footer/Footer";
import Navbar2 from "@/components/Navbar/Navbar2";
import ItemMasonry from "@/components/profile/ItemMasonry";
import prisma from "@/lib/prismaClient";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  try {
    const { slug } = await params;
    const collection = await prisma.collection.findFirst({
      where: {
        id: parseInt(slug),
      },
      select: {
        collectionItems: true,
        name: true,
      },
    });

    return (
      <div className="min-h-screen w-full">
        <Navbar2 />
        <div className="mt-30 w-full">
          <h1 className="text-4xl font-medium">
            {collection && collection.name}
          </h1>
          <ItemMasonry collectionItems={collection?.collectionItems} />
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
