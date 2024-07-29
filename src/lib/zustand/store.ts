"use client";

import {create} from "zustand";

interface fileNameState {
    fileName: string;
    setFileName: (fileName: string) => void;
}

const useStore = create<fileNameState>((set) => ({
    fileName: "",
    setFileName: (fileName) => set({ fileName }),
}));

export default useStore;
