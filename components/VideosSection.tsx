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
import SkeletonLoading from "./SkeletonLoading";
import Button from "./Button";

const VideosSection = ({ query }: { query?: string }) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { currentOption } = useOptionsToggle();
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [hdVideo, setHdVideo] = useState<string>();
  const { activeThanksDialog, thanksDialogIn, dialogData } = useThanksDialog();
  const thanksDialog = activeThanksDialog["videoSection"];
  const dialogVideoPreview = activeThanksDialog["videoPreview"];
  const [hideDataInvalid, setHideDataInvalid] = useState(false);

  const {
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
    isLoading,
    refetch,
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

  if (error)
    return (
      <div className="mt-20 flex min-w-full items-center justify-center">
        Error loading videos: {(error as Error).message}
      </div>
    );

  if (isLoading) return <SkeletonLoading str="Videos" />;

  const isDataInvalid =
    !data ||
    !Array.isArray(data.pages) ||
    data.pages.some((page) => !page?.data || !Array.isArray(page.data.videos));

  console.log(isRefetching);

  if (isDataInvalid && !hideDataInvalid)
    return (
      <div className="mt-20 flex min-w-full flex-col items-center justify-center gap-4">
        <span className="text-center text-lg font-semibold">
          Failed to fetch videos <br />
          Please refresh the page or click on Retry button
        </span>
        <Button
          size="sm"
          onClick={() => {
            setHideDataInvalid(true);
            refetch();
          }}
        >
          Retry
        </Button>
      </div>
    );

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
        {data?.pages.flatMap(
          (page) =>
            Array.isArray(page?.data?.videos) &&
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

      {(isVideoOpen || thanksDialog.visible || dialogVideoPreview.visible) && (
        <div className="pointer-events-auto fixed inset-0 z-30 bg-black/80 backdrop-blur-sm" />
      )}

      {isVideoOpen && !thanksDialog.visible && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          <div className="pointer-events-auto px-4 md:px-12 lg:px-0">
            <MediaCard
              ownerName={selectedVideo?.user.name ?? ""}
              ownerUrl={selectedVideo?.user.url ?? ""}
              src={selectedVideo?.video_files}
              isVideo
              Url={hdVideo ?? ""}
              isOpen={isVideoOpen}
              mediaHeight={selectedVideo?.height ?? 0}
              mediaWidth={selectedVideo?.width ?? 0}
              setIsOpen={setIsVideoOpen}
            />
          </div>
        </div>
      )}

      {thanksDialog.visible && thanksDialogIn === "videoSection" && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          <div className="pointer-events-auto px-4 sm:px-0">
            <ThanksDialog
              image={{
                url: selectedVideo?.image ?? "",
                width: selectedVideo?.width ?? 0,
                height: selectedVideo?.height ?? 0,
              }}
              ownerName={selectedVideo?.user.name ?? ""}
              ownerPexelsUrl={selectedVideo?.user.url ?? ""}
            />
          </div>
        </div>
      )}

      {dialogVideoPreview.visible &&
        thanksDialogIn === "videoPreview" &&
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

export default VideosSection;
