"use client";

import {
  Collection,
  CollectionPhoto,
  CollectionVideo,
  PhotoURLsTypes,
} from "@/lib/types";
import PhotoPreviewCard from "../PhotoPreviewCard";
import VideoPreviewCard from "../VideoPreviewCard";
import { useState } from "react";
import MediaCard from "../MediaCard";

const Masonry = ({ collection }: { collection: Collection }) => {
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<CollectionPhoto | null>(
    null,
  );

  return (
    <>
      <div className="columns-3 gap-6">
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
            <div key={item.id} className="mb-6 break-inside-avoid">
              {photo ? (
                <PhotoPreviewCard
                  photo={photo}
                  pexelsPhotoURL={photo.photographerUrl}
                  onClick={() => {
                    setIsPhotoOpen(true);
                    setSelectedPhoto(photo);
                  }}
                  showBookmark={false}
                />
              ) : video && videoFile && hdVideoFIle ? (
                <VideoPreviewCard
                  videoURL={videoFile.link}
                  width={video.width}
                  height={video.height}
                  originalVideoURL={hdVideoFIle.link}
                  videoPreviewURL={video.image}
                  pexelsVideoURL={video.url}
                  onClick={() => console.log("video")}
                />
              ) : null}
            </div>
          );
        })}
      </div>
      {isPhotoOpen && (
        <div className="fixed inset-0 z-50 min-h-screen bg-black/80 backdrop-blur-sm" />
      )}
      {isPhotoOpen && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          <div className="pointer-events-auto">
            <MediaCard
              ownerName={selectedPhoto?.photographer as string}
              ownerUrl={selectedPhoto?.photographerUrl as string}
              src={
                {
                  original: selectedPhoto?.original,
                  large: selectedPhoto?.large,
                  portrait: selectedPhoto?.portrait,
                  landscape: selectedPhoto?.landscape,
                } as PhotoURLsTypes
              }
              isVideo={false}
              Url={selectedPhoto?.large as string}
              onXClick={() => setIsPhotoOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Masonry;
