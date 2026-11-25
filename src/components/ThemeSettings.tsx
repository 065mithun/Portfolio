"use client";

import { Moon, Sun, Palette, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { useColor } from "./ColorProvider";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const colors = [
  { name: "blue", value: "#3b82f6" },
  { name: "purple", value: "#a855f7" },
  { name: "green", value: "#22c55e" },
  { name: "orange", value: "#f97316" },
  { name: "red", value: "#ef4444" },
  { name: "teal", value: "#14b8a6" },
  { name: "neon-pink", value: "#ff10f0" },
  { name: "neon-cyan", value: "#0df0e3" },
  { name: "neon-green", value: "#39ff14" },
  { name: "neon-purple", value: "#b026ff" },
  { name: "neon-yellow", value: "#ccff00" },
  { name: "amber", value: "#f59e0b" },
  { name: "rose", value: "#f43f5e" },
  { name: "indigo", value: "#6366f1" },
  { name: "sky", value: "#0ea5e9" },
] as const;

export function ThemeSettings() {
  const { theme, setTheme } = useTheme();
  const { color, setColor } = useColor();
  const [mounted, setMounted] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsPaletteOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return <div className="flex gap-2 w-20 h-10" />;
  }

  return (
    <div className="flex items-center gap-2 relative" ref={menuRef}>
      {/* Light/Dark Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2.5 rounded-full bg-muted/80 backdrop-blur-sm text-foreground hover:bg-border transition-colors flex items-center justify-center border border-border shadow-sm hover:shadow-md"
        aria-label="Toggle Dark Mode"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </motion.button>

      {/* Palette Selector */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsPaletteOpen(!isPaletteOpen)}
        className={`p-2.5 rounded-full bg-muted/80 backdrop-blur-sm text-foreground transition-all flex items-center justify-center border shadow-sm hover:shadow-md ${isPaletteOpen ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:bg-border'}`}
        aria-label="Select Theme Color"
      >
        <Palette size={18} />
      </motion.button>

      <AnimatePresence>
        {isPaletteOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute top-full right-0 mt-4 p-4 bg-card/90 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl z-50 w-72 origin-top-right"
          >
            <div className="flex items-center justify-between mb-4 px-1">
              <h4 className="text-sm font-bold text-foreground">Theme Color</h4>
              <span className="text-xs font-medium px-2 py-1 bg-muted rounded-full text-muted-foreground capitalize">
                {color.replace('-', ' ')}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {colors.map((c) => {
                const isSelected = color === c.name;
                return (
                  <motion.button
                    key={c.name}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setColor(c.name)}
                    className="relative w-full aspect-square rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground group"
                    style={{ backgroundColor: c.value, boxShadow: `0 4px 10px -2px ${c.value}80` }}
                    aria-label={`Set theme to ${c.name}`}
                  >
                    {isSelected && (
                      <>
                        <motion.div
                          layoutId="activeColorRing"
                          className="absolute inset-0 rounded-full ring-2 ring-offset-2 ring-foreground bg-transparent pointer-events-none"
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          style={{ zIndex: -1 }}
                        />
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 drop-shadow-md mix-blend-difference text-white"
                        >
                          <Check size={14} strokeWidth={3} />
                        </motion.div>
                      </>
                    )}
                    
                    {/* Tooltip */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                      <div className="bg-foreground text-background text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap capitalize">
                        {c.name.replace('-', ' ')}
                      </div>
                      <div className="w-2 h-2 bg-foreground rotate-45 mx-auto -mt-1 shadow-lg" />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
