import React, { createContext, useState } from "react";

interface ThemeProvider {
  children: React.ReactNode;
}

export const ThemeContext = createContext<{
  isDark: boolean;
  toggleDarkMode: () => void;
}>({
  isDark: false,
  toggleDarkMode: () => {},
}); // 기본값 설정하고, 아래 return구문에서 .Provider value 설정 해줘야함.

const ThemeContextProvider = ({ children }: ThemeProvider) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggleDarkMode = () => setIsDark((prevTheme) => !prevTheme);

  return (
    <ThemeContext.Provider value={{ isDark, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
