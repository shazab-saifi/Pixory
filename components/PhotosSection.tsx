import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import PhotoPreviewCard from "./PhotoPreviewCard";
import Spinner from "./Spinner";
import Masonry from "react-masonry-css";
import { PhotoType } from "@/lib/types";
import useIntersection from "@/hooks/useIntersection";
import { fetchData } from "@/lib/fetchdata";
import { useOptionsToggle } from "@/lib/store";
import MediaCard from "./MediaCard";
import { useOverflowHidden } from "@/hooks/useOverflowHidden";

interface PhotoId {
  id: number;
}

const PhotosSection = ({ query }: { query?: string }) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const photoIdsRef = useRef<PhotoId[]>([]);
  const [uniquePhotos, setUniquePhotos] = useState<PhotoType[]>([]);
  const { currentOption } = useOptionsToggle();
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoType | null>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["photos", query, currentOption],
    queryFn: ({ pageParam = 1 }) => {
      return fetchData({ pageParam, currentOption, query });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  useEffect(() => {
    photoIdsRef.current = [];
    setUniquePhotos([]);
  }, [query]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [query]);

  useEffect(() => {
    const newPhotos: PhotoType[] = [];

    data?.pages.forEach((page) => {
      page.data.photos.forEach((photo: PhotoType) => {
        const alreadyExits = photoIdsRef.current.some((p) => p.id === photo.id);

        if (!alreadyExits) {
          photoIdsRef.current.push({ id: photo.id });
          newPhotos.push(photo);
        }
      });
    });

    if (newPhotos.length > 0) {
      setUniquePhotos((prev) => [...prev, ...newPhotos]);
    }
  }, [data]);

  useOverflowHidden(isPhotoOpen);

  useIntersection({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
    targetRef: loadMoreRef,
    enabled: hasNextPage,
  });

  if (error) return <div>Error loading photos: {(error as Error).message}</div>;
  if (isLoading)
    return (
      <div className="mt-20 flex min-w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div>
      <h1 className="my-6 px-4 text-2xl font-medium md:px-22 xl:px-52">
        Free Stock Photos
      </h1>

      <Masonry
        breakpointCols={{ default: 3, 768: 2 }}
        className="my-masonry-grid px-4 md:px-20 xl:px-50"
        columnClassName="pl-4 md:pl-6 space-y-4 md:space-y-6"
      >
        {uniquePhotos.map((photo) => {
          return (
            <PhotoPreviewCard
              key={photo.id}
              pexelsPhotoURL={photo.url}
              onClick={() => {
                setIsPhotoOpen(true);
                setSelectedPhoto(photo);
              }}
              photo={{
                id: photo.id,
                width: photo.width,
                height: photo.height,
                alt: photo.alt,
                photographerUrl: photo.photographer_url,
                portrait: photo.src.portrait,
                photographer: photo.photographer,
                landscape: photo.src.landscape,
                original: photo.src.original,
                large: photo.src.large,
              }}
            />
          );
        })}
      </Masonry>
      {isPhotoOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
      )}
      {isPhotoOpen && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          <div className="pointer-events-auto">
            <MediaCard
              ownerName={selectedPhoto?.photographer as string}
              ownerUrl={selectedPhoto?.photographer_url as string}
              src={selectedPhoto?.src}
              isVideo={false}
              Url={selectedPhoto?.src.large as string}
              mediaWidth={selectedPhoto?.width as number}
              mediaHeight={selectedPhoto?.height as number}
              isOpen={isPhotoOpen}
              setIsOpen={setIsPhotoOpen}
            />
          </div>
        </div>
      )}
      <div ref={loadMoreRef} className="py-10 text-center text-gray-500">
        {isFetchingNextPage && <Spinner />}
      </div>
    </div>
  );
};

export default PhotosSection;
