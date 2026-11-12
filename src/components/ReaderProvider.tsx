import { createContext, useContext, useState, type PropsWithChildren } from 'react';
import type { ThemeName } from '../lib/theme';

type Preferences = { theme: ThemeName; setTheme: (value: ThemeName) => void; fontSize: number; setFontSize: (value: number) => void };
const ReaderContext = createContext<Preferences | null>(null);

export function ReaderProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<ThemeName>('paper');
  const [fontSize, setFontSize] = useState(19);
  return <ReaderContext.Provider value={{ theme, setTheme, fontSize, setFontSize }}>{children}</ReaderContext.Provider>;
}

export function useReader() {
  const context = useContext(ReaderContext);
  if (!context) throw new Error('ReaderProvider is required');
  return context;
}
