import React, { useEffect, useRef, useState } from "react";
import VideoPreviewCard from "./VideoPreviewCard";
import Spinner from "./Spinner";
import { VideoData } from "@/lib/types";
import useIntersection from "@/hooks/useIntersection";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchData } from "@/lib/fetchdata";
import { useOptionsToggle } from "@/lib/store";
import Masonry from "react-masonry-css";
import MediaCard from "./MediaCard";

const VideosSection = ({ query }: { query?: string }) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { currentOption } = useOptionsToggle();
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [hdVideo, setHdVideo] = useState<string>();

  const { data, error, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["videos", query],
      queryFn: ({ pageParam = 1 }) => {
        return fetchData({ pageParam, currentOption, query });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [query]);

  useIntersection({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
    targetRef: loadMoreRef,
    enabled: hasNextPage,
  });

  if (error) return <div>Error loading videos: {(error as Error).message}</div>;
  if (data === undefined) return;

  return (
    <div>
      <h1 className="my-6 px-4 text-2xl font-medium md:px-22 xl:px-52">
        Free Stock Videos
      </h1>
      <Masonry
        breakpointCols={{ default: 3, 768: 2 }}
        className="my-masonry-grid px-4 md:px-20 xl:px-50"
        columnClassName="pl-4 md:pl-6 space-y-4 md:space-y-6"
      >
        {data.pages.flatMap((page) =>
          page.data.videos.map((video: VideoData) => {
            const videoFile =
              video.video_files.find(
                (file) =>
                  file.quality === "sd" && file.file_type === "video/mp4",
              ) || video.video_files[0];

            const hdVideoFIle =
              video.video_files.find(
                (file) =>
                  file.quality === "hd" && file.file_type === "video/mp4",
              ) || video.video_files[0];

            return (
              <VideoPreviewCard
                key={video.id}
                width={video.width}
                height={video.height}
                videoURL={videoFile.link}
                originalVideoURL={hdVideoFIle.link}
                videoPreviewURL={video.image}
                pexelsVideoURL={video.url}
                onClick={() => {
                  setIsVideoOpen(true);
                  setSelectedVideo(video);
                  setHdVideo(hdVideoFIle.link);
                }}
              />
            );
          }),
        )}
      </Masonry>
      {isVideoOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm" />
      )}
      {isVideoOpen && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          <div className="pointer-events-auto">
            <MediaCard
              ownerName={selectedVideo?.user.name as string}
              ownerUrl={selectedVideo?.user.url as string}
              src={selectedVideo?.video_files}
              isVideo={true}
              Url={hdVideo as string}
              onXClick={() => setIsVideoOpen(false)}
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

export default VideosSection;
