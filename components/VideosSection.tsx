import React, { useEffect, useRef, useState } from "react";
import VideoPreviewCard from "./VideoPreviewCard";
import Spinner from "./Spinner";
import { VideoData } from "@/lib/types";
import useIntersection from "@/hooks/useIntersection";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchData } from "@/lib/fetchdata";
import { useOptionsToggle, useThanksDialog } from "@/lib/store";
import Masonry from "react-masonry-css";
import MediaCard from "./MediaCard";
import { useOverflowHidden } from "@/hooks/useOverflowHidden";
import { findVideoFile } from "@/lib/utils";
import ThanksDialog from "./ThanksDialog";

const VideosSection = ({ query }: { query?: string }) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { currentOption } = useOptionsToggle();
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [hdVideo, setHdVideo] = useState<string>();
  const { activeThanksDialog, thanksDialogIn } = useThanksDialog();
  const thanksDialog = activeThanksDialog["videoSection"];

  const {
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
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

  useOverflowHidden(isVideoOpen);

  useIntersection({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
    targetRef: loadMoreRef,
    enabled: hasNextPage,
  });

  if (error) return <div>Error loading videos: {(error as Error).message}</div>;
  if (isLoading)
    return (
      <div className="mt-20 flex min-w-full items-center justify-center">
        <Spinner />
      </div>
    );
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
            const { hdVideoFIle } = findVideoFile(video);

            return (
              <VideoPreviewCard
                key={video.id}
                originalVideoUrl={hdVideoFIle.link}
                video={{
                  id: video.id,
                  width: video.width,
                  height: video.height,
                  url: video.url,
                  image: video.image,
                  videographer: video.user.name,
                  videographerUrl: video.user.url,
                  videoFiles: video.video_files.map((f) => ({
                    id: f.id,
                    quality: f.quality,
                    width: f.width,
                    height: f.height,
                    fileType: f.file_type,
                    link: f.link,
                    videoId: video.id,
                  })),
                }}
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
      {(isVideoOpen || thanksDialog.visible) && (
        <div className="pointer-events-auto fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
      )}
      {isVideoOpen && !thanksDialog.visible && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          <div className="pointer-events-auto px-4 md:px-12 lg:px-0">
            <MediaCard
              ownerName={selectedVideo?.user.name as string}
              ownerUrl={selectedVideo?.user.url as string}
              src={selectedVideo?.video_files}
              isVideo={true}
              Url={hdVideo as string}
              isOpen={isVideoOpen}
              mediaHeight={selectedVideo?.height as number}
              mediaWidth={selectedVideo?.width as number}
              setIsOpen={setIsVideoOpen}
            />
          </div>
        </div>
      )}
      {thanksDialog.visible && thanksDialogIn === "videoSection" && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          <div className="pointer-events-auto">
            <ThanksDialog
              image={{
                url: selectedVideo?.image as string,
                width: selectedVideo?.width as number,
                height: selectedVideo?.height as number,
              }}
              ownerName={selectedVideo?.user.name as string}
              ownerPexelsUrl={selectedVideo?.user.url as string}
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
