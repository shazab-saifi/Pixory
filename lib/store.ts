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

// export const useThanksDialog = create<{
//   thanksOpen: boolean;
//   openThanks: () => void;
//   closeThanks: () => void;
// }>((set) => ({
//   thanksOpen: false,
//   openThanks: () => set({ thanksOpen: true }),
//   closeThanks: () => set({ thanksOpen: false }),
// }));

interface PopupState {
  activeThanksDialog: Record<string, { visible: boolean }>;
  showThanksDialog: (id: string) => void;
  hideThanksDialog: (id: string) => void;
}

export const useThanksDialog = create<
  PopupState & { thanksDialogIn: string | null }
>((set) => ({
  activeThanksDialog: {
    photoPreview: { visible: false },
    videoSection: { visible: false },
    photoSection: { visible: false },
    videoPreview: { visible: false },
  },
  thanksDialogIn: null,
  showThanksDialog: (id) =>
    set((state) => ({
      activeThanksDialog: {
        ...state.activeThanksDialog,
        [id]: { visible: true },
      },
      thanksDialogIn: id,
    })),
  hideThanksDialog: (id) =>
    set((state) => ({
      activeThanksDialog: {
        ...state.activeThanksDialog,
        [id]: { ...state.activeThanksDialog[id], visible: false },
      },
      thanksDialogIn: state.thanksDialogIn === id ? null : state.thanksDialogIn,
    })),
}));
