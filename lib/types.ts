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

export type PhotoURLsTypes = {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  } | undefined;