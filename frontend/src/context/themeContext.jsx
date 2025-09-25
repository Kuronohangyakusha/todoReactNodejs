// src/context/themeContext.js
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light"); // light ou dark

  useEffect(() => {
    document.body.className = ""; // reset toutes les classes
    if (theme === "light") {
      document.body.classList.add("bg-white", "text-gray-900");
    } else {
      document.body.classList.add("bg-gray-900", "text-white");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
