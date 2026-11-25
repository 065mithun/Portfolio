"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<"default" | "pointer" | "button" | "card">("default");
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // High performance motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for the follower delay/lag
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
    
    // Disable on touch devices and if user prefers reduced motion
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (isTouchDevice || reducedMotion) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Detect hover targets
      const target = e.target as HTMLElement;
      
      const button = target.closest("button");
      const link = target.closest("a");
      // The projects cards have the "group" class in Projects.tsx
      const card = target.closest(".group");

      if (button) {
        setCursorState("button");
      } else if (link) {
        setCursorState("pointer");
      } else if (card) {
        setCursorState("card");
      } else {
        setCursorState("default");
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (!mounted || !isVisible) return null;

  const variants = {
    default: {
      width: 16,
      height: 16,
      backgroundColor: "transparent",
      border: "2px solid var(--primary)",
      boxShadow: "0 0 10px var(--primary)",
      opacity: 0.7,
    },
    pointer: {
      width: 24,
      height: 24,
      backgroundColor: "transparent",
      border: "2px solid var(--primary)",
      boxShadow: "0 0 15px var(--primary)",
      opacity: 1,
    },
    button: {
      width: 36,
      height: 36,
      backgroundColor: "transparent",
      border: "2px dashed var(--primary)",
      boxShadow: "0 0 20px var(--primary)",
      opacity: 1,
    },
    card: {
      width: 48,
      height: 48,
      backgroundColor: "transparent",
      border: "1px solid var(--primary)",
      boxShadow: "inset 0 0 15px var(--primary)",
      opacity: 0.5,
    },
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center shadow-primary/50"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={cursorState}
        variants={variants}
        transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
      >
        <motion.div 
          className="w-1.5 h-1.5 bg-primary rounded-full absolute"
          animate={isClicking ? { scale: 2.5, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
}
