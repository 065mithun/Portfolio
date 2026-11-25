"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "B.E - CSE",
    institution: "K.S.R. College of Engineering",
    year: "2021 - 2025",
    grade: "8.73% (upto 6th sem)",
  },
  {
    degree: "HSC",
    institution: "Golden Spark Matric Higher Secondary School",
    year: "2021",
    grade: "86%",
  },
  {
    degree: "SSLC",
    institution: "Modern Matric Higher Secondary School",
    year: "2019",
    grade: "77%",
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 bg-background transition-colors">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 transition-colors">Education</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-8 max-w-4xl mx-auto relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <GraduationCap size={20} />
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.05, x: index % 2 === 0 ? 5 : -5, boxShadow: "0 10px 30px -10px var(--primary)" }}
                transition={{ duration: 0.3 }}
                className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card p-6 rounded-2xl border border-border cursor-default"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                  <h3 className="font-bold text-lg text-foreground">{item.degree}</h3>
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">
                    {item.year}
                  </span>
                </div>
                <p className="text-foreground font-medium mb-2">{item.institution}</p>
                <p className="text-muted-foreground text-sm">Score: {item.grade}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
