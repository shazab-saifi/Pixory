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

interface PhotoId {
  id: number
}

const PhotosSection = ({query}: {query?: string}) => {
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
  } = useInfiniteQuery({
    queryKey: ['photos', query, currentOption],
    queryFn: ({ pageParam = 1 }) => {
      return fetchData({ pageParam, currentOption, query })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage
  });

  useEffect(() => {
    photoIdsRef.current = [];
    setUniquePhotos([]);
  }, [query]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [query])
  
  useEffect(() => {
    const newPhotos: PhotoType[] = [];

    data?.pages.forEach(page => {
      page.data.photos.forEach((photo: PhotoType) => {
        const alreadyExits = photoIdsRef.current.some(p => p.id === photo.id);

        if (!alreadyExits) {
          photoIdsRef.current.push({ id: photo.id });
          newPhotos.push(photo);
        }
      });
    });

    if (newPhotos.length > 0) {
      setUniquePhotos(prev => [...prev, ...newPhotos]);
    }
  }, [data]);

  useEffect(() => {
    if (isPhotoOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => document.body.classList.remove('overflow-hidden');
  }, [isPhotoOpen]);

  useIntersection({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
    targetRef: loadMoreRef,
    enabled: hasNextPage
  });

  if (error) return <div>Error loading photos: {(error as Error).message}</div>;

  return (
    <div>
      <h1 className="my-6 font-medium text-2xl px-4 md:px-22 xl:px-52">Free Stock Photos</h1>

      <Masonry
        breakpointCols={{ default: 3, 768: 2 }}
        className="my-masonry-grid px-4 md:px-20 xl:px-50"
        columnClassName="pl-4 md:pl-6 space-y-4 md:space-y-6"
      >
        {uniquePhotos.map((photo) => {
          return (
            <PhotoPreviewCard
              key={photo.id}
              width={photo.width}
              originalPhotoURL={photo.src.original}
              height={photo.height}
              photoURL={photo.src.large}
              pexelsPhotoURL={photo.url}
              onClick={() => {
                setIsPhotoOpen(true)
                setSelectedPhoto(photo)
              }}
              alt={photo.alt}
            />
          );
        })}
      </Masonry>
      {isPhotoOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
      )}
      {isPhotoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto">
            <MediaCard
              ownerName={selectedPhoto?.photographer as string}
              ownerUrl={selectedPhoto?.photographer_url as string}
              src={selectedPhoto?.src}
              isVideo={false}
              Url={selectedPhoto?.src.large as string}
              onXClick={() => setIsPhotoOpen(false)}
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
