import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  rsvped: Set<string>;
  addRsvp: (id: string) => void;
}

const AppContext = createContext<AppContextType>({
  rsvped: new Set(),
  addRsvp: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [rsvped, setRsvped] = useState<Set<string>>(new Set());

  const addRsvp = (id: string) => {
    setRsvped(prev => { const n = new Set(prev); n.add(id); return n; });
  };

  return (
    <AppContext.Provider value={{ rsvped, addRsvp }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}