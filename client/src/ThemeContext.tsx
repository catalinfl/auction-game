import React, { createContext } from "react";

type ThemeContextType = {
    theme: "light" | "dark",
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => {}
})

export default ThemeContext;