import { createContext, useState } from 'react';
import { mmkvStorage } from './config/MMKVConfig';

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(mmkvStorage.getString('theme'));

  const changeTheme = (theme) =>
  {
    mmkvStorage.set('theme', theme);
    setCurrentTheme(theme);
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
