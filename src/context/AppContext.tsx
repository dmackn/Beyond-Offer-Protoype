import { createContext, useContext, useState, ReactNode } from 'react';

interface HotspotChat {
  id: string;
  name: string;
  emoji: string;
  members: number;
  last: string;
  time: string;
  unread: number;
  joined: boolean;
  msgs: { s: string; t: string; self: boolean; time: string }[];
}

interface AppContextType {
  rsvped: Set<string>;
  addRsvp: (id: string) => void;
  hotspotChats: HotspotChat[];
  addHotspotChat: (chat: HotspotChat) => void;
}

const AppContext = createContext<AppContextType>({
  rsvped: new Set(),
  addRsvp: () => {},
  hotspotChats: [],
  addHotspotChat: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [rsvped, setRsvped] = useState<Set<string>>(new Set());
  const [hotspotChats, setHotspotChats] = useState<HotspotChat[]>([]);

  const addRsvp = (id: string) => {
    setRsvped(prev => { const n = new Set(prev); n.add(id); return n; });
  };

  const addHotspotChat = (chat: HotspotChat) => {
    setHotspotChats(prev => {
      if (prev.find(c => c.id === chat.id)) return prev;
      return [chat, ...prev];
    });
  };

  return (
    <AppContext.Provider value={{ rsvped, addRsvp, hotspotChats, addHotspotChat }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}