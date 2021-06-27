import { useEffect } from 'react';
import { createContext, ReactNode, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextTypeProviderProps = {
  children: ReactNode;
}

type ThemeContextType = {
  theme: Theme;
  toogleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider(props: ThemeContextTypeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const storagedTheme = localStorage.getItem('theme')

    return (storagedTheme ?? 'light') as Theme;
  });

  useEffect(() => {
    localStorage.setItem('theme', currentTheme)
  }, [currentTheme])

  function toogleTheme() {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toogleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}