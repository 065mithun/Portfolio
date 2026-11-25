"use client";

import { motion } from "framer-motion";
import { User, Code2, Briefcase } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 transition-colors">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 transition-colors">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <User className="text-primary" size={32} />,
              title: "Who I Am",
              description: "A passionate frontend developer with a keen eye for design and a drive for creating intuitive user experiences.",
            },
            {
              icon: <Code2 className="text-primary" size={32} />,
              title: "What I Do",
              description: "I specialize in building responsive, accessible web applications using modern technologies like React, Next.js, and Tailwind CSS.",
            },
            {
              icon: <Briefcase className="text-primary" size={32} />,
              title: "Experience",
              description: "I have worked on various projects ranging from small business websites to complex interactive dashboards.",
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 30px -10px var(--primary)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card p-8 rounded-2xl border border-border transition-colors cursor-default"
            >
              <div className="bg-muted w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
