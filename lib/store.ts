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

interface DialogData {
  url: string;
  width: number;
  height: number;
  photographer: string;
  photographerUrl: string;
}

interface DialogState {
  activeThanksDialog: Record<string, { visible: boolean }>;
  showThanksDialog: (id: string, data: DialogData | null) => void;
  hideThanksDialog: (id: string) => void;
  thanksDialogIn: string | null;
  dialogData: DialogData | null;
}

export const useThanksDialog = create<DialogState>((set) => ({
  activeThanksDialog: {
    photoPreview: { visible: false },
    videoSection: { visible: false },
    photoSection: { visible: false },
    videoPreview: { visible: false },
  },
  thanksDialogIn: null,
  dialogData: null,
  showThanksDialog: (id, photoData) =>
    set((state) => ({
      activeThanksDialog: {
        ...state.activeThanksDialog,
        [id]: { visible: true },
      },
      thanksDialogIn: id,
      dialogData: photoData,
    })),
  hideThanksDialog: (id) =>
    set((state) => ({
      activeThanksDialog: {
        ...state.activeThanksDialog,
        [id]: { ...state.activeThanksDialog[id], visible: false },
      },
      thanksDialogIn: state.thanksDialogIn === id ? null : state.thanksDialogIn,
      dialogData: state.thanksDialogIn === id ? null : state.dialogData,
    })),
}));
