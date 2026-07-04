import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BoardItemType = "image" | "article" | "audio" | "video" | "note";

export interface BoardItem {
  id: string;
  caseId: string;
  x: number;
  y: number;
  type: BoardItemType;
  title: string;
  content: string; // URL for media, text for article/note
  pinned: boolean;
}

export interface Connection {
  id: string;
  caseId: string;
  from: string;
  to: string;
}

interface BoardState {
  items: BoardItem[];
  connections: Connection[];
  connectingFrom: string | null;
  
  // Actions
  addItem: (item: Omit<BoardItem, "id" | "pinned" | "x" | "y">) => void;
  updateItemPosition: (id: string, x: number, y: number) => void;
  bringToFront: (id: string) => void;
  togglePin: (id: string) => void;
  deleteItem: (id: string) => void;
  startConnection: (id: string) => void;
  finishConnection: (id: string) => void;
  cancelConnection: () => void;
  deleteConnection: (id: string) => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set, get) => ({
      items: [],
      connections: [],
      connectingFrom: null,

      addItem: (item) => set((state) => {
        const id = `item-${Date.now()}`;
        // Add some random offset so they don't all stack perfectly
        const randomX = 50 + Math.random() * 100;
        const randomY = 50 + Math.random() * 100;
        return {
          items: [
            ...state.items,
            { ...item, id, pinned: false, x: randomX, y: randomY },
          ],
        };
      }),

      updateItemPosition: (id, x, y) => set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, x, y } : item
        ),
      })),

      bringToFront: (id) => set((state) => {
        const itemToMove = state.items.find(i => i.id === id);
        if (!itemToMove) return state;
        return {
          items: [...state.items.filter(i => i.id !== id), itemToMove],
        };
      }),

      togglePin: (id) => set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, pinned: !item.pinned } : item
        ),
      })),

      deleteItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id),
        connections: state.connections.filter(
          (c) => c.from !== id && c.to !== id
        ),
        connectingFrom: state.connectingFrom === id ? null : state.connectingFrom,
      })),

      startConnection: (id) => set({ connectingFrom: id }),

      finishConnection: (id) => set((state) => {
        if (!state.connectingFrom || state.connectingFrom === id) {
          return { connectingFrom: null };
        }
        
        // Prevent duplicate connections (ignoring direction)
        const exists = state.connections.some(
          (c) => 
            (c.from === state.connectingFrom && c.to === id) || 
            (c.from === id && c.to === state.connectingFrom)
        );

        if (exists) {
          return { connectingFrom: null };
        }

        const caseId = state.items.find(i => i.id === id)?.caseId || "unknown";
        
        return {
          connections: [
            ...state.connections,
            {
              id: `conn-${Date.now()}`,
              caseId,
              from: state.connectingFrom,
              to: id,
            },
          ],
          connectingFrom: null,
        };
      }),

      cancelConnection: () => set({ connectingFrom: null }),

      deleteConnection: (id) => set((state) => ({
        connections: state.connections.filter((c) => c.id !== id),
      })),
    }),
    {
      name: "editorial-evidence-board",
    }
  )
);
