import { create } from 'zustand'

// Define the type for your individual data object
type ExportItem = {
    name: string;
    ui: string;
}

// Define the store type
type ExportDataStore = {
    exportData: ExportItem[];
    setExport: (newData: ExportItem[]) => void;
}

type ExportModalState = {
    exportModal: boolean,
    setExportModal: (newExportModal: boolean) => void;
}

type SelectedElementState = {
    selected: string;
    selection: boolean;
    setSelected: (selected: string) => void;
}

interface PanningState {
    panning: boolean;
    togglePanning: () => void;
    setPanning: (enabled: boolean) => void;
}

// Create the store
export const useExportData = create<ExportDataStore>((set) => ({
    exportData: [],
    setExport: (newData) => set({ exportData: newData }),

}))

export const usePanning = create<PanningState>((set) => ({
    panning: false,
    togglePanning: () => set((state) => ({ panning: !state.panning })),
    setPanning: (enabled) => set({ panning: !enabled }),
}));

export const useSelectElement = create<SelectedElementState>((set) => ({
    selected: "none",
    selection: false,
    setSelected: (selected: string) => set({
        selected,
        selection: selected !== "none" // Automatically sets selection to true if not "none"
    }),
}));

export const useExportModal = create<ExportModalState>((set) => ({
    exportModal: false,
    setExportModal: (newExportModal: boolean) => set({ exportModal: newExportModal }),
}))