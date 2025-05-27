import React, { useRef } from 'react'
// import Masonry from 'react-masonry-css'
import VideoCard from './VideoCard'
import Spinner from './Spinner'
import { VideoData } from '@/lib/types'
import useIntersection from '@/hooks/useIntersection'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchData } from '@/lib/fetchdata'
import { useOptionsToggle } from '@/lib/store'
import Masonry from 'react-masonry-css'

const VideosSection = () => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { currentOption } = useOptionsToggle();

  const {
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['videos'],
    queryFn: ({ pageParam = 1 }) => {
      return fetchData({ pageParam, currentOption })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage
  })

  useIntersection({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
    targetRef: loadMoreRef,
    enabled: hasNextPage
  })

  if (error) return <div>Error loading videos: {(error as Error).message}</div>;
  // if (isPending) return <Spinner />;
  if (data === undefined) return;

  return (
    <div className="">
      <h1 className="my-6 font-medium text-2xl px-4 md:px-22 xl:px-52">Free Stock Videos</h1>
      <Masonry
        breakpointCols={{ default: 3, 768: 2 }}
        className="my-masonry-grid px-4 md:px-20 xl:px-50"
        columnClassName="pl-4 md:pl-6 space-y-4 md:space-y-6"
      >
        {data.pages.flatMap((page) => (
          page.data.videos.map((video: VideoData) => {
            const videoFile =
              video.video_files.find(
                (file) => file.quality === 'sd' && file.file_type === 'video/mp4'
              ) || video.video_files[0];

            return (
              <VideoCard
                key={video.id}
                // videoId={video.id}
                width={video.width}
                height={video.height}
                videoURL={videoFile.link}
                videoPreviewURL={video.image}
                pexelsVideoURL={video.url}
              />
            );
          })
        ))}
      </Masonry>
      <div ref={loadMoreRef} className="py-10 text-center text-gray-500">
        {isFetchingNextPage && <Spinner />}
      </div>
    </div>
  )
}

export default VideosSection
