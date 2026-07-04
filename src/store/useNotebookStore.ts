import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface NotebookEntry {
  id: string;
  caseId: string;
  content: string;
  timestamp: string;
  attachments: string[]; // IDs of evidence items
}

interface NotebookState {
  entries: NotebookEntry[];
  
  // Actions
  addEntry: (caseId: string) => void;
  updateEntry: (id: string, content: string) => void;
  deleteEntry: (id: string) => void;
  attachToEntry: (entryId: string, evidenceId: string) => void;
  detachFromEntry: (entryId: string, evidenceId: string) => void;
}

export const useNotebookStore = create<NotebookState>()(
  persist(
    (set) => ({
      entries: [],

      addEntry: (caseId) => set((state) => {
        const id = `note-${Date.now()}`;
        const newEntry: NotebookEntry = {
          id,
          caseId,
          content: "",
          timestamp: new Date().toISOString(),
          attachments: [],
        };
        return {
          entries: [...state.entries, newEntry],
        };
      }),

      updateEntry: (id, content) => set((state) => ({
        entries: state.entries.map((entry) =>
          entry.id === id 
            ? { ...entry, content, timestamp: new Date().toISOString() } 
            : entry
        ),
      })),

      deleteEntry: (id) => set((state) => ({
        entries: state.entries.filter((entry) => entry.id !== id),
      })),

      attachToEntry: (entryId, evidenceId) => set((state) => ({
        entries: state.entries.map((entry) => {
          if (entry.id === entryId) {
            // Prevent duplicate attachments
            if (!entry.attachments.includes(evidenceId)) {
              return { ...entry, attachments: [...entry.attachments, evidenceId] };
            }
          }
          return entry;
        }),
      })),

      detachFromEntry: (entryId, evidenceId) => set((state) => ({
        entries: state.entries.map((entry) =>
          entry.id === entryId
            ? { ...entry, attachments: entry.attachments.filter(id => id !== evidenceId) }
            : entry
        ),
      })),
    }),
    {
      name: "editorial-notebook",
    }
  )
);
