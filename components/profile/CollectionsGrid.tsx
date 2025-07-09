"use client";

import CollectionCard from "./CollectionCard";

export default async function CollectionsGrid() {
  return (
    <div className="grip w-full grid-cols-3">
      <CollectionCard
        onCardClick={() => console.log("love")}
        collectionName="My Collection"
        preview={[
          "https://images.pexels.com/photos/31416840/pexels-photo-31416840.jpeg?_gl=1*arm3e2*_ga*MTk4MjEwNjY3Ny4xNzMxMDc3NTk0*_ga_8JE65Q40S6*czE3NTIwNDY5NjAkbzEzMyRnMSR0MTc1MjA0NzU3MyRqNDkkbDAkaDA.",
          "https://images.pexels.com/photos/32832431/pexels-photo-32832431.jpeg?_gl=1*1s5l2os*_ga*MTk4MjEwNjY3Ny4xNzMxMDc3NTk0*_ga_8JE65Q40S6*czE3NTIwNDY5NjAkbzEzMyRnMSR0MTc1MjA0NzYwOSRqMTMkbDAkaDA.",
          "https://images.pexels.com/photos/32600114/pexels-photo-32600114.jpeg?_gl=1*mlhwv7*_ga*MTk4MjEwNjY3Ny4xNzMxMDc3NTk0*_ga_8JE65Q40S6*czE3NTIwNDY5NjAkbzEzMyRnMSR0MTc1MjA0NzY1MSRqNTUkbDAkaDA.",
        ]}
        totalItems={5}
      />
    </div>
  );
}
