import { create } from 'zustand';

interface GameState {
  currentTab: number;
  unlockedTabs: number[];
  isLoading: boolean;
  showInvestigationBoard: boolean;
  stickyNotes: StickyNote[];
  connections: Connection[];
  accusationResult: 'none' | 'correct' | 'incorrect';
  
  setCurrentTab: (tab: number) => void;
  unlockTab: (tab: number) => void;
  setIsLoading: (loading: boolean) => void;
  setShowInvestigationBoard: (show: boolean) => void;
  addStickyNote: (note: Omit<StickyNote, 'id'>) => void;
  updateStickyNote: (id: string, content: string) => void;
  removeStickyNote: (id: string) => void;
  addConnection: (connection: Omit<Connection, 'id'>) => void;
  removeConnection: (id: string) => void;
  setAccusationResult: (result: 'none' | 'correct' | 'incorrect') => void;
  resetGame: () => void;
}

interface StickyNote {
  id: string;
  content: string;
  x: number;
  y: number;
}

interface Connection {
  id: string;
  from: string;
  to: string;
}

const initialState = {
  currentTab: 0,
  unlockedTabs: [0],
  isLoading: true,
  showInvestigationBoard: false,
  stickyNotes: [],
  connections: [],
  accusationResult: 'none' as const,
};

export const useGameStore = create<GameState>((set) => ({
  ...initialState,

  setCurrentTab: (tab) => set({ currentTab: tab }),
  
  unlockTab: (tab) => set((state) => ({
    unlockedTabs: state.unlockedTabs.includes(tab) 
      ? state.unlockedTabs 
      : [...state.unlockedTabs, tab],
    currentTab: tab,
  })),
  
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  setShowInvestigationBoard: (show) => set({ showInvestigationBoard: show }),
  
  addStickyNote: (note) => set((state) => ({
    stickyNotes: [...state.stickyNotes, { ...note, id: `note-${Date.now()}` }],
  })),
  
  updateStickyNote: (id, content) => set((state) => ({
    stickyNotes: state.stickyNotes.map((note) =>
      note.id === id ? { ...note, content } : note
    ),
  })),
  
  removeStickyNote: (id) => set((state) => ({
    stickyNotes: state.stickyNotes.filter((note) => note.id !== id),
  })),
  
  addConnection: (connection) => set((state) => ({
    connections: [...state.connections, { ...connection, id: `conn-${Date.now()}` }],
  })),
  
  removeConnection: (id) => set((state) => ({
    connections: state.connections.filter((conn) => conn.id !== id),
  })),
  
  setAccusationResult: (result) => set({ accusationResult: result }),
  
  resetGame: () => set(initialState),
}));
