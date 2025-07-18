import { create } from "zustand";

type State = {
  currentOption: string;
  setToVideos: () => void;
  setToPhotos: () => void;
};

type SearchState = {
  currentSearchOption: string;
  setSearchToVideos: () => void;
  setSearchToPhotos: () => void;
};

export const useOptionsToggle = create<State>((set) => ({
  currentOption: "photos",
  setToVideos: () => set({ currentOption: "videos" }),
  setToPhotos: () => set({ currentOption: "photos" }),
}));

export const useSearchOptions = create<SearchState>((set) => ({
  currentSearchOption: "photos",
  setSearchToVideos: () => set({ currentSearchOption: "videos" }),
  setSearchToPhotos: () => set({ currentSearchOption: "photos" }),
}));
