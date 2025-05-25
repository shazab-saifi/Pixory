'use client'

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import PhotoCard from "./PhotoCard";
import Spinner from "./Spinner";
import Masonry from "react-masonry-css";
import { PhotoType } from "@/lib/types";
import useIntersection from "@/hooks/useIntersection";
import { fetchData } from "@/lib/fetchdata";
import { useOptionsToggle } from "@/lib/store";

interface PhotoId {
  id: number
}

const PhotosSection = () => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const photoIdsRef = useRef<PhotoId[]>([]);
  const [uniquePhotos, setUniquePhotos] = useState<PhotoType[]>([]);
  const {currentOption} = useOptionsToggle();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending
  } = useInfiniteQuery({
    queryKey: ['photos'],
    queryFn: ({ pageParam = 1 }) => {
      return fetchData({ pageParam,  currentOption})
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage
  });

  useEffect(() => {
    let newPhotos: PhotoType[] = [];

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

  useIntersection({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
    targetRef: loadMoreRef,
    enabled: hasNextPage
  });

  if (error) return <div>Error loading photos: {(error as Error).message}</div>;
  // if (isPending) return <Spinner />;

  return (
    <div className="">
      <h1 className="my-6 font-medium text-2xl px-4 md:px-22 xl:px-52">Free Stock Photos</h1>
      <Masonry
        breakpointCols={{ default: 3, 768: 2 }}
        className="my-masonry-grid px-4 md:px-20 xl:px-50"
        columnClassName="pl-4 md:pl-6 space-y-4 md:space-y-6"
      >
        {uniquePhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            width={photo.width}
            height={photo.height}
            photoURL={photo.src.large}
            pexelsPhotoURL={photo.url}
            alt={photo.alt}
          />
        ))}
      </Masonry>
      <div ref={loadMoreRef} className="py-10 text-center text-gray-500">
        {isFetchingNextPage && <Spinner />}
      </div>
    </div>
  );
};

export default PhotosSection;
