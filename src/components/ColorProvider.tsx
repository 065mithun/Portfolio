"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ColorTheme = "blue" | "purple" | "green" | "orange" | "red" | "teal" | "neon-pink" | "neon-cyan" | "neon-green" | "neon-purple" | "neon-yellow" | "amber" | "rose" | "indigo" | "sky";

interface ColorContextType {
  color: ColorTheme;
  setColor: (color: ColorTheme) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [color, setColor] = useState<ColorTheme>("blue");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedColor = localStorage.getItem("portfolio-color") as ColorTheme;
    if (storedColor) {
      setColor(storedColor);
      document.documentElement.setAttribute("data-color", storedColor);
    }
    setMounted(true);
  }, []);

  const handleSetColor = (newColor: ColorTheme) => {
    setColor(newColor);
    localStorage.setItem("portfolio-color", newColor);
    document.documentElement.setAttribute("data-color", newColor);
  };

  return (
    <ColorContext.Provider value={{ color, setColor: handleSetColor }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error("useColor must be used within a ColorProvider");
  }
  return context;
}
