import PhotoPreviewCard from "../PhotoPreviewCard";

const ItemMasonry = ({
  collectionItems,
}: {
  collectionItems:
    | { src: string; id: number; collectionId: number }[]
    | undefined;
}) => {
  return (
    <div className="columns-1 gap-4 p-4 sm:columns-2 md:columns-3 lg:columns-4">
      {collectionItems &&
        collectionItems.map((item, idx) => (
          <div key={idx} className="mb-4 break-inside-avoid">
            {/* <PhotoPreviewCard /> */}
          </div>
        ))}
    </div>
  );
};

export default ItemMasonry;
