'use client'

import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import PhotoCard from "./PhotoCard";
import Spinner from "./Spinner";
import Masonry from "react-masonry-css";

interface Photo {
  id: number;
  alt: string;
  avg_color: string;
  height: number;
  width: number;
  liked: boolean;
  photographer: string;
  photographer_id: number;
  photographer_url: string;
  url: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
}

interface PhotoId {
  id: number
}

const fetchData = async ({ pageParam }: { pageParam?: number }) => {
  const response = await fetch(`/api/photo?page=${pageParam}`);
  const data = await response.json();

  let nextPage: number | null = null;
  if (data.next_page) {
    const url = new URL(data.next_page);
    const nextParam = url.searchParams.get('page')

    nextPage = nextParam ? parseInt(nextParam, 10) : null;
  }

  return {
    photos: data.photos,
    nextPage
  }
}

const PhotosSection = () => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const photoIdsRef = useRef<PhotoId[]>([]);
  const [uniquePhotos, setUniquePhotos] = useState<Photo[]>([]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending
  } = useInfiniteQuery({
    queryKey: ['photos'],
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage
  });
  
  useEffect(() => {
    let newPhotos: Photo[] = [];

    data?.pages.forEach(page => {
      page.photos.forEach((photo: Photo) => {
        const alreadyExits = photoIdsRef.current.some(p => p.id === photo.id);

        if (!alreadyExits) {
          photoIdsRef.current.push({id: photo.id});
          newPhotos.push(photo);
        }
      });
    });

    if (newPhotos.length > 0) {
      setUniquePhotos(prev => [...prev, ...newPhotos]);
    }
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    }
  }, [loadMoreRef, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (error) return <div>Error loading photos: {(error as Error).message}</div>;
  if (isPending) return <Spinner />;

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
        {isFetchingNextPage ? <Spinner /> : hasNextPage ? "scroll to load more" : "No more photos"}
      </div>
    </div>
  );
};

export default PhotosSection;
