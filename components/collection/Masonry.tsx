"use client";

import {
  Collection,
  CollectionPhoto,
  CollectionVideo,
  CollectionVideoFile,
} from "@/lib/types";
import PhotoPreviewCard from "../PhotoPreviewCard";
import VideoPreviewCard from "../VideoPreviewCard";
import { useState } from "react";
import MediaCard from "../MediaCard";
import { useOverflowHidden } from "@/hooks/useOverflowHidden";

const Masonry = ({ collection }: { collection: Collection }) => {
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<
    | { type: "photo"; data: CollectionPhoto }
    | {
        type: "video";
        data: CollectionVideo & {
          videoFile: CollectionVideoFile;
          hdVideoFIle: CollectionVideoFile;
        };
      }
    | null
  >(null);

  useOverflowHidden(isMediaOpen);

  return (
    <>
      <div className="columns-2 gap-4 md:columns-3 md:gap-6">
        {collection.media.map((item) => {
          const photo: CollectionPhoto | undefined = item.photo;
          const video: CollectionVideo | undefined = item.video;

          let videoFile, hdVideoFIle;
          if (video && video.videoFiles && video.videoFiles.length > 0) {
            videoFile =
              video.videoFiles.find(
                (file) =>
                  file.quality === "sd" && file.fileType === "video/mp4",
              ) || video.videoFiles[0];

            hdVideoFIle =
              video.videoFiles.find(
                (file) =>
                  file.quality === "hd" && file.fileType === "video/mp4",
              ) || video.videoFiles[0];
          }

          return (
            <div key={item.id} className="mb-4 break-inside-avoid md:mb-6">
              {photo ? (
                <PhotoPreviewCard
                  photo={photo}
                  pexelsPhotoURL={photo.photographerUrl}
                  onClick={() => {
                    setIsMediaOpen(true);
                    setSelectedMedia({ type: "photo", data: photo });
                  }}
                  showBookmark={false}
                />
              ) : video && videoFile && hdVideoFIle ? (
                <VideoPreviewCard
                  key={video.id}
                  originalVideoUrl={hdVideoFIle.link}
                  video={{
                    id: video.id,
                    width: video.width,
                    height: video.height,
                    url: video.url,
                    image: video.image,
                    videographer: video.videographer,
                    videographerUrl: video.videographerUrl,
                    videoFiles: video.videoFiles.map((f) => ({
                      id: f.id,
                      quality: f.quality,
                      width: f.width,
                      height: f.height,
                      fileType: f.fileType,
                      link: f.link,
                      videoId: video.id,
                    })),
                  }}
                  onClick={() => {
                    setIsMediaOpen(true);
                    setSelectedMedia({
                      type: "video",
                      data: { ...video, videoFile, hdVideoFIle },
                    });
                  }}
                  showBookmark={false}
                />
              ) : null}
            </div>
          );
        })}
      </div>
      {isMediaOpen && (
        <div className="fixed inset-0 z-50 min-h-screen bg-black/80 backdrop-blur-sm" />
      )}
      {isMediaOpen && selectedMedia && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          <div className="pointer-events-auto">
            {selectedMedia.type === "photo" ? (
              <MediaCard
                ownerName={selectedMedia.data.photographer}
                ownerUrl={selectedMedia.data.photographerUrl}
                src={{
                  original: selectedMedia.data.original,
                  large: selectedMedia.data.large,
                  portrait: selectedMedia.data.portrait,
                  landscape: selectedMedia.data.landscape,
                }}
                isVideo={false}
                Url={selectedMedia.data.large}
                isOpen={isMediaOpen}
                setIsOpen={setIsMediaOpen}
                mediaHeight={selectedMedia.data.height}
                mediaWidth={selectedMedia.data.width}
              />
            ) : (
              <MediaCard
                ownerName={selectedMedia.data.videographer}
                ownerUrl={selectedMedia.data.videographerUrl}
                src={selectedMedia.data.videoFiles.map((file) => {
                  return {
                    file_type: file.fileType,
                    height: file.height,
                    width: file.width,
                    link: file.link,
                    quality: file.quality,
                    id: file.id,
                  };
                })}
                isVideo={true}
                Url={selectedMedia.data.hdVideoFIle.link}
                isOpen={isMediaOpen}
                setIsOpen={setIsMediaOpen}
                mediaHeight={selectedMedia.data.height}
                mediaWidth={selectedMedia.data.width}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Masonry;
