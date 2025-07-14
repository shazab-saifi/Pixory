import { PhotoType, VideoData } from "@/lib/types";
import PhotoPreviewCard from "../PhotoPreviewCard";

type Photo = Partial<PhotoType> & {
  original: string;
  large: string;
  portrait: string;
  landscape: string;
  collectionId: number;
};

interface VideoFile {
  id: number;
  quality: string;
  width: number;
  height: number;
  fileType: string;
  link: string;
  videoId: number;
}

type Video = Partial<VideoData> & {
  videographer: string;
  videographerUrl: string;
  collectionId: number;
  videoFiles: VideoFile[];
};

interface Collection {
  name: string;
  photos: Photo[];
  videos: Video[];
}

interface MasonryProps {
  collection: Collection;
}

const Masonry: React.FC<MasonryProps> = ({ collection }) => (
  <div className="columns-1 gap-4 p-4 sm:columns-2 md:columns-3 lg:columns-4">
    {collection?.photos?.map((photo) => (
      <div key={photo.id} className="mb-4 break-inside-avoid">
        {/* <PhotoPreviewCard photo={photo} /> */}
      </div>
    ))}
  </div>
);

export default Masonry;
