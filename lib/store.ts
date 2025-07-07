import { create } from "zustand";

type State = {
  currentOption: string;
  setToVideos: () => void;
  setToPhotos: () => void;
};

export const useOptionsToggle = create<State>((set) => ({
  currentOption: "photos",
  setToVideos: () => set({ currentOption: "videos" }),
  setToPhotos: () => set({ currentOption: "photos" }),
}));
