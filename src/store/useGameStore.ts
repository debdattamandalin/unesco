import { create } from "zustand";

export interface Case {
  id: string;
  headline: string;
  difficulty: "Easy" | "Medium" | "Hard";
  estimatedTime: number; // in days
  reward: number; // in $
  era: string;
  client: string;
  summary: string;
}

export interface PublishedArticle {
  id: string;
  caseId: string;
  headline: string;
  articleText: string;
  verdict: string;
  evidenceSummary: string;
  sources: string;
  confidence: string;
  datePublished: string;
  gameDay: number;
  gameYear: number;
}

export interface GameSettings {
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  uiScale: "Small" | "Medium" | "Large";
  reduceMotion: boolean;
}

export const defaultSettings: GameSettings = {
  masterVolume: 80,
  musicVolume: 80,
  sfxVolume: 80,
  uiScale: "Medium",
  reduceMotion: false,
};

interface GameState {
  currentDay: number;
  currentYear: number;
  playerName: string;
  reputation: number;
  funds: number;
  subscribers: number;
  currentEra: string;
  gameTimeMinutes: number;
  isDayEnded: boolean;
  
  inboxCases: Case[];
  activeCases: Case[];
  archive: PublishedArticle[];
  settings: GameSettings;
  
  setPlayerName: (name: string) => void;
  advanceDay: () => void;
  tickClock: () => void;
  updateReputation: (amount: number) => void;
  updateFunds: (amount: number) => void;
  
  // Case Actions
  acceptCase: (id: string) => void;
  declineCase: (id: string) => void;
  generateMockCases: () => void;
  publishArticle: (article: Omit<PublishedArticle, "id" | "datePublished" | "gameDay" | "gameYear">) => void;

  // Settings
  updateSettings: (settings: Partial<GameSettings>) => void;
  resetSettings: () => void;

  // Save / Load
  currentSaveSlot: number;
  saveGame: (slot?: number) => void;
  loadGame: (slot: number) => boolean;
  resetGame: (slot: number) => void;
}

const mockCases: Case[] = [
  {
    id: "case-1",
    headline: "The Missing Heirloom",
    difficulty: "Easy",
    estimatedTime: 2,
    reward: 500,
    era: "1930s",
    client: "Mrs. Abernathy",
    summary: "A wealthy socialite claims her diamond necklace was stolen during a grand gala. Police suspect the butler, but things don't add up."
  },
  {
    id: "case-2",
    headline: "Corrupt City Official Exposed?",
    difficulty: "Medium",
    estimatedTime: 4,
    reward: 1200,
    era: "1930s",
    client: "Anonymous Source",
    summary: "Rumors suggest the Mayor has been accepting bribes from the mob to ignore speakeasy operations in the East Village."
  },
  {
    id: "case-3",
    headline: "The Docks Smuggling Ring",
    difficulty: "Hard",
    estimatedTime: 7,
    reward: 3000,
    era: "1930s",
    client: "Dockworker's Union",
    summary: "Strange crates are being unloaded at Pier 44 at midnight. The foreman who tried to investigate has gone missing."
  }
];

export const useGameStore = create<GameState>((set, get) => ({
  currentDay: 1,
  currentYear: 1930,
  playerName: "Investigator",
  reputation: 50,
  funds: 1000,
  subscribers: 0,
  currentEra: "1930s",
  gameTimeMinutes: 0,
  isDayEnded: false,
  
  inboxCases: [],
  activeCases: [],
  archive: [],
  settings: defaultSettings,
  currentSaveSlot: 1,

  setPlayerName: (name) => set({ playerName: name }),
  advanceDay: () => set((state) => ({ 
    currentDay: state.currentDay + 1,
    gameTimeMinutes: 0,
    isDayEnded: false
  })),
  tickClock: () => set((state) => {
    if (state.isDayEnded) return state;
    const newTime = state.gameTimeMinutes + 1;
    return {
      gameTimeMinutes: newTime,
      isDayEnded: newTime >= 720
    };
  }),
  updateReputation: (amount) => set((state) => ({ reputation: state.reputation + amount })),
  updateFunds: (amount) => set((state) => ({ funds: state.funds + amount })),
  
  acceptCase: (id) => set((state) => {
    const caseToAccept = state.inboxCases.find((c) => c.id === id);
    if (!caseToAccept) return state;
    return {
      inboxCases: state.inboxCases.filter((c) => c.id !== id),
      activeCases: [...state.activeCases, caseToAccept],
    };
  }),
  
  declineCase: (id) => set((state) => ({
    inboxCases: state.inboxCases.filter((c) => c.id !== id),
  })),
  
  generateMockCases: () => set((state) => {
    const existingIds = new Set([...state.inboxCases.map(c => c.id), ...state.activeCases.map(c => c.id)]);
    const newCases = mockCases.filter(c => !existingIds.has(c.id));
    return {
      inboxCases: [...state.inboxCases, ...newCases],
    };
  }),

  publishArticle: (article) => set((state) => {
    const newArticle: PublishedArticle = {
      ...article,
      id: `article-${Date.now()}`,
      datePublished: new Date().toISOString(),
      gameDay: state.currentDay,
      gameYear: state.currentYear,
    };
    
    return {
      archive: [...state.archive, newArticle],
      activeCases: state.activeCases.filter(c => c.id !== article.caseId),
    };
  }),

  updateSettings: (newSettings) => set((state) => ({ 
    settings: { ...state.settings, ...newSettings } 
  })),
  
  resetSettings: () => set({ 
    settings: defaultSettings 
  }),

  resetGame: (slot: number) => {
    set({
      currentDay: 1,
      currentYear: 1930,
      playerName: "Investigator",
      reputation: 50,
      funds: 1000,
      subscribers: 0,
      currentEra: "1930s",
      gameTimeMinutes: 0,
      isDayEnded: false,
      inboxCases: [],
      activeCases: [],
      archive: [],
      currentSaveSlot: slot,
    });
  },

  saveGame: (slot?: number) => {
    const state = get();
    const targetSlot = slot || state.currentSaveSlot;
    // Save only state data, omit functions
    const { 
      setPlayerName, advanceDay, updateReputation, updateFunds, 
      acceptCase, declineCase, generateMockCases, publishArticle, 
      updateSettings, resetSettings, saveGame, loadGame, resetGame, ...dataToSave 
    } = state as any;
    
    try {
      localStorage.setItem(`editorial-save-${targetSlot}`, JSON.stringify({...dataToSave, currentSaveSlot: targetSlot}));
    } catch (e) {
      console.error("Failed to save game", e);
    }
  },
  
  loadGame: (slot: number) => {
    try {
      const saved = localStorage.getItem(`editorial-save-${slot}`);
      if (saved) {
        set(JSON.parse(saved));
        set({ currentSaveSlot: slot });
        return true;
      }
    } catch (e) {
      console.error("Failed to load game", e);
    }
    return false;
  },
}));
