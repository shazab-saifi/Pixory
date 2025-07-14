export interface PhotoType {
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

export interface VideoData {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string;
  full_res: string | null;
  tags: string[];
  duration: number;
  user: {
    id: number;
    name: string;
    url: string;
  };
  video_files: VideoFile[];
  video_pictures: VideoPicture[];
}

export interface VideoFile {
  id: number;
  quality: string;
  file_type: string;
  width: number;
  height: number;
  fps: number;
  link: string;
}

interface VideoPicture {
  id: number;
  picture: string;
  nr: number;
}

export type PhotoURLsTypes =
  | {
      original: string;
      large2x: string;
      large: string;
      medium: string;
      small: string;
      portrait: string;
      landscape: string;
      tiny: string;
    }
  | undefined;

export interface CredentialsTypes {
  email: string;
  name: string;
  password: string;
}

// Collection types based on Prisma schema
export interface CollectionPhoto {
  id: number;
  alt: string;
  height: number;
  width: number;
  photographer: string;
  photographerUrl: string;
  original: string;
  large: string;
  portrait: string;
  landscape: string;
  collectionId?: number;
}

export interface CollectionVideoFile {
  id: number;
  quality: string;
  width: number;
  height: number;
  fileType: string;
  link: string;
  videoId: number;
}

export interface CollectionVideo {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string;
  videographer: string;
  videographerUrl: string;
  videoFiles: CollectionVideoFile[];
  collectionId: number;
}

export interface Collection {
  id: number;
  name: string;
  photos: CollectionPhoto[];
  videos: CollectionVideo[];
  userId: number;
  createdAt: string;
}

export interface CollectionsResponse {
  collections: Collection[];
  total: number;
}
