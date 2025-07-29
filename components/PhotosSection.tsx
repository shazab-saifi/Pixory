import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import PhotoPreviewCard from "./PhotoPreviewCard";
import Spinner from "./Spinner";
import Masonry from "react-masonry-css";
import { PhotoType } from "@/lib/types";
import useIntersection from "@/hooks/useIntersection";
import { fetchData } from "@/lib/fetchdata";
import { useOptionsToggle, useThanksDialog } from "@/lib/store";
import MediaCard from "./MediaCard";
import { useOverflowHidden } from "@/hooks/useOverflowHidden";
import ThanksDialog from "./ThanksDialog";
import Skeleton from "react-loading-skeleton";

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
  const { activeThanksDialog, thanksDialogIn, dialogData } = useThanksDialog();
  const thanksDialog = activeThanksDialog["photoSection"];
  const dialogPhotoPreview = activeThanksDialog["photoPreview"];

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
      <div className="flex flex-col">
        <h1 className="my-6 px-4 text-2xl font-medium md:px-22 xl:px-52">
          Free Stock Photos
        </h1>
        <div className="grid h-full w-full grid-cols-2 grid-rows-1 gap-4 px-4 pb-4 md:grid-cols-3 md:gap-6 md:px-20 md:pb-6 xl:px-50">
          {[
            ...Array(
              typeof window !== "undefined" && window.innerWidth < 768 ? 2 : 3,
            ),
          ].map((_, idx) => (
            <div
              key={idx}
              role="status"
              className="flex h-full w-full animate-pulse flex-col space-y-3"
            >
              <div className="aspect-[9/14] w-full rounded-2xl bg-neutral-200 dark:bg-neutral-700" />
            </div>
          ))}
        </div>
      </div>
    );

  if (data === undefined || data.pages[0].nextPage === null)
    return (
      <div className="mt-20 flex min-w-full items-center justify-center">
        <span className="text-lg font-semibold">
          Failed to fetch videos <br />
          Please refresh the page to try again
        </span>
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
        {uniquePhotos.map((photo) => (
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
        ))}
      </Masonry>

      {(isPhotoOpen || thanksDialog.visible || dialogPhotoPreview.visible) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
      )}

      {isPhotoOpen && !thanksDialog.visible && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          <div className="pointer-events-auto px-4 md:px-12 lg:px-0">
            <MediaCard
              ownerName={selectedPhoto?.photographer ?? ""}
              ownerUrl={selectedPhoto?.photographer_url ?? ""}
              src={selectedPhoto?.src}
              isVideo={false}
              Url={selectedPhoto?.src.large ?? ""}
              mediaWidth={selectedPhoto?.width ?? 0}
              mediaHeight={selectedPhoto?.height ?? 0}
              isOpen={isPhotoOpen}
              setIsOpen={setIsPhotoOpen}
            />
          </div>
        </div>
      )}

      {thanksDialog.visible && thanksDialogIn === "photoSection" && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          <div className="pointer-events-auto px-4 sm:px-0">
            <ThanksDialog
              image={{
                url:
                  selectedPhoto?.src.large || selectedPhoto?.src.original || "",
                width: selectedPhoto?.width ?? 0,
                height: selectedPhoto?.height ?? 0,
              }}
              ownerName={selectedPhoto?.photographer ?? ""}
              ownerPexelsUrl={selectedPhoto?.photographer_url ?? ""}
            />
          </div>
        </div>
      )}

      {dialogPhotoPreview.visible &&
        thanksDialogIn === "photoPreview" &&
        dialogData && (
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
            <div className="pointer-events-auto px-4 sm:px-0">
              <ThanksDialog
                image={{
                  url: dialogData.url,
                  width: dialogData.width,
                  height: dialogData.height,
                }}
                ownerName={dialogData.photographer}
                ownerPexelsUrl={dialogData.photographerUrl}
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
