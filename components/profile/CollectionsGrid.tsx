"use client";

import { useEffect, useState } from "react";
import CollectionCard from "./CollectionCard";

interface CollectionType {
  id: number;
  createdAt: string;
  name: string;
  userId: number;
  collectionItems: {
    id: number;
    collectionId: number;
    src: string;
  }[];
}

export default function CollectionsGrid() {
  const [collections, setCollections] = useState<CollectionType[] | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch("/api/collections");
        const allCollections = await res.json();
        setCollections(allCollections.collections);
        console.log(collections);
      } catch (error) {
        console.error("Failed to fetch collections:", error);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div className="grip w-full grid-cols-3">
      {collections &&
        collections.map((collection, idx) => (
          <CollectionCard
            key={idx}
            onCardClick={() => console.log("love")}
            collectionName={collection.name}
            preview={collection.collectionItems.map((item) => item.src)}
            totalItems={5}
          />
        ))}
    </div>
  );
}
