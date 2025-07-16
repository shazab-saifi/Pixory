import { getSession } from "@/lib/auth";
import CollectionCard from "./CollectionCard";
import prisma from "@/lib/prismaClient";

export default async function CollectionsGrid() {
  const session = await getSession();

  return (
    <div className="grid w-full grid-cols-4 gap-12">
      {/* {response?.collections &&
        response?.collections.map((collection, idx) => (
          <CollectionCard
            key={idx}
            collectionId={collection.id}
            collectionName={collection.name}
            preview={collectio.map((item) => item.src)}
            totalItems={collection.collectionItems.length}
          />
        ))} */}
    </div>
  );
}
