"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import dynamic from 'next/dynamic';

const Player = dynamic(() => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player), {
  ssr: false,
});

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10 mix-blend-screen transition-colors duration-500" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 mix-blend-screen transition-colors duration-500" />

      <div className="max-w-6xl mx-auto z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-4 transition-colors">
              Welcome to my portfolio
            </h2>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-foreground transition-colors"
          >
            Hi, I&apos;m <span className="text-primary">Mithun K</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed transition-colors"
          >
            A passionate Web Developer focused on building interactive, accessible, and responsive user interfaces. 
            Enthusiastic recent graduate ready to begin a career and grow my skills in a positive work environment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
          >
            <Link
              href="#projects"
              className="flex items-center gap-2 bg-primary hover:opacity-90 text-primary-foreground px-8 py-3.5 rounded-full font-medium transition-all hover:scale-105 active:scale-95 w-full sm:w-auto justify-center shadow-lg"
            >
              View Projects
              <ArrowRight size={18} />
            </Link>
            <a
              href="/Mithun%20Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-card hover:bg-muted text-foreground px-8 py-3.5 rounded-full font-medium transition-all hover:scale-105 active:scale-95 border border-border w-full sm:w-auto justify-center shadow-sm"
            >
              Download CV
              <Download size={18} />
            </a>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
          className="flex-1 flex justify-center md:justify-end"
        >
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center p-2"
          >
            <Player
              autoplay
              loop
              src="https://lottie.host/5f8581e4-fe99-424c-858d-ccf4405f105f/FNc0IjwGxR.json"
              style={{ height: '100%', width: '100%', filter: 'drop-shadow(0px 10px 30px var(--primary))' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
