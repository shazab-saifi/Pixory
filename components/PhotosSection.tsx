'use client'

import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
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

interface PexelsResponse {
  page: number;
  per_page: number;
  photos: Photo[];
  total_results: number;
  next_page: string | null;
}

const fetchData = async ({ pageParam = 1 }: { pageParam?: number }) => {
  const res = await fetch(`/api/photo?page=${pageParam}`);
  const data = await res.json();

  // Parse the "next_page" URL to extract just the number
  let nextPage: number | undefined = undefined;
  if (data.next_page) {
    const url = new URL(data.next_page);
    const pageParam = url.searchParams.get("page");
    nextPage = pageParam ? parseInt(pageParam, 10) : undefined;
  }

  return {
    photos: data.photos,
    nextPage,
  };
};

const PhotosSection = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['photos'],
    queryFn: fetchData,
    initialPageParam: 1, // ✅ REQUIRED
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // ✅ Intersection observer to trigger infinite scroll
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
    };
  }, [loadMoreRef, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (error) return <div>Error loading photos: {(error as Error).message}</div>;
  if (isPending) return <Spinner />;

  return (
    <>
      <h1 className="my-6 font-medium text-2xl px-4 md:px-20 xl:px-60">Free Stock Photos</h1>
      <Masonry
        breakpointCols={{ default: 3, 768: 2 }}
        className="my-masonry-grid px-4 md:px-20 xl:px-60"
        columnClassName="pl-4 space-y-4"
      >
        {data?.pages.flatMap(page =>
          page.photos.map((photo: Photo) => (
            <PhotoCard
              key={photo.id}
              width={photo.width}
              height={photo.height}
              photoURL={photo.src.original}
              pexelsPhotoURL={photo.url}
              alt={photo.alt}
            />
          ))
        )}
      </Masonry>
      <div ref={loadMoreRef} className="py-10 text-center text-gray-500">
        {isFetchingNextPage ? <Spinner /> : hasNextPage ? "Scroll to load more..." : "No more photos"}
      </div>
    </>
  );
};

export default PhotosSection;
